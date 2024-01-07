export const calculateTimeBuild = (ecoUniverse, metal, crystal, robots, nanobots) => {
  // Validación de entrada
  if (
    ecoUniverse <= 0 ||
    metal < 0 ||
    crystal < 0 ||
    robots < 0 ||
    nanobots < 0
  ) {
    throw new Error('Error: Los valores de entrada no son válidos. Asegúrate de que todos los valores sean mayores o iguales a cero.');
  }

  // Lógica para calcular el tiempo de construcción
  const startTime = new Date();

  // Asegurarse de que ecoUniverse sea al menos 1 para evitar divisiones por cero
  const effectiveEcoUniverse = Math.max(1, ecoUniverse);

  const timeToBuildHours = calculateTimeToBuild(effectiveEcoUniverse, metal, crystal, robots, nanobots);

  if (timeToBuildHours === null) {
    throw new Error('Error: No se pudo calcular el tiempo de construcción.');
  }

  // Convertir tiempo de construcción a minutos, desglosar en horas y minutos, y obtener segundos restantes
  const totalMinutes = Math.round(timeToBuildHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = Math.round((timeToBuildHours * 60 * 60) % 60);

  // Calcula la hora de finalización sumando el tiempo de construcción al tiempo actual
  const endTime = new Date(startTime.getTime() + timeToBuildHours * 60 * 60 * 1000); // convertir horas a milisegundos

  // Muestra los resultados
  console.log(`Tiempo de construcción: ${hours} horas ${minutes} minutos ${seconds} segundos`);
  console.log(`Hora estimada de finalización: ${endTime.toLocaleString()}`);

  return {
    timeToBuild: {
      hours,
      minutes,
      seconds,
    },
    endTime: endTime.toLocaleString(),
  };
};


// Función auxiliar para calcular el tiempo de construcción
const calculateTimeToBuild = (ecoUniverse, metal, crystal, robots, nanobots) => {
  const baseTime = (metal + crystal) / 2500;
  const robotFactor = 1 / (robots + 1);
  const nanobotFactor = Math.pow(0.5, nanobots);

  // Validación de entrada adicional
  if (
    isNaN(baseTime) ||
    isNaN(robotFactor) ||
    isNaN(nanobotFactor) ||
    isNaN(ecoUniverse)
  ) {
    return null;
  }

  return (baseTime * robotFactor * nanobotFactor) / ecoUniverse;
};

// Ejemplo
// calculateTimeBuild(6, 580000, 290000, 10, 1);
