import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  // Tillfällig health-check utan databas.
  // Vi lägger tillbaka riktig Prisma/DB-koll när Postgres är skapad.
  return NextResponse.json(
    {
      ok: true,
      db: false,
    },
    { status: 200 }
  );
}
