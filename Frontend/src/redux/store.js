import { configureStore } from "@reduxjs/toolkit";
import installationReducer from "./reducers/installationSlice";

// creamos el store usando la función configureStore
export const store = configureStore({
  // le pasamos un objeto con la propiedad reducer
  reducer: {
    // dentro del objeto reducer, ponemos todos los slices que queremos usar
    // en este caso, solo tenemos el slice de installation
    installation: installationReducer,
  },
});
