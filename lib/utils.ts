import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const departmentShortNames: Record<string, string> = {
  "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
  "ადამიანური რესურსების დეპარტამენტი": "HR",
  "ფინანსების დეპარტამენტი": "ფინანსები",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
  "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
  "ტექნოლოგიების დეპარტამენტი": "IT",
  "მედიის დეპარტამენტი": "მედია",
};

export const departmentColors: Record<string, string> = {
  "ადმინისტრაციის დეპარტამენტი": "#FF66A8",
  "ადამიანური რესურსების დეპარტამენტი": "#6C5CE7",
  "ფინანსების დეპარტამენტი": "#00B894",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "#0984E3",
  "ლოჯისტიკის დეპარტამენტი": "#F39C12",
  "ტექნოლოგიების დეპარტამენტი": "#D63031",
  "მედიის დეპარტამენტი": "#2D3436",
};
