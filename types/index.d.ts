declare type createNewEmployeeProps = {
  name: string;
  surname: string;
  avatarFile: File; // Corrected type from `string` to `File`
  departmentId: string;
};

declare type departments = {
  id: number;
  name: string;
};

declare type employees = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
};

declare type statuses = {
  id: number;
  name: string;
};

declare type priorities = {
  id: number;
  name: string;
  icon: string;
};

declare type CreateAssignmentFormProps = {
  departments: departments[];
  employees: employees[];
  statuses: statuses[];
  priorities: priorities[];
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
