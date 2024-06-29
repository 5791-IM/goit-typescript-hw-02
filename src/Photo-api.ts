import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "VwcNAHNQRqm-b8x6d_oRPvtXImyTiMSm5qrOWEHDSIs";

export interface ApiImage {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
  likes: number;
}

type ApiResponse = AxiosResponse<{ results: ApiImage[] }>;

export const getImages = async (query = "", page = 1): Promise<ApiImage[]> => {
  try {
    const response: ApiResponse = await axios.get("/search/photos", {
      params: {
        client_id: API_KEY,
        query: query,
        page: page,
        per_page: 12,
        orientation: "landscape",
      },
    });

    const data: ApiImage[] = response.data.results;
    return data;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
};

export default getImages;
