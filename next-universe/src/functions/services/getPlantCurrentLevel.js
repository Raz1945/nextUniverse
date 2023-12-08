import axios from "../../api/axios";

const GET_PLANT_LEVEL_URL = '/profile/get_plant_levels';

export const getPlantCurrentLevel = async (plantType) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    // Obtén el nivel actual de la planta desde el backend
    const response = await axios.get(GET_PLANT_LEVEL_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Devuelve el nivel actual de la planta específica
    return response.data[plantType];
  } catch (error) {
    console.error(`Error al obtener el nivel de la planta de ${plantType}:`, error);
    throw error;
  }
};
