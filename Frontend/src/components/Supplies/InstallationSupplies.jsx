import { useState, useMemo } from 'react';
import { Supplies } from './Supplies';
import { SupplieInfo } from '../Installations/SupplieInfo';
import { img } from '../../assets/installationsData';
import { buildPlantTypeMap } from '../../utils/buildPlantTypeMap';
import './InstallationSupplies.css';

export const InstallationSupplies = ({
  installationState,
  onClickUpdate,
  onClickCancel,
  onClickDestroy,
}) => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Genera automáticamente el mapa: 'metal' → 'metalMine', etc.
  const plantTypeMap = useMemo(() => buildPlantTypeMap(installationState), [installationState]);

  const handleSuppliesClick = (plantType) => {
    setSelectedPlant((prev) => (prev === plantType ? null : plantType));
  };

  return (
    <div className="supplie__wrapper">
      <div className="top">
        {selectedPlant && (
          <SupplieInfo
            plantType={selectedPlant}
            picture={img.installation[selectedPlant]?.inside[1]}
            currentLevel={installationState[plantTypeMap[selectedPlant]]?.level || 0}
            countdown={installationState[plantTypeMap[selectedPlant]]?.countdown || '—'}
            metalCost={installationState[plantTypeMap[selectedPlant]]?.metalCost || 0}
            crystalCost={installationState[plantTypeMap[selectedPlant]]?.crystalCost || 0}
            deuteriumCost={installationState[plantTypeMap[selectedPlant]]?.deuteriumCost || 0}
            onClickUpdate={() => onClickUpdate(plantTypeMap[selectedPlant])}
            onClickCancel={() => onClickCancel(plantTypeMap[selectedPlant])}
            onClickDestroy={() => onClickDestroy(plantTypeMap[selectedPlant])}
          />
        )}
      </div>

      <div className="bottom">
        {Object.keys(plantTypeMap).map((plantType) => (
          <Supplies
            key={plantType}
            picture={img.installation[plantType]?.outside[1]}
            plantType={plantType}
            currentLevel={installationState[plantTypeMap[plantType]]?.level || 0}
            onClickShow={() => handleSuppliesClick(plantType)}
          />
        ))}
      </div>
    </div>
  );
};
