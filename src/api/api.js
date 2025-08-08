import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
const API = process.env.REACT_APP_API_BASE_URL;

export async function registerUser(data) {
  const res = await fetch(`${API}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
