import { z } from "zod";

export const AddEmployeeFormSchema = z.object({
  name: z
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .regex(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ლათინური და ქართული ასოებია დაშვებული"),
  username: z
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .regex(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ლათინური და ქართული ასოებია დაშვებული"),
  avatar: z
    .instanceof(File, { message: "სურათი აუცილებელია" })
    .refine((file) => file.size <= 600 * 1024, {
      message: "ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "მხოლოდ სურათის ტიპები დაშვებულია (JPEG, PNG, WEBP)" }
    )
    .optional(), // ✅ Allow undefined initially
  department_id: z.string().nonempty("დეპარტამენტის არჩევა აუცილებელია"),
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
