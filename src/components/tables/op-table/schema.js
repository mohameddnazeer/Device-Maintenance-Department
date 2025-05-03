import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  deviceId: z.any(),
  delievry: z.any(),
  delievryPhoneNumber: z.any(),
  receiverID: z.any(),
  maintainerId: z.any(),
  failureMaintains: z.any(),
  notes: z.any(),
  state: z.any(),
  maintainLocation: z.any(),
  isDelivered: z.any(),
  createdDate: z.any(),
});
