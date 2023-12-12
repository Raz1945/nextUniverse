import axios from '../../api/axios';

const GET_PLANT_LEVEL_URL = '/profile/plants/level';

export const getInstallationCurrentLevel = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    // Obtén el nivel actual de todas las plantas desde el backend
    const response = await axios.get(GET_PLANT_LEVEL_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Devuelve el objeto completo de niveles de instalación
    const installationLevels = response.data;
    // console.log('Los niveles son:', installationLevels);
    
    return installationLevels;
  } catch (error) {
    console.error('Error al obtener los niveles de instalación:', error);
    throw error;
  }
};