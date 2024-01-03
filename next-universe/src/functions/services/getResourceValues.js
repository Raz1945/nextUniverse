import axios from "../../api/axios";

const RESOURCE_URL = '/profile/resource';

export const getResourceValues = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(RESOURCE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const resourceValues = response.data;
    // console.log("Los valores del recurso del usuario son:", resourceValues);
    
    return resourceValues;
  } catch (error) {
    console.error("Error al obtener los valores del recurso del usuario:", error);
    throw error;
  }
};


