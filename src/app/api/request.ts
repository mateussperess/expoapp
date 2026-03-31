import axios, { AxiosInstance } from "axios";

// const api: AxiosInstance = axios.create({
//   baseURL: "https://free-api-live-football-data.p.rapidapi.com",
//   timeout: 30000,
//   headers: {
//     "x-rapidapi-key": process.env.EXPO_PUBLIC_API_KEY,
//     "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
//   },
// });

const apiMock: AxiosInstance = axios.create({
  baseURL: "https://68f80ffcdeff18f212b5079a.mockapi.io/api/v1/",
  timeout: 30000,
  headers: {
    // "x-rapidapi-key": process.env.EXPO_PUBLIC_API_KEY,
    // "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
  },
});

export const getPopularLeagues = async () => {
  try {
    const response = await apiMock.get("leagues");
    return response.data;
  } catch (error: any) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);
    throw error;
  }
};
