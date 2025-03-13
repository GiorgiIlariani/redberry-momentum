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

// department_id
// :
// "7"
// description
// :
// " Add \"momentum.redberryinternship.ge\" to next.config.js under images.domains or remotePatterns to allow Next.js to load images from that host. Restart the dev server after changes. "
// due_date
// :
// "2025-03-20T20:00:00.000Z"
// employee_id
// :
// "132"
// priority_id
// :
// "1"
// status_id
// :
// "1"
// title
// :
// "Fix Next.js Invalid src Prop for External Images"
