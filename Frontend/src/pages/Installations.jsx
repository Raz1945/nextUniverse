import { useEffect, useState } from "react";
import { InstallationSupplies } from "../components/Supplies/InstallationSupplies";
import { useInstallationLogic } from "../hooks/useInstallationLogic";

import { useSelector, useDispatch } from "react-redux";

export const Installations = () => {
  const installationState = useSelector((state) => state.installation);

  const dispatch = useDispatch();


  const { handleOnClickUpdate, handleOnClickCancel, handleOnClickDestroy } =
    useInstallationLogic(installationState, dispatch);

  const installations = [
    {
      plantType: "metalMine",
      metalCost: installationState.metalMine.metalCost,
      crystalCost: installationState.metalMine.crystalCost,
      deuteriumCost: installationState.metalMine.deuteriumCost,
      currentLevel: installationState.metalMine.level,
      countdown: installationState.metalMine.countdown || "3 minutos", // Valor de prueba "3 minutos"
      // ... 
    },
  ];

  // console.log('el costo de metal de la instalación es:', installations[0].metalCost);
  // console.log('el nivel de la instalación es:', installations[0].currentLevel);
  // console.log('el temporizador de la instalación es:', installations[0].countdown);
  
  return (
    <InstallationSupplies

      // le pasamos los props correspondientes a cada instalación
      plantType={installations[0].plantType}
      metalCost={installations[0].metalCost}
      crystalCost={installations[0].crystalCost}
      deuteriumCost={installations[0].deuteriumCost}
      currentLevel={installations[0].currentLevel}
      countdown={installations[0].countdown}

      // le pasamos las funciones que hemos obtenido del custom hook
      onClickUpdate={() => handleOnClickUpdate(installations[0].plantType)}
      onClickCancel={() => handleOnClickCancel(installations[0].plantType)}
      onClickDestroy={() => handleOnClickDestroy(installations[0].plantType)}
    />
  );
};
