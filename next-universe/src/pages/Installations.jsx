import { useEffect, useState } from "react";
import { getInstallationCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from "../components/Installations/Installation";
import { updateInstallationCurrentLevel } from "../functions/services/updateInstallationCurrentLevel";
import { getResourceValues } from "../functions/services/getResourceValues";
import { calculateSpecificInstallationCost } from "../functions/calculateSpecificInstallationCost";

export const Installations = () => {
  const [metalCurrentLevel, setMetalCurrentLevel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resource = await fetchResource();
        const levels = await getInstallationCurrentLevel();
        const metalMineLevel = levels?.resource?.metalMine;
        setMetalCurrentLevel(metalMineLevel);
      } catch (error) {
        console.log("Error al obtener los valores de recursos o los niveles de instalación", error);
      }
    };

    fetchData();
  }, [metalCurrentLevel]);


  const handleOnClickUpdate = async (plantType) => {
    const plantInfo = { plantType };
    console.log("Planta de",plantInfo.plantType);

    const metalNextLevel = metalCurrentLevel + 1;

    try {
      const costResourceResponse = await calculateSpecificInstallationCost(
        plantInfo.plantType,
         metalNextLevel
      );

      const { metalCost, currentLevel } = costResourceResponse;
      console.log("costo de metal", metalCost, "para alcanzar el nivel", currentLevel);
      
      const resourceValues = await fetchResource();

      const metalResource = resourceValues.metal;


      console.log("Cantidad de metal disponibe", metalResource );
      console.log("Cantidad de metal necesario para alcanzar el nivel", metalCost)


      if (metalResource >= metalCost) {
        switch (plantType) {
          case 'metalMine':
            await updateInstallationCurrentLevel(plantInfo);
            setMetalCurrentLevel(currentLevel);

            //todo Debo restarle al valor de metal el costo de la actualizacion
            
            break;
          default:
            break;
        }

        console.log(`Planta de ${plantType} actualizada`);
      } else {
        console.log(`Recursos insuficientes para actualizar la planta de ${plantType}`);
      }
    } catch (error) {
      console.error(`Error al actualizar la planta de ${plantType}:`, error);
    }
  };

  // obtengo los valores de los recuros
  const fetchResource = async () => {
    try {
      const resource = await getResourceValues();
      console.log(resource); // Imprime los valores de los recursos en la consola
      console.log(resource.metal); // Imprime el valor del recurso "metal" en la consola
      return resource;
    } catch (error) {
      console.log("Error al obtener los valores de recursos:", error);
      throw error; // Asegura que el error sea propagado
    }
  };


  return (
    <>
      <div>Installations</div>
      <Installation
        plantType="Metal"
        currentLevel={metalCurrentLevel}
        metalCost={Math.round(calculateSpecificInstallationCost('metalMine', metalCurrentLevel+1).metalCost)}
        onClickUpdate={() => handleOnClickUpdate('metalMine')}
      />
    </>
  );
};
