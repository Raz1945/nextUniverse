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
const INTERVALO_DURACION = 5000;

export const ResourceManagement = () => {
  const [resourceValues, setResourceValues] = useState(null);

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

  const fetchInitialResourceValues = async () => {
    try {
      const planetData = await fetchData();


      // Ver
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

  // Calcula y actualiza los valores de recursos cada INTERVALO_DURACION
  const updateResourceValues = async () => {
    try {
      const planetData = await fetchData();

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

  useEffect(() => {
    fetchDataAndInitialize();
  }, []);

  const fetchDataAndInitialize = async () => {
    await fetchInitialResourceValues();
    const interval = setInterval(updateResourceValues, INTERVALO_DURACION);
    return () => clearInterval(interval);
  };


  useEffect(() => {
    if (resourceValues) {
      saveProductionData();
    }
  }, [resourceValues]);

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


  if (!resourceValues) {
    return null;
  }


  return (
    <>
      {/*  Icono/logo de nextU */}

      <div className="resource-indicators__wrapper">
        <ResourceIndicator
          icon={<GiIBeam size={23} />}
          resource="metal"
          production={Math.round(resourceValues.metal)}
          productionPerHrs={Math.round(resourceValues.metalPerHrs)}
          reserve={Math.round(resourceValues.metal)}
          storage={Math.round(resourceValues.metalStorage)}
          storageHiden={Math.round(resourceValues.metalStorageHiden)}
        />
        <ResourceIndicator
          icon={<GiDiamondHard size={23} />}
          resource="crystal"
          production={Math.round(resourceValues.crystal)}
          productionPerHrs={Math.round(resourceValues.crystalPerHrs)}
          reserve={500}
          storage={Math.round(resourceValues.crystalStorage)}
          storageHiden={Math.round(resourceValues.crystalStorageHiden)}
        />
        <ResourceIndicator
          icon={<GiOilPump size={23} />}
          resource="deuterium"
          production={Math.round(resourceValues.deuterium)}
          productionPerHrs={Math.round(resourceValues.deuteriumPerHrs)}
          reserve={500}
          storage={Math.round(resourceValues.deuteriumStorage)}
          storageHiden={Math.round(resourceValues.deuteriumStorageHiden)}
        />
        <ResourceIndicator
          icon={<GiLightningArc size={23} />}
          resource="energy"
          production={Math.round(resourceValues.energy)}
          productionPerHrs={Math.round(resourceValues.energy)}
          reserve={500} //todo  Establecer el valor de reserva
          usage={19} //todo Establecer el uso de la energía 
        />
      </div>

      {/* Icono/img del Avatar del jugador */}
    </>
  );
};
