// todo => Agregar verificaciones de si el Nombre de Usuario existe en la DB o no.
// todo => Agregar verificaciones de si el Email existe en la DB o no, para que no pueda haber dos usuarios cn el mismo email.
// todo => Cambiar iconos por los de React Icons


import { useRef, useState, useEffect } from 'react';

import axios from '../../api/axios';

import './Register.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegisterInstruction } from './components/Register.Instructions';

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
        <h1 className="register__title">Let&apos;s Get Started</h1>

        <form className="register__form" onSubmit={handleSubmit}>
          {/* user */}
          <label htmlFor="username" className="visually-hidden">Username</label>
          <div className='relative'>
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
            <RegisterInstruction focus={userFocus} refe={user} valid={validName}>
              4 to 20 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </RegisterInstruction>
          </div>
          {/* email */}
          <label htmlFor="email" className='visually-hidden'>Email</label>
          <div className='relative'>
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
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder='Email'
              className={`register__input ${validEmail ? 'valid' : ''} ${validEmail || !email ? '' : 'invalid'}`}
            />
            <RegisterInstruction id="emailnote" focus={emailFocus} refe={email} valid={validEmail}>
              Must be a valid email address.
            </RegisterInstruction>
          </div>
          {/* password */}
          <label htmlFor="password" className='visually-hidden'>Password</label>
          <div className='relative'>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder='Password'
              className={`register__input ${validPwd ? 'valid' : ''} ${validPwd || !pwd ? '' : 'invalid'}`}
            />
            <RegisterInstruction focus={pwdFocus} refe={pwd} valid={validPwd}>
              8 to 20 characters.<br />
              Must include uppercase and lowercase letters, a number, and a special character.<br />
              Allowed special characters: !, @, #, $, %.
            </RegisterInstruction>
          </div>
          {/* confirm_password */}
          <label htmlFor="confirm_pwd" className='visually-hidden'>Confirm password</label>
          <div className='relative'>
            <input
              type="password"
              id="confirm_pwd"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder='Confirm password'

              className={`register__input ${validMatch && matchPwd !== '' ? 'valid' : ''} ${validMatch || !matchPwd ? '' : 'invalid'}`}

            />

            <RegisterInstruction focus={matchFocus} refe={matchPwd} valid={validMatch}>
              Must match the first password input field.
            </RegisterInstruction>
          </div>

          <button className="button-34" disabled={!validName || !validEmail || !validPwd || !validMatch}>Sign up</button>

          <p ref={errRef} className={errMsg ? "errmsg" : "visually-hidden"} aria-live="assertive">
            {errMsg}
          </p>
          
        </form>

        <div className='alredy__wrapper'>
          <p className='alredy__'>
            Already have an account?
            <a href="login" className='alredy__anchor'>Sign in</a>
          </p>
        </div>

      </section>
    </div >
  );
};
