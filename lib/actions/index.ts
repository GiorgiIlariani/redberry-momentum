const API_URL = "https://momentum.redberryinternship.ge/api";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  body?: any,
  isMultipart = false
) => {
  try {
    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer 9e6b8beb-4066-4459-b9ef-79807a636a55`,
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
