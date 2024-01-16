import './installation.css' ;

export const Installation = ({
  plantType,
  metalCost,
  crystalCost,
  deuteriumCost,
  currentLevel,
  picture,
  onClickUpdate,
  onClickCancel,
  onClickDestroy,
  countdown,
}) => {
  return (
    <div className="inst_wrap">
      <div className="inst_picture_wrap">
        <picture className="inst_picture">
          <img src={picture} alt='Picture of installation' className="inst_picture-img" />
        </picture>
      </div>

      <div className="inst_info">
        <p>
          Planta de {plantType} - Nivel actual: {currentLevel} --&gt;{' '}
          {currentLevel + 1}
        </p>

        <p>Metal: {metalCost}</p>
        <p>Crystal: {crystalCost}</p>
        {deuteriumCost > 0 && <p>Deuterio: {deuteriumCost}</p>}

        <h3 className="countdown">{countdown}</h3>
      </div>

      <ul className="inst_buttons">
        <li>
          <button type='button' onClick={onClickUpdate} className="btn_update">
            Mejorar
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickCancel} className="btn_cancel">
            Cancelar
          </button>
        </li>
        <li>
          <button type='button' onClick={onClickDestroy} className="btn_destroy">
            Demoler
          </button>
        </li>
      </ul>
    </div>
  );
};
