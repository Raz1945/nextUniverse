import { useEffect, useState } from "react";
import { getInstallationCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from "../components/Installations/Installation";
import { updatePlantCurrentLevel } from "../functions/services/updatePlantCurrentLevel";

export const Installations = () => {
  const [metalCurrentLevel, setMetalCurrentLevel] = useState();

  useEffect(() => {
    const fetchPlantLevels = async () => {
      try {
        const levels = await getInstallationCurrentLevel();
        console.log('Respuesta del frontend:', levels);

        // Accede a los niveles de instalación
        const metalMineLevel = levels?.resource?.metalMine;

        // Haz lo que necesites con estos niveles
        setMetalCurrentLevel(metalMineLevel);

      } catch (error) {
        console.log("Error al obtener los niveles de instalación", error);
      }
    };

    fetchPlantLevels();
  }, []);

  // // ------------------//  //

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
      <div>Installations</div>
      <Installation
        plantType="Metal"
        currentLevel={metalCurrentLevel}
        onClickUpdate={() => handleOnClickUpdate('metalMine')} // 
      />
    </>
  );
};
