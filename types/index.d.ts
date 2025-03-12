declare type createNewEmployeeProps = {
  name: string;
  surname: string;
  avatarFile: File; // Corrected type from `string` to `File`
  departmentId: string;
};
