// const url = "https://momentum.redberryinternship.ge/api";
// const token = "9e69a33f-4eb0-40cc-8875-8bf0a3af6cd8"; // Replace with a valid token

// export const getAllStatuses = async () => {
//   try {
//     const response = await fetch(`${url}/statuses`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch statuses: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // Return the fetched statuses
//   } catch (error) {
//     console.error("Error fetching statuses:", error);
//     return null; // Return null in case of error
//   }
// };

// export const getAllPriorities = async () => {
//   try {
//     const response = await fetch(`${url}/priorities`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch priorities: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // Return the fetched priorities
//   } catch (error) {
//     console.error("Error fetching priorities:", error);
//     return null; // Return null in case of error
//   }
// };

// export const getAllDepartments = async () => {
//   try {
//     const response = await fetch(`${url}/departments`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json", // Added the required Accept header
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch departments: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // Return the fetched departments
//   } catch (error) {
//     console.error("Error fetching departments:", error);
//     return null; // Return null in case of error
//   }
// };

// export const getAllEmployees = async () => {
//   try {
//     const response = await fetch(`${url}/employees`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Include Bearer Token
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch employees: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // Return the fetched employees
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return null; // Return null in case of error
//   }
// };

// export const createNewEmployee = async ({
//   name,
//   surname,
//   avatarFile,
//   departmentId,
// }: createNewEmployeeProps) => {
//   try {
//     const formData = new FormData();

//     formData.append("name", name);
//     formData.append("surname", surname);
//     formData.append("avatar", avatarFile); // File upload
//     formData.append("department_id", departmentId);

//     const response = await fetch(`${url}/employees`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//       body: formData, // Multipart form data
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to create employee: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; // Return the created employee data
//   } catch (error) {
//     console.error("Error creating employee:", error);
//     return null; // Return null in case of error
//   }
// };

// export const getTaskComments = async (taskId: number) => {
//   try {
//     const response = await fetch(`${url}/tasks/${taskId}/comments`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch comments: ${response.status}`);
//     }

//     return await response.json(); // Return the fetched comments
//   } catch (error) {
//     console.error("Error fetching task comments:", error);
//     return null;
//   }
// };

// export const createTaskComment = async (
//   taskId: number,
//   text: string,
//   parentId: number | null = null
// ) => {
//   try {
//     const response = await fetch(`${url}/tasks/${taskId}/comments`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//       body: JSON.stringify({
//         text,
//         parent_id: parentId, // Can be null
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to create comment: ${response.status}`);
//     }

//     return await response.json(); // Return the created comment
//   } catch (error) {
//     console.error("Error creating task comment:", error);
//     return null;
//   }
// };

// export const getAllTasks = async () => {
//   try {
//     const response = await fetch(`${url}/tasks`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch tasks: ${response.status}`);
//     }

//     return await response.json(); // Return the fetched tasks
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return null;
//   }
// };

// export const createNewTask = async (taskData: {
//   name: string;
//   description: string;
//   due_date: string; // RFC 3339 format (e.g., "2025-12-31T23:59:59Z")
//   status_id: number;
//   employee_id: number;
//   priority_id: number;
// }) => {
//   try {
//     const response = await fetch(`${url}/tasks`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//       body: JSON.stringify(taskData),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to create task: ${response.status}`);
//     }

//     return await response.json(); // Return the created task
//   } catch (error) {
//     console.error("Error creating task:", error);
//     return null;
//   }
// };

// export const getTaskById = async (taskId: number) => {
//   try {
//     const response = await fetch(`${url}/tasks/${taskId}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch task: ${response.status}`);
//     }

//     return await response.json(); // Return the task details
//   } catch (error) {
//     console.error("Error fetching task:", error);
//     return null;
//   }
// };

// export const updateTaskStatus = async (taskId: number, statusId: number) => {
//   try {
//     const response = await fetch(`${url}/tasks/${taskId}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Bearer token auth
//       },
//       body: JSON.stringify({ status_id: statusId }), // Sending new status
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to update task status: ${response.status}`);
//     }

//     return await response.json(); // Return the updated task data
//   } catch (error) {
//     console.error("Error updating task status:", error);
//     return null;
//   }
// };

// <FormField
//                   control={form.control}
//                   name="status_id"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-base font-medium text-[#343A40]">
//                         დეპარტამენტი*
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value?.toString()}
//                         >
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="დიზაინის დეპარტამენტი" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {departments.map((option) => (
//                               <SelectItem key={option.id} value={option.name}>
//                                 {option.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
