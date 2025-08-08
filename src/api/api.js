import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default api;
const API = process.env.REACT_APP_API_BASE_URL;

export async function registerUser(data) {
  try {
    console.log('Sending registration request to:', `${API}/api/users/register`);
    console.log('Registration data:', data);
    
    const res = await fetch(`${API}/api/users/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include', // Important for cookies/sessions
      body: JSON.stringify(data),
    });

    console.log('Registration response status:', res.status);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Registration error:', errorData);
      return { error: errorData.message || 'Registration failed' };
    }

    const responseData = await res.json();
    console.log('Registration successful:', responseData);
    return responseData;
  } catch (error) {
    console.error('Registration request failed:', error);
    return { error: error.message || 'Failed to connect to the server' };
  }
}
