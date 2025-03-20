import { georgianWeekdays } from "@/constants";

// generates validation styles
export const generateValidationStyles = (
  isDirty: boolean,
  value: string,
  min: number,
  validationType: "min" | "max" | "letters",
  type: "input" | "textarea"
) => {
  const trimmedValue = value.trim();
  const valueLength = trimmedValue.length;
  const wordCount = trimmedValue.split(/\s+/).filter(Boolean).length;

  if (type === "input") {
    if (validationType === "min") {
      return value.replace(/\s/g, "").length < min && isDirty
        ? "!text-[#FA4D4D]"
        : valueLength >= min
        ? "!text-[#08A508]"
        : "text-[#6C757D]";
    }

    if (validationType === "max") {
      if ((valueLength > 255 || !valueLength) && isDirty)
        return "!text-[#FA4D4D]";
      return valueLength ? "!text-[#08A508]" : "text-[#6C757D]";
    }

    if (validationType === "letters") {
      return !/^[a-zA-Zა-ჰ\s]+$/.test(trimmedValue) && isDirty
        ? "!text-[#FA4D4D]"
        : /^[a-zA-Zა-ჰ\s]+$/.test(trimmedValue)
        ? "!text-[#08A508]"
        : "text-[#6C757D]";
    }
  }

  if (type === "textarea") {
    return wordCount < min && isDirty
      ? "!text-[#FA4D4D]"
      : wordCount >= 4
      ? "!text-[#08A508]"
      : "text-[#6C757D]";
  }

  return "text-[#6C757D]";
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
