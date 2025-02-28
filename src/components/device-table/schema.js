import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.any(),
  region: z.any(),
  gate: z.any(),
  department: z.any(),
  office: z.any(),
  deviceType: z.any(),
  macAddress: z.any(),
  ownerName: z.any(),
  ownerNumber: z.any(),
  cpuType: z.any(),
  cpuModel: z.any(),
  cpuGeneration: z.any(),
  gpuType: z.any(),
  gpuModel: z.any(),
  gpuSize: z.any(),
  ramSize: z.any(),
  ramType: z.any(),
  romSize: z.any(),
  romType: z.any(),
  createdAt: z.any(),
});
