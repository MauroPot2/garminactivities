import { Encoder, Profile } from "@garmin/fitsdk";

export const runtime = "nodejs";

const MAX_STEPS = 50;

type Step = {
  name?: string;
  minutes?: number;
  targetMin?: number;
  targetMax?: number;
  intensity?: "warmup" | "active" | "rest" | "cooldown";
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; steps?: Step[] };
    const name = String(body.name || "VeloLab Workout").trim().slice(0, 40) || "VeloLab Workout";
    const steps = Array.isArray(body.steps) ? body.steps : [];

    if (!steps.length) return new Response("Aggiungi almeno un blocco", { status: 400 });
    if (steps.length > MAX_STEPS) return new Response(`Garmin export supporta al massimo ${MAX_STEPS} blocchi`, { status: 400 });

    for (const [index, step] of steps.entries()) {
      const minutes = Number(step.minutes);
      if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 300) {
        return new Response(`Durata non valida nel blocco ${index + 1}`, { status: 400 });
      }
      if (step.targetMin !== undefined && step.targetMax !== undefined && Number(step.targetMin) > Number(step.targetMax)) {
        return new Response(`Target watt invertito nel blocco ${index + 1}`, { status: 400 });
      }
    }

    const encoder = new Encoder();
    encoder.onMesg(Profile.MesgNum.FILE_ID, {
      type: "workout",
      manufacturer: "development",
      product: 1,
      serialNumber: Math.floor(Math.random() * 0xffffffff),
      timeCreated: new Date(),
    } as any);
    encoder.onMesg(Profile.MesgNum.WORKOUT, {
      wktName: name,
      sport: "cycling",
      numValidSteps: steps.length,
    } as any);

    steps.forEach((step, index) => {
      const durationMs = Math.round(clamp(Number(step.minutes), 0.1, 300) * 60_000);
      const low = typeof step.targetMin === "number" ? clamp(Math.round(step.targetMin), 0, 3000) : undefined;
      const high = typeof step.targetMax === "number" ? clamp(Math.round(step.targetMax), 0, 3000) : undefined;
      const hasPowerTarget = low !== undefined && high !== undefined;

      encoder.onMesg(Profile.MesgNum.WORKOUT_STEP, {
        messageIndex: index,
        wktStepName: String(step.name || `Blocco ${index + 1}`).slice(0, 50),
        intensity: step.intensity || "active",
        durationType: "time",
        durationValue: durationMs,
        targetType: hasPowerTarget ? "power" : "open",
        targetValue: 0,
        customTargetValueLow: hasPowerTarget ? 1000 + Math.min(low!, high!) : 0,
        customTargetValueHigh: hasPowerTarget ? 1000 + Math.max(low!, high!) : 0,
      } as any);
    });

    const bytes = encoder.close();
    const bodyBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const safeName = name.toLowerCase().replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "workout";

    return new Response(bodyBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeName}.fit"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Errore durante la creazione del FIT", { status: 500 });
  }
}
