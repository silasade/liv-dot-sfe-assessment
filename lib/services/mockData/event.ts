import { EventType } from "../schemas/event";

const events: EventType[] = [
  {
    id: "ev-01",
    title: "Live Concert",
    description: "Amazing live show",
    scheduledAt: null, //will be entered by admin
    state: "draft", //initial state of event
    viewers: 500,
    price: null, //will be entered by admin
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    requirements: [
      {
        description:
          "A dedicated production team ensures camera switching, audio levels, and stream monitoring during the event.",
        isSatisfied: false,
        key: "assignedCrew",
        title: "Production crew assigned",
      },
      {
        description:
          "Configured ingest (RTMP/ SRT) validates the connection between your encoder and LIV DOT. Without it, the platform can't receive the live feed.",
        isSatisfied: false,
        key: "streamingIngest",
        title: "Streaming ingest configured",
      },
      {
        description:
          "Ticket tiers and pricing ensure access control and revenue collection for the event.",
        isSatisfied: false,
        key: "pricing",
        title: "Ticket pricing configured",
      },
    ],
  },
];

const eventID = events[0].id;

export { events, eventID };
