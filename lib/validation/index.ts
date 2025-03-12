import { z } from "zod";

export const AddEmployeeFormSchema = z.object({
  name: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  username: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
});
