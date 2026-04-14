import { events } from "@/lib/services/mockData/event";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const eventIndex = events.findIndex((item) => item.id === id);

  if (eventIndex === -1) {
    return NextResponse.json(
      { success: false, message: "Event not found" },
      { status: 404 },
    );
  }

  const event = events[eventIndex];
  const requirementsSatisfied = event.requirements.every(
    (requirement) => requirement.isSatisfied,
  );
  const hasSchedule = event.scheduledAt !== null;
  const isAllRequirementsSatisfied = requirementsSatisfied && hasSchedule;

  return NextResponse.json(
    {
      success: true,
      data: { isAllRequirementsSatisfied },
      message: "requirements fetched successfully",
    },
    { status: 200 },
  );
}
