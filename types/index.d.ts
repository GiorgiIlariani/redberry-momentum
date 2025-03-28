declare type createNewEmployeeProps = {
  name: string;
  surname: string;
  avatarFile: File;
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
  icon?: string;
  avatar?: string;
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
  disabled?: boolean;
  error?: any;
  addEmployee?: boolean;
  min?: number;
  max?: number;
  letters?: boolean;
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
};

declare type Filters = {
  departments: number[];
  priorities: number[];
  employees: number[];
};

declare interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: { name: string };
  department: { id: number; name: string };
  employee: { name: string; avatar: string };
  total_comments: number;
}

declare interface TaskCardProps {
  task: Task;
  statusColor: string;
}

declare interface PriorityBadgeProps {
  priority: string;
}

declare interface DepartmentBadgeProps {
  departmentName: string;
}

declare interface ImageUploadProps {
  form: UseFormReturn<any>;
  image: string | null;
  onChange: (field: string, event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}
