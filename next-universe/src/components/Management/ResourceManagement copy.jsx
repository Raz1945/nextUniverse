import { useState, useEffect } from 'react';
import { GiIBeam, GiDiamondHard, GiOilPump, GiLightningArc } from 'react-icons/gi';
import { calculateResourceValues } from '../../functions/calculateResourceValues';
import { calculateStorageCapacity } from '../../functions/calculateStorageCapacity';
import { calculateStorageHidden } from '../../functions/calculateStorageHiden';
import { ResourceIndicator } from '../Indicator/ResourceIndicator';
import { Navbar } from '../Navbar/Navbar';
import './ResourceManagement.css';
import { getPlanetData } from '../../functions/getPlanetData';

export const ResourceManagement = () => {
  // Definimos el estado inicial para los valores de recursos
  const [resourceValues, setResourceValues] = useState({
    metal: 0,
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
  });

  // Función para actualizar los valores de los recursos
  const updateValues = () => {
    // Obtenemos los datos del planeta desde la función getPlanetData
    const planetData = getPlanetData();

    // Calculamos la producción de recursos y energía usando los datos del planeta
    const {
      productionPerSecondofMetal,
      productionPerSecondofCrystal,
      productionPerSecondofDeuterium,
      productionOfEnergy,
    } = calculateResourceValues(planetData);

    // Calculamos la capacidad de almacenamiento para cada recurso
    const storageCapacityOfMetal = calculateStorageCapacity(planetData.installation.metalWarehouse.currentLevel);
    const storageCapacityOfCrystal = calculateStorageCapacity(planetData.installation.crystalWarehouse.currentLevel);
    const storageCapacityOfDeuterium = calculateStorageCapacity(planetData.installation.deuteriumTank.currentLevel);

    // Calculamos el almacenamiento oculto para cada recurso
    const metalStorageHiden = calculateStorageHidden(productionPerSecondofMetal, planetData.installation.metalWarehouse.currentLevel);
    const crystalStorageHiden = calculateStorageHidden(productionPerSecondofCrystal, planetData.installation.crystalWarehouse.currentLevel);
    const deuteriumStorageHiden = calculateStorageHidden(productionPerSecondofDeuterium, planetData.installation.deuteriumTank.currentLevel);

    // Actualizamos los valores de los recursos en el estado
    setResourceValues((prevResourceValues) => {
      let verifiedMetal = prevResourceValues.metal + productionPerSecondofMetal;
      if (verifiedMetal > storageCapacityOfMetal) {
        verifiedMetal = storageCapacityOfMetal;
      }

      let verifiedCrystal = prevResourceValues.crystal + productionPerSecondofCrystal;
      if (verifiedCrystal > storageCapacityOfCrystal) {
        verifiedCrystal = storageCapacityOfCrystal;
      }

      let verifiedDeuterium = prevResourceValues.deuterium + productionPerSecondofDeuterium;
      if (verifiedDeuterium > storageCapacityOfDeuterium) {
        verifiedDeuterium = storageCapacityOfDeuterium;
      }

      return {
        metal: verifiedMetal,
        metalPerHrs: productionPerSecondofMetal * 3600,
        metalStorage: storageCapacityOfMetal,
        metalStorageHiden,
        crystal: verifiedCrystal,
        crystalPerHrs: productionPerSecondofCrystal * 3600,
        crystalStorage: storageCapacityOfCrystal,
        crystalStorageHiden,
        deuterium: verifiedDeuterium,
        deuteriumPerHrs: productionPerSecondofDeuterium * 3600,
        deuteriumStorage: storageCapacityOfDeuterium,
        deuteriumStorageHiden,
        energy: productionOfEnergy,
      };
    });
  };

  // Configuramos un efecto para actualizar los valores cada segundo
  useEffect(() => {
    const interval = setInterval(updateValues, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [resourceValues]);

  // Renderizamos los componentes de la interfaz
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
      <h1>Main</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate in cumque molestias animi, facere beatae doloribus, ab esse assumenda enim dolorum labore tenetur minima repellendus, quas reiciendis quo excepturi officiis.
      </p>
    </>
  );
};
