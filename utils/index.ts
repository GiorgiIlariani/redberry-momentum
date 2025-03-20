import { georgianWeekdays } from "@/constants";

export const generateValidationStyles = (
  isDirty: boolean,
  value: string,
  min: number,
  validationType: "min" | "max" | "letters",
  type: "input" | "textarea"
) => {
  if (type === "input") {
    if (validationType === "min") {
      if (value.replace(/\s/g, "").length < min && isDirty)
        return "!text-[#FA4D4D]";
      if (value.replace(/\s/g, "").length >= min) return "!text-[#08A508]";
    } else if (validationType === "max") {
      if (
        (value.trim().length > 255 && isDirty) ||
        (!value.trim().length && isDirty)
      )
        return "!text-[#FA4D4D]";
      if (value.trim().length) return "!text-[#08A508]";
    } else {
      if (!/^[a-zA-Zა-ჰ\s]+$/.test(value.trim()) && isDirty) {
        return "!text-[#FA4D4D]";
      } else if (/^[a-zA-Zა-ჰ\s]+$/.test(value.trim())) {
        return "!text-[#08A508]";
      }
    }

    return "text-[#6C757D]";
  }

  if (type === "textarea") {
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < min && isDirty) {
      return "!text-[#FA4D4D]";
    } else if (wordCount >= 4) {
      return "!text-[#08A508]";
    }

    return "text-[#6C757D]";
  }
};

// handle file change for image upload
export const handleFileChange = (fileProp: File | undefined) => {
  return new Promise((resolve, reject) => {
    const file = fileProp;
    if (file) {
      if (file.size > 600 * 1024) {
        reject("Image is too large");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    } else {
      reject("No file provided");
    }
  });
};

// filters tasks based on status
export const filterTasksByStatus = (
  tasks: Task[],
  status: status,
  filters: Filters
) => {
  return tasks.filter((task) => {
    const { department, priority, employee } = task;
    return (
      (!filters.departments.length ||
        filters.departments.includes(department?.id)) &&
      (!filters.priorities.length ||
        filters.priorities.includes(priority?.id)) &&
      (!filters.employees.length || filters.employees.includes(employee?.id)) &&
      task.status.name === status.name
    );
  });
};

// parses search params
export const parseSearchParams = (param?: string) =>
  param ? param.split(",").map(Number) : [];

// parsing date
export const parseDate = (dateStr: string) => {
  const dueDate = new Date(dateStr);
  return `${
    georgianWeekdays[dueDate.getDay()]
  } - ${dueDate.toLocaleDateString()}`;
};
