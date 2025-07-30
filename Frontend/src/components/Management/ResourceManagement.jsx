
import { useState, useEffect } from 'react';
import {
  GiIBeam,
  GiDiamondHard,
  GiOilPump,
  GiLightningArc
} from 'react-icons/gi';
import axios from '../../api/axios';
import { calculateResourceValues } from '../../functions/calculateResourceValues';
import { calculateStorageCapacity } from '../../functions/calculateStorageCapacity';
import { calculateStorageHidden } from '../../functions/calculateStorageHiden';
import { ResourceIndicator } from '../Indicator/ResourceIndicator';

import './resourceManagement.css';

const PROFILE_URL = '/profile';
const UPDATE_URL = '/profile/update';
const INTERVALO_DURACION = 5000; // Intervalo de actualización automática (ms)

export const ResourceManagement = () => {
  // Estado para los valores de recursos
  const [resourceValues, setResourceValues] = useState(null);

  // Obtiene los datos del planeta del usuario desde el backend
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { Planet } = response.data;
      return Planet;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  };

  // Inicializa los valores de recursos al cargar el componente
  const fetchInitialResourceValues = async () => {
    try {
      const planetData = await fetchData();

      // Estructura inicial de los recursos
      const initialResourceValues = {
        metal: planetData.resources.metal,
        metalPerHrs: 0,
        metalStorage: 0,
        metalStorageHiden: 0,
        crystal: planetData.resources.crystal,
        crystalPerHrs: 0,
        crystalStorage: 0,
        crystalStorageHiden: 0,
        deuterium: planetData.resources.deuterium,
        deuteriumPerHrs: 0,
        deuteriumStorage: 0,
        deuteriumStorageHiden: 0,
        energy: planetData.resources.energy,
      };
      console.log('Valores iniciales de recursos:', initialResourceValues);

      setResourceValues(initialResourceValues);
    } catch (error) {
      console.error('Error al obtener los valores iniciales de recursos:', error);
    }
  };

  // Actualiza los valores de recursos cada INTERVALO_DURACION
  const updateResourceValues = async () => {
    try {
      const planetData = await fetchData();

      // Calcula la producción y capacidades actuales
      const {
        productionPerSecondofMetal,
        productionPerSecondofCrystal,
        productionPerSecondofDeuterium,
        productionOfEnergy,
      } = calculateResourceValues(planetData);

      const storageCapacityOfMetal = calculateStorageCapacity(
        planetData.planets[0].installation.metalWarehouse.currentLevel
      );
      const storageCapacityOfCrystal = calculateStorageCapacity(
        planetData.planets[0].installation.crystalWarehouse.currentLevel
      );
      const storageCapacityOfDeuterium = calculateStorageCapacity(
        planetData.planets[0].installation.deuteriumTank.currentLevel
      );

      const metalStorageHiden = calculateStorageHidden(
        productionPerSecondofMetal,
        planetData.planets[0].installation.metalWarehouse.currentLevel
      );
      const crystalStorageHiden = calculateStorageHidden(
        productionPerSecondofCrystal,
        planetData.planets[0].installation.crystalWarehouse.currentLevel
      );
      const deuteriumStorageHiden = calculateStorageHidden(
        productionPerSecondofDeuterium,
        planetData.planets[0].installation.deuteriumTank.currentLevel
      );

      // Actualiza el estado de los recursos, deteniendo la producción si se alcanza el máximo
      setResourceValues((prevResourceValues) => {
        const metal =
          prevResourceValues.metal >= storageCapacityOfMetal
            ? prevResourceValues.metal
            : prevResourceValues.metal + productionPerSecondofMetal;

        const crystal =
          prevResourceValues.crystal >= storageCapacityOfCrystal
            ? prevResourceValues.crystal
            : prevResourceValues.crystal + productionPerSecondofCrystal;

        const deuterium =
          prevResourceValues.deuterium >= storageCapacityOfDeuterium
            ? prevResourceValues.deuterium
            : prevResourceValues.deuterium + productionPerSecondofDeuterium;

        return {
          metal,
          metalPerHrs: metal >= storageCapacityOfMetal ? 0 : productionPerSecondofMetal * 3600,
          metalStorage: storageCapacityOfMetal,
          metalStorageHiden,
          crystal,
          crystalPerHrs: crystal >= storageCapacityOfCrystal ? 0 : productionPerSecondofCrystal * 3600,
          crystalStorage: storageCapacityOfCrystal,
          crystalStorageHiden,
          deuterium,
          deuteriumPerHrs: deuterium >= storageCapacityOfDeuterium ? 0 : productionPerSecondofDeuterium * 3600,
          deuteriumStorage: storageCapacityOfDeuterium,
          deuteriumStorageHiden,
          energy: productionOfEnergy,
        };
      });
    } catch (error) {
      console.error('Error al actualizar los valores de recursos:', error);
    }
  };

  // Inicializa los recursos y comienza el intervalo de actualización automática
  useEffect(() => {
    fetchDataAndInitialize();
  }, []);

  // Función para inicializar y limpiar el intervalo
  const fetchDataAndInitialize = async () => {
    await fetchInitialResourceValues();
    const interval = setInterval(updateResourceValues, INTERVALO_DURACION);
    return () => clearInterval(interval);
  };

  // Guarda los valores de producción en el backend cada vez que cambian los recursos
  useEffect(() => {
    if (resourceValues) {
      saveProductionData();
    }
  }, [resourceValues]);

  // Envía los valores de recursos actualizados al backend
  const saveProductionData = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const saveProductionResponse = await axios.post(
        UPDATE_URL,
        {
          metalProduction: resourceValues.metal,
          crystalProduction: resourceValues.crystal,
          deuteriumProduction: resourceValues.deuterium,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log('Valores de producción guardados:', saveProductionResponse.data);
    } catch (error) {
      console.error('Error al guardar los valores de producción:', error);
    }
  };

  // Si los recursos no están listos, no renderiza nada
  if (!resourceValues) {
    return null;
  }

  // Renderiza los indicadores de recursos y la interfaz principal
  return (
    <>
      {/*  Icono/logo de nextU */}

      <div className="resource-indicators__wrapper">
        {/* Indicador de Metal */}
        <ResourceIndicator
          icon={<GiIBeam size={23} />}
          resource="metal"
          production={Math.round(resourceValues.metal)}
          productionPerHrs={Math.round(resourceValues.metalPerHrs)}
          reserve={Math.round(resourceValues.metal)}
          storage={Math.round(resourceValues.metalStorage)}
          storageHiden={Math.round(resourceValues.metalStorageHiden)}
        />
        {/* Indicador de Cristal */}
        <ResourceIndicator
          icon={<GiDiamondHard size={23} />}
          resource="crystal"
          production={Math.round(resourceValues.crystal)}
          productionPerHrs={Math.round(resourceValues.crystalPerHrs)}
          reserve={500}
          storage={Math.round(resourceValues.crystalStorage)}
          storageHiden={Math.round(resourceValues.crystalStorageHiden)}
        />
        {/* Indicador de Deuterio */}
        <ResourceIndicator
          icon={<GiOilPump size={23} />}
          resource="deuterium"
          production={Math.round(resourceValues.deuterium)}
          productionPerHrs={Math.round(resourceValues.deuteriumPerHrs)}
          reserve={500}
          storage={Math.round(resourceValues.deuteriumStorage)}
          storageHiden={Math.round(resourceValues.deuteriumStorageHiden)}
        />
        {/* Indicador de Energía */}
        <ResourceIndicator
          icon={<GiLightningArc size={23} />}
          resource="energy"
          production={Math.round(resourceValues.energy)}
          productionPerHrs={Math.round(resourceValues.energy)}
          reserve={500} // TODO: Establecer el valor de reserva
          usage={19} // TODO: Establecer el uso de la energía
        />
      </div>

      {/* Icono/img del Avatar del jugador */}
    </>
  );
};