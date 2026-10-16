import { getJournalEntry, saveJournalEntry } from "@/lib/journal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get("file") || "";
  if (!file) return new Response("file mancante", { status: 400 });
  return Response.json(getJournalEntry(file) ?? null, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.file) return new Response("file mancante", { status: 400 });
    return Response.json(saveJournalEntry(body), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Dati non validi", { status: 400 });
  }
}
