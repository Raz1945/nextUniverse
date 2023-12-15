import { useState, useEffect } from 'react';
import { ResourceManagement } from "../components/Management/ResourceManagement";
import { updatePlantCurrentLevel } from "../functions/services/updateInstallationCurrentLevel";
import { getPlantCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from '../components/Installations/Installation';

export const Overview = () => {
  const [metalCurrentLevel, setMetalCurrentLevel] = useState(0);

  useEffect(() => {
    // Al cargar el componente, obtén los niveles actuales de las plantas desde el backend
    const fetchPlantLevels = async () => {
      try {
        const metalLevel = await getPlantCurrentLevel('metalMine');
        setMetalCurrentLevel(metalLevel);

        // Agregar otras instalaciones según sea necesario
      } catch (error) {
        console.error('Error al obtener los niveles de las plantas:', error);
      }
    };

    fetchPlantLevels();
  }, []);


  const handleOnClickUpdate = async (plantType) => {
    const plantInfo = {
      plantType,
    };

    try {
      const response = await updatePlantCurrentLevel(plantInfo);

      // Actualiza el estado local según el tipo de planta
      switch (plantType) {
        case 'metalMine':
          setMetalCurrentLevel(response.data.userPlanet.planets[0].installation[plantInfo.plantType].currentLevel || "error"); //todo no deberia de ser 0 en caso de que no encuente el valor
          //   setCrystalCurrentLevel(response?.profile?.planets[0]?.installation?.crystalMine?.currentLevel || 0);
          break;

          // Agrega más casos para otras plantas según sea necesario
        default:
          break;
      }

      console.log(`Planta de ${plantType} actualizada`);
    } catch (error) {
      console.error(`Error al actualizar la planta de ${plantType}:`, error);
    }
  };


  return (
    <>
      <ResourceManagement />

      <h1>Instalaciones de recursos</h1>
      <Installation
        plantType="Metal"
        currentLevel={metalCurrentLevel}
        picture="#"
        upDate={() => handleOnClickUpdate('metalMine')}
      />

    </>
  );
};
