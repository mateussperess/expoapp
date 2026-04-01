import { GetPopularLeaguesResponse } from "@/types/api.types";
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
  headers: {},
});

export const getPopularLeagues =
  async (): Promise<GetPopularLeaguesResponse> => {
    try {
      const response = await apiMock.get("leagues");
      return response.data;
    } catch (error: unknown) {
      let message = "Erro desconhecido ao buscar as ligas";

      if (axios.isAxiosError(error)) {
        console.error("Axios Error", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

        const status = error.response?.status;
        message = status
          ? "Erro na API (status " + status + ")"
          : "Erro de conexão com a API";
      } else if (error instanceof Error) {
        console.error("Internal Error:", error.message);
        message = "Erro interno ao processar a requisição";
      }

      throw new Error(message, { cause: error });
    }
  };
