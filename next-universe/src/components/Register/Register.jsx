// todo => Agregar verificaciones de si el Nombre de Usuario existe en la DB o no.
// todo => Agregar verificaciones de si el Email existe en la DB o no, para que no pueda haber dos usuarios cn el mismo email.
// todo => Cambiar iconos por los de React Icons


import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'; // Cambiar iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../../api/axios';

import './Register.css';
import { useLocation, useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const REGISTER_URL = '/register';

export const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus(); //?
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({
          userName: user,
          email,
          password: pwd,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // habilitar el intercambio de credenciales en el contexto de políticas de seguridad de acceso a recursos entre dominios (CORS). Esto permite que las credenciales (como cookies) se incluyan en la solicitud si es necesario para autenticación y sesiones en el servidor.
        }
      );

      console.log(response.data);
      // console.log(response.accessToken);
      // console.log(JSON.stringify(response));

      // Limpiar campos de entrada
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
      navigate(from, { replace: true });
    }
    catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className='register__wrapper'>
      <section className='register__section'>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <h1 className="register__title">Let&apos;s Get Started</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          {/* <label htmlFor="username" className={"register__label"}>
          </label> */}
          <div className='register__input-relative'>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder='Username'
              className={`register__input ${validName ? 'valid' : ''} ${validName || !user ? '' : 'invalid'}`}
            />
            <div className={`instructions__wrapper ${userFocus && user && !validName ? 'onscreen' : ''}`}>
              <div className='instructions__text_wrapper'>
                <FontAwesomeIcon icon={faInfoCircle} />
                <span id="uidnote" className="instructions__text">
                  4 to 20 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
                </span>
              </div>
            </div>
          </div>





          <label htmlFor="email" className='register__label'>
            <span className={validEmail ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailnote"
            placeholder='Email'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="register__input"
          />
          <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must be a valid email address.
          </p>

          <label htmlFor="password" className='register__label'>
            <span className={validPwd ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby="pwdnote"
            placeholder='Password'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="register__input"
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 20 characters.<br />
            Must include uppercase and lowercase letters, a number, and a special character.<br />
            Allowed special characters: !, @, #, $, %.
          </p>

          <label htmlFor="confirm_pwd" className='register__label'>
            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_pwd"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby="confirmnote"
            placeholder='Confirm password'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="register__input"
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button className="button-34 " disabled={!validName || !validEmail || !validPwd || !validMatch}>Sign up</button>
        </form>
        <p>
          Already registered?<br />
          <span className="line">
            {/* Agrega un enlace de ruta al login */}
            <a href="login">Sign in</a>
          </span>
        </p>
      </section>
    </div>
  );
};
