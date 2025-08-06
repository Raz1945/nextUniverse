// Descripcion, este archivo contiene una función que construye un mapa de tipos de plantas a partir del estado de instalación.
 // Esta función es utilizada para simplificar el acceso a los tipos de plantas en la aplicación.

 /**
  * Construye un mapa de tipos de plantas a partir del estado de instalación.
  * @param {Object} installationState - El estado actual de las instalaciones.
  * @returns {Object} Un objeto donde las claves son los tipos de plantas simplificados y los valores son los nombres completos.
  */
 
export const buildPlantTypeMap = (installationState) => {
  return Object.keys(installationState).reduce((acc, key) => {
    const shortKey = key
      .replace('Mine', '')
      .replace('Synthesizer', '')
      .replace('PowerPlant', '')
      .replace('Warehouse', '')
      .replace('Tank', '')
      .replace('Factory', '')
      .replace(/^robot/i, 'robot')
      .replace(/^nano/i, 'nano')
      .toLowerCase();

    acc[shortKey] = key;
    return acc;
  }, {});
};
