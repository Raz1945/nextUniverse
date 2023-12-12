# Para los comentarios

// ==>
// -->
// ?
// \*
// -
//Y

# [!NOTE]
**Peticiones Fetchs**
La elección de realizar una sola petición FETCH o múltiples depende de varios factores, como la eficiencia, la estructura de tu base de datos y la necesidad de los datos en tu aplicación. Aquí hay algunos aspectos a considerar:

## Una sola petición FETCH:**
- _Ventajas:_
  - Menos sobrecarga de red: Realizar una sola solicitud puede ser más eficiente en términos de ancho de banda y tiempo de respuesta en comparación con múltiples solicitudes.
  - Datos más consistentes: Los datos obtenidos en una sola solicitud serán coherentes en términos de tiempo, lo que puede ser importante si los datos están relacionados entre sí.
- _Desventajas:_
  - Si los datos de diferentes plantas no se actualizan con la misma frecuencia, podrías estar obteniendo datos innecesarios en cada actualización.

## Múltiples peticiones FETCH
- _Ventajas:_
  - Mayor control: Puedes controlar la frecuencia de las solicitudes para cada recurso por separado, lo que puede ser útil si algunos recursos cambian con más frecuencia que otros.
  - Menos datos innecesarios: Si solo necesitas información sobre un recurso en particular, puedes obtener solo esos datos, lo que puede ser más eficiente.
- _Desventajas:_
  - Mayor sobrecarga de red: Realizar múltiples solicitudes puede aumentar la carga de red y la latencia en comparación con una sola solicitud.

En tu caso, si los datos de todas las plantas se actualizan con la misma frecuencia y necesitas todos los datos en tiempo real, una sola petición FETCH podría ser más eficiente. Si solo necesitas información sobre un recurso específico y las actualizaciones no son sincrónicas, las solicitudes individuales pueden ser más adecuadas.

Si decides realizar múltiples solicitudes FETCH, podrías modificar la función `ShowStorage` para aceptar un parámetro que indique el tipo de planta que deseas, lo que te permitiría reutilizar la función para obtener datos específicos de cada planta.

# [!NOTE]
## Una Función Única para Todos los Datos:
_Ventajas:_
**Simplicidad:**
Puede ser más sencillo tener una única función que recupere todos los datos del usuario. Esto puede reducir la complejidad del código y hacer que sea más fácil de entender y mantener.
**Eficiencia:**
Si los datos que necesitas se obtienen siempre juntos y se utilizan en conjunto, una única función podría ser más eficiente en términos de rendimiento.

_Desventajas:_
**Sobrecarga de Datos:**
Puedes terminar obteniendo más datos de los necesarios, lo cual podría ser innecesario si solo necesitas una parte de la información.
**Falta de Granularidad:**
Si tu aplicación tiene muchas funcionalidades y necesidades de datos específicos, tener una única función podría llevar a obtener más datos de los necesarios en algunas situaciones.

## Varias Funciones Específicas para Cada Dato:
_Ventajas:_
**Granularidad:**
Puedes diseñar funciones específicas que devuelvan exactamente la información que necesitas. Esto proporciona una mayor granularidad y puede mejorar la eficiencia al evitar la recuperación de datos innecesarios.
**Reutilización:**
Puedes reutilizar estas funciones específicas en diferentes partes de tu aplicación según sea necesario.

_Desventajas:_
**Complejidad:**
Puede aumentar la complejidad del código al tener varias funciones para diferentes datos. Esto puede hacer que el código sea más difícil de entender y mantener si hay muchas funciones.

_Recomendaciones:_
**Equilibrio:**
Encuentra un equilibrio entre simplicidad y granularidad. Si tus necesidades son relativamente simples y los datos se utilizan juntos con frecuencia, una función única podría ser adecuada. Si tienes requisitos más específicos y necesitas flexibilidad, funciones específicas podrían ser más apropiadas.
**Contexto de Uso:**
Considera cómo se usan los datos en diferentes partes de tu aplicación. Si ciertos datos siempre se usan juntos, tener una única función podría ser lógico.



# [!Tip]
Se deberia de sepeara los controlladores, en lo que es para el usuario de lo que son los controladores del planeta,
  ej: para subir de nivel, o bajar...






# [!NOTE]
- plantes[n] cambiar las funciones 

- Tiene que haber un indicador general de los recuros totales 
- Cada planeta tiene que tener el total de su produccion
