import { z } from "zod";
export const UserZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  image: z.string().optional(),
  tenantName: z.string().optional(),
  companyName: z.string().optional(),
  membership_status: z.boolean().optional(),
});

export type UserZod = z.infer<typeof UserZodSchema>;
