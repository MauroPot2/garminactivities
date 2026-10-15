import { readSettings, writeSettings } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(readSettings(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json(writeSettings(body), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Impostazioni non valide", { status: 400 });
  }
}
