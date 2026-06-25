import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

export async function GenerateReportApi(formData) {
  const response = await api.post("/api/interview/ai-report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function GetMyReportsApi() {
  const response = await api.get("/api/interview/my-reports");
  return response.data;
}
