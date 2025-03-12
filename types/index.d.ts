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
  department_id: number;
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
