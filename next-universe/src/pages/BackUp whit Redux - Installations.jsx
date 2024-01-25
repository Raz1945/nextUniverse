// importamos el custom hook desde el archivo
import { InstallationSupplies } from "../components/Supplies/InstallationSupplies";
import { useInstallationLogic } from "../hooks/useInstallationLogic";

// importamos los hooks useSelector y useDispatch de react-redux
import { useSelector, useDispatch } from "react-redux";

export const Installations = () => {
  // usamos el hook useSelector para obtener el estado de las instalaciones desde el store
  const installationState = useSelector((state) => state.installation);

  // usamos el hook useDispatch para obtener una función que nos permite despachar acciones al store
  const dispatch = useDispatch();

  // usamos el custom hook que hemos creado para obtener las funciones que necesitamos
  const { handleOnClickUpdate, handleOnClickCancel, handleOnClickDestroy } =
    useInstallationLogic(installationState, dispatch);

  // creamos un array de objetos que contienen la información de cada instalación
  const installations = [
    {
      plantType: "metalMine",
      metalCost: installationState.metalMine.metalCost,
      crystalCost: installationState.metalMine.crystalCost,
      deuteriumCost: installationState.metalMine.deuteriumCost,
      currentLevel: installationState.metalMine.level,
      countdown: installationState.metalMine.countdown,
    },
    {
      plantType: "crystalMine",
      metalCost: installationState.crystalMine.metalCost,
      crystalCost: installationState.crystalMine.crystalCost,
      deuteriumCost: installationState.crystalMine.deuteriumCost,
      currentLevel: installationState.crystalMine.level,
      countdown: installationState.crystalMine.countdown,
    },
    {
      plantType: "deuteriumSynthesizer",
      metalCost: installationState.deuteriumSynthesizer.metalCost,
      crystalCost: installationState.deuteriumSynthesizer.crystalCost,
      deuteriumCost: installationState.deuteriumSynthesizer.deuteriumCost,
      currentLevel: installationState.deuteriumSynthesizer.level,
      countdown: installationState.deuteriumSynthesizer.countdown,
    },
    // otras instalaciones
  ];

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
