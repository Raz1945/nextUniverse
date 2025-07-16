export const calculateStorageHidden = (value, currentLevel) => {
  const productionPerDay = value * 3600 * 2.4 ; // Produccion estimada por segundos

  if (currentLevel < 1) {
    currentLevel = 1;
  } else if (currentLevel > 10) {
    currentLevel = 10;
  }

  const hidden = Math.floor(productionPerDay * currentLevel / 10);
  return hidden;
};

//? Ejemplo
// const valuePerHour = 24218; // Produccion por hora
// const valuePerSecond = valuePerHour / 3600 ; 
// const currentLevel = 8;
// console.log(calculateStorageHidden(valuePerSecond, currentLevel)); // 46498