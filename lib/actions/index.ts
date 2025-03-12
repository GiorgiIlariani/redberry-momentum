const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e69a33f-4eb0-40cc-8875-8bf0a3af6cd8"; // Replace with a valid token

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  body?: any,
  isMultipart = false
) => {
  try {
    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
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
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error with ${method} ${endpoint}:`, error);
    return null;
  }
};
