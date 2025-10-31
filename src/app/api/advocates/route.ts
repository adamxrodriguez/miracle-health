import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  const startMark = `api-advocates-GET-${Date.now()}`;
  if (typeof performance !== "undefined") {
    performance.mark(startMark);
  }

  try {
    // Uncomment this line to use a database
    // const data = await db.select().from(advocates);

    const data = advocateData;

    // Normalize phoneNumber to string for consistent API response
    const normalizedData = data.map((advocate) => ({
      ...advocate,
      phoneNumber: String(advocate.phoneNumber),
    }));

    if (typeof performance !== "undefined") {
      performance.mark(`${startMark}-end`);
      performance.measure(`api-advocates-GET`, startMark, `${startMark}-end`);
    }

    return Response.json({ data: normalizedData });
  } catch (error) {
    console.error("Error in GET /api/advocates:", error);
    throw error;
  }
}
