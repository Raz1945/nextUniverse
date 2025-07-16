export const numberWithSeparator = (value) => {
  const number = parseFloat(value);
  if (!isNaN(number)) {
    return number.toLocaleString();
  } else {
    return ''; // Ignorar el valor y devolver una cadena vacía
  }
}
