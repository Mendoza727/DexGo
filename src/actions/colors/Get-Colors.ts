import { colorApi } from "@/config/api/ColorDominant";
import { ColorResponse } from "@/infrastructure/interfaces/ColorResponse.interface";

export const getColorApi = async (
  ImageUrl: string
): Promise<ColorResponse | undefined> => {
  try {
    const url = `/get_dominant_color?imageUrl=${ImageUrl}`;
    const response = await colorApi.get<ColorResponse>(url, {
      responseType: "json",
    });

    const dominantColor = response.data.dominantColor;

    return {
      dominantColor
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting dominant color: ${error}`);
  }
};
