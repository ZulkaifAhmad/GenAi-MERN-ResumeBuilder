import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

/**
 * @description this is a Register api call to server that accept arguments and return response
 * @route POST - http://localhost:3000/api/auth/register
 * @param {Object} {email , password , username} it accept these three parameters
 * @returns it give us the api call response =  response.data  - that conatin => message , userData
 */

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

/**
 * @description this is a Login api call to server that accept arguments and return response
 * @route POST - http://localhost:3000/api/auth/login
 * @param {Object} {email , password} it accept these two parameters
 * @returns it give us the api call response =  response.data  that conatin => message ,userData.
 */
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

/**
 * @description this is a Logout api call to server that accept arguments and return response
 * @route POST - http://localhost:3000/api/auth/logout
 * @param {null} it accept nothing the server will automatically check the cookies to logout and blocklist the user Token
 * @returns it give us the api call response =  response.data
 */
export async function LogoutApi() {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description this is a GetMe api call to server that accept arguments and return response
 * @route POST - http://localhost:3000/api/auth/getme
 * @param {null} it accept these nothing
 * @returns it give us the api call response =  response.data - that contain userToken and userData
 */
export async function GetMeApi() {
  try {
    const response = await api.get("/api/auth/getme");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
