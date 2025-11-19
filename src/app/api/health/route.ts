import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic"; // 🚀 viktig rad!
export const revalidate = 0; // 🚀 stoppar build time fetch

export async function GET() {
  try {
    // ❗ Inga prisma-operationer körs under build eftersom dynamic=force-dynamic
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        ok: true,
        db: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        ok: false,
        db: false,
      },
      { status: 500 }
    );
  }
}
