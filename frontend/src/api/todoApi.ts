const API_URL = "http://localhost:8080";

export async function getTodos() {
  
    const response = await fetch(`${API_URL}/todos`)

    if (!response.ok) {
        throw new Error("Failed to fetch todos")
    }
    return response.json();
}
