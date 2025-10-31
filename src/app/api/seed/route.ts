import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // Check if db has insert method (database connection available)
  if (!process.env.DATABASE_URL || typeof (db as any).insert !== "function") {
    return Response.json(
      { error: "Database not configured. Set DATABASE_URL environment variable." },
      { status: 500 }
    );
  }

  try {
    const records = await (db as any).insert(advocates).values(advocateData).returning();
    return Response.json({ advocates: records });
  } catch (error) {
    console.error("Seed error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to seed database" },
      { status: 500 }
    );
  }
}
