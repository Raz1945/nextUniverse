import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Cambiar iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RegisterInstruction = ({ focus, refe, valid, children }) => {
  return (
    <>
      <div className={`instructions__wrapper ${focus && refe && !valid ? 'onscreen' : ''}`}>
        <div className='instructions__text_wrapper'>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span id="uidnote" className="instructions__text">
            {children}
          </span>
        </div>
      </div>
    </>
  );
};

