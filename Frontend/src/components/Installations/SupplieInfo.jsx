import { getImageForPlant } from '../../functions/getImageForPlant';
import { installationMetadata } from '../../data/installationMetadata';
import './SupplieInfo.css';

export const SupplieInfo = ({
  plantType,
  metalCost,
  crystalCost,
  deuteriumCost,
  currentLevel,
  onClickUpdate,
  onClickCancel,
  onClickDestroy,
  countdown,
  lang = 'es',
  visualPlanetId = 1,
}) => {
  const metadata = installationMetadata[plantType];
  const name = metadata?.displayName?.[lang] || plantType;
  const picture = getImageForPlant(plantType, 'inside', visualPlanetId);

  return (
    <div className="inst_wrap">
      <div className="inst_picture_wrap">
        <picture className="inst_picture">
          <img src={picture} alt={`Imagen de ${name}`} className="inst_picture-img" />
        </picture>
      </div>

      <div className="inst_info">
        <p>
          {name} - Nivel actual: {currentLevel} → {currentLevel + 1}
        </p>

        <p>Metal: {metalCost}</p>
        <p>Cristal: {crystalCost}</p>
        {deuteriumCost > 0 && <p>Deuterio: {deuteriumCost}</p>}

        <h3 className="countdown">{countdown}</h3>
      </div>

      <ul className="inst_buttons">
        <li>
          <button type="button" onClick={onClickUpdate} className="btn_update">
            Mejorar
          </button>
        </li>
        <li>
          <button type="button" onClick={onClickCancel} className="btn_cancel">
            Cancelar
          </button>
        </li>
        <li>
          <button type="button" onClick={onClickDestroy} className="btn_destroy">
            Demoler
          </button>
        </li>
      </ul>
    </div>
  );
};
