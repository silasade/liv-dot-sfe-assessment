import z from "zod";

export const EventStateSchema = z.enum([
  "draft",
  "scheduled",
  "ready",
  "live",
  "completed",
  "replay",
]);

export const EventRequirementKeySchema = z.enum([
  "streamingIngest",
  "assignedCrew",
  "pricing",
]);

export const EventRequirementsSchema = z.object({
  key: EventRequirementKeySchema,
  isSatisfied: z.boolean(),
  title: z.string(),
  description: z.string(),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  scheduledAt: z.string().nullable(),
  price: z.number().nullable(),
  state: EventStateSchema,
  streamUrl:z.url(),
  requirements: z.array(EventRequirementsSchema),
  viewers: z.number(),
});

export const UpdateEventSchema = z.object({
  scheduledAt: z.string().nullable().optional(),
  state: EventStateSchema.optional(),
  price: z.number().nullable().optional(),

  assignedCrew: z.boolean().optional(),
  pricing: z.boolean().optional(),
  streamingIngest: z.boolean().optional(),
});
export type EventStateType = z.infer<typeof EventStateSchema>;
export type EventType = z.infer<typeof EventSchema>;
export type UpdateEventDTO = z.infer<typeof UpdateEventSchema>;
