export const Installation = (
  { plantType, metalCost, crystalCost, deuteriumCost, currentLevel, picture, onClickUpdate, onClickCancel, countdown }
) => {
  return (
    <div>
      <p>Planta de {plantType} - Nivel actual: {currentLevel} --&gt; {currentLevel + 1}</p>
      <p>Metal: {metalCost}</p>
      <p>Crystal: {crystalCost}</p>
      {deuteriumCost > 0 && <p>Deuterio: {deuteriumCost}</p>}
      <picture>
        <img src={picture} alt="Picture of installation" />
      </picture>

      <h3>{countdown}</h3>
      <ul>
        <li>
          <button type="button" onClick={onClickUpdate}>
            Mejorar
          </button>
          <button type="button" onClick={onClickCancel}>
            Cancelar
          </button>
          {/* <button type="button" onClick={() => handleOnClickUpdate('metalMine')}>Mejorar</button> */}
        </li>
        <li>Cancelar</li>
        <li>Demoler</li>
      </ul>
    </div>
  );
};