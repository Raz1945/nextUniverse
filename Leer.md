# Para los comentarios

// ==>
// -->
// ?
// \*
// -
//Y



# Peticiones Fetchs
La elección de realizar una sola petición FETCH o múltiples depende de varios factores, como la eficiencia, la estructura de tu base de datos y la necesidad de los datos en tu aplicación. Aquí hay algunos aspectos a considerar:

**Una sola petición FETCH:**
- **Ventajas:**
  - Menos sobrecarga de red: Realizar una sola solicitud puede ser más eficiente en términos de ancho de banda y tiempo de respuesta en comparación con múltiples solicitudes.
  - Datos más consistentes: Los datos obtenidos en una sola solicitud serán coherentes en términos de tiempo, lo que puede ser importante si los datos están relacionados entre sí.
- **Desventajas:**
  - Si los datos de diferentes plantas no se actualizan con la misma frecuencia, podrías estar obteniendo datos innecesarios en cada actualización.

**Múltiples peticiones FETCH:**
- **Ventajas:**
  - Mayor control: Puedes controlar la frecuencia de las solicitudes para cada recurso por separado, lo que puede ser útil si algunos recursos cambian con más frecuencia que otros.
  - Menos datos innecesarios: Si solo necesitas información sobre un recurso en particular, puedes obtener solo esos datos, lo que puede ser más eficiente.
- **Desventajas:**
  - Mayor sobrecarga de red: Realizar múltiples solicitudes puede aumentar la carga de red y la latencia en comparación con una sola solicitud.

En tu caso, si los datos de todas las plantas se actualizan con la misma frecuencia y necesitas todos los datos en tiempo real, una sola petición FETCH podría ser más eficiente. Si solo necesitas información sobre un recurso específico y las actualizaciones no son sincrónicas, las solicitudes individuales pueden ser más adecuadas.

Si decides realizar múltiples solicitudes FETCH, podrías modificar la función `ShowStorage` para aceptar un parámetro que indique el tipo de planta que deseas, lo que te permitiría reutilizar la función para obtener datos específicos de cada planta.





_Modificaciones_
Se deberia de sepeara los controlladores, en lo que es para el usuario de lo que son los controladores del planeta,
ejemplo para subir de nivel, o bajar...






# Errores
tiene que haber un indicador general de los recuros totales 

cada planeta tiene que tener su produccion