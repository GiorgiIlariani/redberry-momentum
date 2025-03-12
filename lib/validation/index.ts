import { z } from "zod";

export const AddEmployeeFormSchema = z.object({
  name: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  username: z.string().min(2, "მინიმუმ ორი სიმბოლო"),
  avatar: z.string().nonempty("სურათი აუცილებელია"), // Ensure it's not empty
  department_id: z.string().nonempty(),
});

export const CreateAssignmentFormSchema = z.object({
  title: z.string().min(2, "მინიმუმ ორი სიმბოლო").max(255),
  description: z.string().optional(),
  due_date: z.string().nonempty("დედლაინი აუცილებელია"),
  status_id: z.string().nonempty("სტატუსი აუცილებელია"),
  employee_id: z.string().optional(),
  priority_id: z.string().nonempty("პრიორიტეტი აუცილებელია"),
  department_id: z.string().nonempty(),
});
