import { events } from "@/lib/services/mockData/event";
import { UpdateEventDTO } from "@/lib/services/schemas/event";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params:  Promise<{ id: string; }> },
) {
  const { id } = await params;

  const event = events.find((item) => item.id === id);

  if (!event) {
    return NextResponse.json(
      { message: "Event not found", success: false },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: { event },
      message: `Event details of ${id} fetched successfully`,
    },
    { status: 200 },
  );
}

export async function PUT(
  req: Request,
  { params }: { params:  Promise<{ id: string; }> },
) {
  const { id } = await params;

  const body: UpdateEventDTO = await req.json();
  const { scheduledAt, state, price, assignedCrew, pricing, streamingIngest } =
    body;

  const eventIndex = events.findIndex((item) => item.id === id);

  if (eventIndex === -1) {
    return NextResponse.json(
      { message: "Event not found", success: false },
      { status: 404 },
    );
  }
  const event = events[eventIndex];
  const requirementUpdates = {
    assignedCrew,
    pricing,
    streamingIngest,
  };
  const updatedRequirements = event.requirements.map((reqItem) => {
    const value = requirementUpdates[reqItem.key];

    return {
      ...reqItem,
      isSatisfied: value ?? reqItem.isSatisfied,
    };
  });
  const updatedEvent = {
    ...event,
    scheduledAt: scheduledAt !== undefined ? scheduledAt : event.scheduledAt,
    state: state !== undefined ? state : event.state,
    price: price !== undefined ? price : event.price,
    requirements: updatedRequirements,
  };

  events[eventIndex] = updatedEvent;

  return NextResponse.json(
    {
      success: true,
      data: { updatedEvent },
      message: "event updated successfully",
    },
    { status: 200 },
  );
}
