import { useState, useEffect } from 'react';
import { ResourceManagement } from "../components/Management/ResourceManagement";
import { updatePlantCurrentLevel } from "../functions/services/updatePlantCurrentLevel";
import { getPlantCurrentLevel } from "../functions/services/getPlantCurrentLevel";

export const Overview = () => {
  const [metalCurrentLevel, setMetalCurrentLevel] = useState(0);
  const [crystalCurrentLevel, setCrystalCurrentLevel] = useState(0);
  const [deuteriumCurrentLevel, setDeuteriumCurrentLevel] = useState(0);

  useEffect(() => {
    // Al cargar el componente, obtén los niveles actuales de las plantas desde el backend
    const fetchPlantLevels = async () => {
      try {
        const metalLevel = await getPlantCurrentLevel('metalMine');
        setMetalCurrentLevel(metalLevel);

        // Repite lo mismo para otras plantas (cristal y deuterio)
      } catch (error) {
        console.error('Error al obtener los niveles de las plantas:', error);
      }
    };

    fetchPlantLevels();
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar el componente

  const handleOnClickUpdate = async (plantType) => {
    const plantInfo = {
      plantType,
    };
  
    try {
      const response = await updatePlantCurrentLevel(plantInfo);
  
      // Actualiza el estado local según el tipo de planta
      switch (plantType) {
        case 'metalMine':
          setMetalCurrentLevel(response?.profile?.planets[0]?.installation?.metalMine?.currentLevel || 0);
          break;
        case 'crystalMine':
          setCrystalCurrentLevel(response?.profile?.planets[0]?.installation?.crystalMine?.currentLevel || 0);
          break;
        case 'deuteriumSynthesizer':
          setDeuteriumCurrentLevel(response?.profile?.planets[0]?.installation?.deuteriumSynthesizer?.currentLevel || 0);
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
      
      <div>
        <p>Planta de Metal - Nivel actual: {metalCurrentLevel}</p>
        <picture><img src="#" alt="foto instalacion" /></picture>
        <ul>
          <li>
            <button type="button" onClick={() => handleOnClickUpdate('metalMine')}>Mejorar</button>
          </li>
          <li>Cancelar</li>
          <li>Demoler</li>
        </ul>
      </div>

      <div>
        <p>Planta de Cristal - Nivel actual: {crystalCurrentLevel}</p>
        <picture><img src="#" alt="foto instalacion" /></picture>
        <ul>
          <li>
            <button type="button" onClick={() => handleOnClickUpdate('crystalMine')}>Mejorar</button>
          </li>
          <li>Cancelar</li>
          <li>Demoler</li>
        </ul>
        {/* Agrega elementos similares para la planta de cristal */}
      </div>

      <div>
        <p>Planta de Deuterio - Nivel actual: {deuteriumCurrentLevel}</p>
        {/* Agrega elementos similares para la planta de deuterio */}
      </div>
    </>
  );
};
