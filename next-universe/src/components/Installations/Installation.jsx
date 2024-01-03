
export const Installation = ({ plantType, metalCost, currentLevel, picture, onClickUpdate }) => {

  return (
    <div>
      <p>Planta de {plantType} - Nivel actual: {currentLevel} --&gt; {currentLevel + 1}</p>
      <p>Metal: {metalCost}</p>
      <picture>
        <img src={picture} alt="Picture of installation" />
      </picture>
      <ul>
        <li>
          <button type="button" onClick={onClickUpdate}>
            Mejorar
          </button>
          {/* <button type="button" onClick={() => handleOnClickUpdate('metalMine')}>Mejorar</button> */}
        </li>
        <li>Cancelar</li>
        <li>Demoler</li>
      </ul>
    </div>
  );
};
