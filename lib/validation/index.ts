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
  title: z
    .string()
    .min(3, "მინიმუმ 3 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .nonempty("სათაური აუცილებელია"),

  description: z
    .string()
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 4 || val.trim() === "",
      "აღწერა უნდა შეიცავდეს მინიმუმ 4 სიტყვას"
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
