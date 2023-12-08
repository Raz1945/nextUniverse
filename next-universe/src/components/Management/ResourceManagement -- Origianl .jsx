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
export const ResourceManagement = () => {

  // todo --> Deberian de ser los valores traido de la base de datos
  const initialResourceValues = {
    metal: 1000,
    metalPerHrs: 0,
    metalStorage: 0,
    metalStorageHiden: 0,
    crystal: 0,
    crystalPerHrs: 0,
    crystalStorage: 0,
    crystalStorageHiden: 0,
    deuterium: 0,
    deuteriumPerHrs: 0,
    deuteriumStorage: 0,
    deuteriumStorageHiden: 0,
    energy: 0,
  };
  const [resourceValues, setResourceValues] = useState(initialResourceValues);

  // Actualiza los valores de producción y almacena en la base de datos
  const updateValues = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const planetData = response.data.userPlanet;

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

      // Actualizamos los valores de los recursos en el estado agregandole el valor inicial a la produccion
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

      // Guardamos los valores de producción en la base de datos
      const productionValues = {
        metalProduction: productionPerSecondofMetal,
        crystalProduction: productionPerSecondofCrystal,
        deuteriumProduction: productionPerSecondofDeuterium,
        energyProduction: productionOfEnergy,
      };

      const saveProductionResponse = await axios.post(
        UPDATE_URL,
        productionValues,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Production values saved:', saveProductionResponse.data);
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response from Server');
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateValues, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [resourceValues]);

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
          reserve={500}
          usage={19}
        />
      </div>
    </>
  );
};
