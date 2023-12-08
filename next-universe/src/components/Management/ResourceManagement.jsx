import { useState, useEffect } from 'react';
import { GiIBeam, GiDiamondHard, GiOilPump, GiLightningArc } from 'react-icons/gi';
import { calculateResourceValues } from '../../functions/calculateResourceValues';
import { calculateStorageCapacity } from '../../functions/calculateStorageCapacity';
import { calculateStorageHidden } from '../../functions/calculateStorageHiden';
import { ResourceIndicator } from '../Indicator/ResourceIndicator';
import { Navbar } from '../Navbar/Navbar';
import './ResourceManagement.css';

import axios from '../../api/axios';
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

      return response.data.userPlanet;
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
        energy: 0,
      };

      setResourceValues(initialResourceValues);
    } catch (error) {
      console.error('Error al obtener los valores iniciales de recursos:', error);
    }
  };

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
        let resourceValueofMetal = prevResourceValues.metal + productionPerSecondofMetal;
        if (resourceValueofMetal > storageCapacityOfMetal) {
          resourceValueofMetal = storageCapacityOfMetal;
        }

        let resourceValueofCrystal = prevResourceValues.crystal + productionPerSecondofCrystal;
        if (resourceValueofCrystal > storageCapacityOfCrystal) {
          resourceValueofCrystal = storageCapacityOfCrystal;
        }

        let resourceValueofDeuterium = prevResourceValues.deuterium + productionPerSecondofDeuterium;
        if (resourceValueofDeuterium > storageCapacityOfDeuterium) {
          resourceValueofDeuterium = storageCapacityOfDeuterium;
        }

        // Actualizar los valores de recursos en el estado
        const updatedResourceValues = {
          metalProduction: resourceValueofMetal,
          crystalProduction: resourceValueofCrystal,
          deuteriumProduction: resourceValueofDeuterium,
        };

        // console.log('Valores actualizados:', updatedResourceValues);

        return {
          metal: resourceValueofMetal,
          metalPerHrs: productionPerSecondofMetal * 3600,
          metalStorage: storageCapacityOfMetal,
          metalStorageHiden,
          crystal: resourceValueofCrystal,
          crystalPerHrs: productionPerSecondofCrystal * 3600,
          crystalStorage: storageCapacityOfCrystal,
          crystalStorageHiden,
          deuterium: resourceValueofDeuterium,
          deuteriumPerHrs: productionPerSecondofDeuterium * 3600,
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
    const fetchDataAndInitialize = async () => {
      await fetchInitialResourceValues();
      const interval = setInterval(updateResourceValues, INTERVALO_DURACION);
      return () => clearInterval(interval);
    };

    fetchDataAndInitialize();
  }, []);

  useEffect(() => {
    // Llamada a axios.post después de que el estado se ha actualizado completamente
    if (resourceValues) {
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

      saveProductionData();
    }
  }, [resourceValues]);

  if (!resourceValues) {
    return null;
  }


  return (
    <>
      <Navbar />
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
    </>
  );
};
