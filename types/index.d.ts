declare type createNewEmployeeProps = {
  name: string;
  surname: string;
  avatarFile: File; // Corrected type from `string` to `File`
  departmentId: string;
};

declare type department = {
  id: number;
  name: string;
};

declare type employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: department;
};

declare type status = {
  id: number;
  name: string;
};

declare type priority = {
  id: number;
  name: string;
  icon: string;
};

declare interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string; // e.g., "2025-04-01 00:00:00"
  department: department;
  employee: employee;
  priority: priority;
  status: status;
  total_comments: number;
}

declare type CreateAssignmentFormProps = {
  departments: department[];
  employees: employees[];
  statuses: status[];
  priorities: priority[];
};

interface Option {
  id: string | number;
  name: string;
  icon?: string; // For priorities
  avatar?: string; // For employees
}

interface ValidationRules {
  minLength: number; // Ensure it's always required
  maxLength: number;
  messages?: {
    minLength?: string;
    maxLength?: string;
  };
}

declare interface FormFieldComponentProps {
  form: any;
  name: string;
  label: string;
  type: "input" | "textarea" | "select";
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  withAvatar?: boolean;
  withIcon?: boolean;
  onValueChange?: (value: string) => void; // 🔥 Allow handling value change
  validation?: ValidationRules;
  disabled?: boolean;
  customLabelClass?: string;
}

declare interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string; // Original API field (e.g., "2025-12-31 00:00:00")
  department: department;
  employee: employee;
  priority: priority;
  status: status;
  total_comments: number;
}

declare type PriorityName = "დაბალი" | "საშუალო" | "მაღალი";

declare type comment = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: Comment[]; // Recursive type for nested comments
}[];
