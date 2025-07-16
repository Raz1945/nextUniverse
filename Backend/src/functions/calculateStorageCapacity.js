export const calculateStorageCapacity = (currentLevel = 1) => {
  const capacity = 5000 * Math.floor(2.5 * Math.exp(20 * currentLevel / 33)); 
   return capacity;
}

//? Ejemplo
// const currentLevel = 4; 
// const capacity = calculateStorageCapacity(currentLevel);
// console.log(capacity.toLocaleString('es-ES')); 