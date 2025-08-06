import { installationMetadata as img } from "../data/installationMetadata";

// Obtiene la imagen para una planta específica y vista (interior o exterior)
// Si no se encuentra la imagen, devuelve una imagen por defecto
export const getImageForPlant = (plantType, view = 'inside', planetId = 1) => {
  const path = img?.[plantType]?.images?.[view]?.[planetId];
  if (path) return path;

  console.warn(`Imagen no encontrada para: ${plantType} (${view}) planeta ${planetId}`);


  // fallback
  return view === 'inside'
    ? '/pictures/default_inside.jpeg'
    : '/pictures/default_outside.jpeg';
};
