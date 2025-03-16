import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.any(),
  macAddress: z.any(),
  soldierName: z.any(),
  soldierNumber: z.any(),
  nozomSoldierName: z.any(),
  maintenanceSoldier: z.any(),
  error: z.any(),
  notes: z.any(),
  solved: z.any(),
  createdAt: z.any(),
});
