"use server";

import { revalidatePath } from "next/cache";

const API_URL = "https://momentum.redberryinternship.ge/api";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  body?: any,
  isMultipart = false
) => {
  console.log(process.env.NEXT_API_TOKEN);

  try {
    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer 9e6dd5f3-f37c-4841-a4bc-11d0151d91af`,
    };

    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      method,
      headers,
      body: isMultipart ? body : JSON.stringify(body),
    };

    if (method === "GET") delete options.body; // Remove body for GET requests

    const response = await fetch(`${API_URL}/${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Request failed: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error with ${method} ${endpoint}:`, error);
    return null;
  }
};

export const addComment = async (taskId: string, text: string) => {
  const response = await apiRequest(`tasks/${taskId}/comments`, "POST", {
    text,
  });
  revalidatePath(`/tasks/${taskId}`);
  return response;
};

export const addSubComment = async (
  taskId: string,
  text: string,
  parent_id: number
) => {
  const response = await apiRequest(`tasks/${taskId}/comments`, "POST", {
    text,
    parent_id,
  });
  revalidatePath(`/tasks/${taskId}`);
  return response;
};

export const addEmployee = async (formData: any) => {
  const response = await apiRequest("employees", "POST", formData, true);
  revalidatePath(`/create-assignment`);
  return response;
};
