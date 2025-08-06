import { installationMetadata } from '../../data/installationMetadata';
import { getImageForPlant } from '../../functions/getImageForPlant';
import '../Supplies/InstallationSupplies.css';

export const Supplies = ({
  currentLevel,
  plantType,
  onClickShow,
  lang = 'es',       // idioma por defecto
  visualPlanetId = 1,      // planeta por defecto
}) => {
  const metadata = installationMetadata[plantType];

  const name = metadata?.displayName?.[lang] || plantType;
  const picture = getImageForPlant(plantType, 'outside', visualPlanetId);

  const cardStyle = {
    backgroundImage: `url(${picture})`,
  };

  return (
    <picture className="project__card" style={cardStyle} onClick={() => onClickShow()}>
      <div className="project__overlay"></div>
      <div className="project__subcontent">
        <p className="project__description">
          {name}
          <span className="project__description-text">
            {currentLevel}
          </span>
        </p>
      </div>
    </picture>
  );
};
