import { useEffect, useState } from 'react';
import { Supplies } from "./Supplies";
import { SupplieInfo } from "../Installations/SupplieInfo";
import { img } from '../../assets/installationsData';
import './InstallationSupplies.css';

export const InstallationSupplies = ({
  plantType,
  metalCost,
  crystalCost,
  deuteriumCost,
  currentLevel,
  picture,
  onClickUpdate,
  onClickCancel,
  onClickDestroy,
  countdown,

}) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  
  // useEffect(() => {
  //   console.log(selectedPlant)
  // }), [selectedPlant]

  const handleSuppliesClick = (plantType) => {
    // Si se hace clic en la misma planta que ya se está mostrando, cierra la información
    if (selectedPlant === plantType) {
      setSelectedPlant(null);
    } else {
      // Cambia la planta seleccionada y muestra la información correspondiente
      setSelectedPlant(plantType);
    }
  };

  return (
    <div className="supplie__wrapper">
      <div className="top">
        {selectedPlant && (
          <SupplieInfo
            plantType={selectedPlant}
            picture={img.installation[selectedPlant].inside[1]}

            currentLevel={currentLevel}

            countdown={countdown}

            metalCost={metalCost}
            crystalCost={crystalCost}
            deuteriumCost={deuteriumCost}

            onClickUpdate={() => { onClickUpdate() }}
            onClickCancel={() => { onClickCancel }}
            onClickDestroy={() => { onClickDestroy }}
          />
        )}
      </div>
      <div className="bottom">
        <Supplies
          picture={img.installation.metal.outside[1]}
          plantType={'metal'}
          onClickShow={() => handleSuppliesClick('metal')}
        />
        <Supplies
          picture={img.installation.crystal.outside[1]}
          plantType={'crystal'}
          onClickShow={() => handleSuppliesClick('crystal')}
        />
        <Supplies
          picture={img.installation.deuterium.outside[1]}
          plantType={'deuterium'}
          onClickShow={() => handleSuppliesClick('deuterium')}
        />
      </div>
    </div>
  );
};
