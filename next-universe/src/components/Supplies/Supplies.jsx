export const Supplies = ({
  currentLevel,
  picture,
  plantType,
  onClickShow
}) => {
  const cardStyle = {
    backgroundImage: `url(${picture})`,
  };

  let plantMessage = '';

  switch (plantType) {
    case 'metal':
      plantMessage = 'Mina de Metal';
      break;
    case 'crystal':
      plantMessage = 'Mina de Cristal';
      break;
    case 'deuterium':
      plantMessage = 'Sintetizador de Deuterio';
      break;
    default:
      break;
  }

  return (
    <>
      <picture className="project__card" style={cardStyle} onClick={() => onClickShow()}>
        <div className="project__overlay"></div>
        <div className='project__subcontent'>
          <p className="project__description">
            {plantMessage}
            <span className="project__description-text">
              {currentLevel}
            </span>
          </p>
        </div>
      </picture>
    </>
  );
};
