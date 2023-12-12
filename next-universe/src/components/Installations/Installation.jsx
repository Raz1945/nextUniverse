
export const Installation = ({ plantType, currentLevel, picture, onClickUpdate }) => {

  return (
    <div>
      <p>Planta de {plantType} - Nivel actual: {currentLevel}</p>
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
