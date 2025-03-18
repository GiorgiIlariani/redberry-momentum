import { georgianWeekdays } from "@/constants";

// adds validation classes
export const getValidationClass = (value: string, min: number, max: number) => {
  if (!value) return "text-black";
  if (value.length < min || value.length > max) return "text-[#FA4D4D]";
  return "text-[#08A508]";
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
