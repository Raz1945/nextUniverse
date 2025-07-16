// Función para calcular la bonificación personalizada
export const calculateCustomBonus = (baseProduction, durationInDays, customBonusPercentage) => {
  const durationInMilliseconds = durationInDays * 24 * 60 * 60 * 1000; // Duración del bono en milisegundos
  const currentTimestamp = Date.now();
  const bonusEndTimestamp = currentTimestamp + durationInMilliseconds;

  // Verificar si el bono sigue siendo válido
  if (currentTimestamp < bonusEndTimestamp) {
    return Math.round(baseProduction * customBonusPercentage); // Calcula el bono basado en el porcentaje
  }

  return 0; // El bono ha expirado
};

