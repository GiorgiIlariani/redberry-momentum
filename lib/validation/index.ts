import { z } from "zod";

const regex = /^[a-zA-Zა-ჰ\s]+$/;

export const AddEmployeeFormSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(255)
    .regex(regex)
    .refine((val) => val.trim().replace(/\s+/g, "").length > 1),
  username: z
    .string()
    .min(2)
    .max(255)
    .regex(regex)
    .refine((val) => val.trim().replace(/\s+/g, "").length > 1),
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
  title: z
    .string()
    .min(3)
    .max(255)
    .refine((val) => val.trim().replace(/\s+/g, "").length > 2),
  description: z
    .string()
    .max(255)
    .refine(
      (desc) => desc.trim() === "" || desc.trim().split(/\s+/).length >= 4
    ),
  priority_id: z.string().nonempty("პრიორიტეტი აუცილებელია"),
  status_id: z.string().nonempty("სტატუსი აუცილებელია"),
  department_id: z.string().nonempty("დეპარტამენტი აუცილებელია"),
  employee_id: z.string().nonempty("პასუხისმგებელი თანამშრომელი აუცილებელია"),
  due_date: z
    .string()
    .refine(
      (date) => new Date(date).getTime() >= new Date().setHours(0, 0, 0, 0)
    ),
});
