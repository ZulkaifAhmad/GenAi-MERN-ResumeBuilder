import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

export async function RegisterApi({ email, password, username }) {
  try {
    const response = await api.post("/api/auth/register", {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function LoginApi({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function LogoutApi() {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function GetMeApi() {
  try {
    const response = await api.get("/api/auth/getme");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
