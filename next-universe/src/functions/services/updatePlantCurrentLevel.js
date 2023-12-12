import axios from "../../api/axios";

const PROFILE_URL = '/profile';

export const UPDATE_PLANT_LEVEL_URL = '/profile/plants/:plantType/level';

export const updatePlantCurrentLevel = async (plantInfo) => {
  console.log(plantInfo.plantType);

  try {
    const accessToken = localStorage.getItem('accessToken');

    // Obtén el nivel actual de la planta desde el backend
    const response = await axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Verifica si response.data y las propiedades subsiguientes están definidas
    if (response?.data?.userPlanet?.planets[0]?.installation[plantInfo.plantType]) {
      const currentLevel = response.data.userPlanet.planets[0].installation[plantInfo.plantType].currentLevel;
      console.log("el antiguo nivel es:", currentLevel);

      // Calcula el nuevo nivel sumando 1 al nivel actual
      const newLevel = currentLevel + 1;
      console.log("el nuevo nivel es:", newLevel);

      // Construye la URL con el valor dinámico de plantType
      const updatePlantLevelUrl = `/profile/plants/${plantInfo.plantType}/level`;

      // Realiza la solicitud POST al backend con la información actualizada de la planta
      await axios.post(updatePlantLevelUrl, { ...plantInfo, newLevel }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('subimos de nivel');
    }
  } catch (error) {
    console.error('Error al actualizar el nivel de la planta:', error);
    throw error;
  }
};
