"use server";

import { revalidatePath } from "next/cache";
import { apiRequest } from "@/lib/actions"; // Ensure this is the correct path

export const addComment = async (taskId: string, text: string) => {
  // Send the new comment to the API
  await apiRequest(`tasks/${taskId}/comments`, "POST", { text });

  // Revalidate the task page to update comments
  revalidatePath(`/tasks/${taskId}`);
};

export const addSubComment = async (
  taskId: string,
  text: string,
  parent_id: number
) => {
  // Send the new comment to the API
  await apiRequest(`tasks/${taskId}/comments`, "POST", { text, parent_id });

  // Revalidate the task page to update comments
  revalidatePath(`/tasks/${taskId}`);
};
