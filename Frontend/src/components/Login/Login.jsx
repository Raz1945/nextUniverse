import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import axios from '../../api/axios';
import './Login.css';
const LOGIN_URL = '/login';

export const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/main'; // Al loguearse se envie al usuario al menu principal 

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          userName: user,
          password: pwd
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      // console.log(JSON.stringify(response?.data));
      // console.log("Respuesta del servidor:", response?.data);

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      // Guardar el token en localStorage
      localStorage.setItem('accessToken', accessToken);
      // console.log("Token guardado en localStorage:", accessToken);

      setAuth({ user, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    }
    catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login__wrapper">
      <section className='login__section'>

        <h1 className="login__title">
          Welcome back, let&apos;s continue!
        </h1>

        <form className="login__form" onSubmit={handleSubmit}>

          {/* user */}
          <label htmlFor="username" className="visually-hidden">Username</label>
          <div className="relative">
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder='Username'
              className='login__input'
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="visually-hidden">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder='Password'
              className='login__input'
            />
          </div>


          <button className="button-34">Sign In</button>

        </form>

        <div className='alredy__wrapper'>
          <p className='alredy__'>
            Need an Account?
            <a href="/welcome/register" className='alredy__anchor'>Sign Up</a>
          </p>
        </div>

        <div className='errRef'>
          <p ref={errRef} className={`errmsg ${errMsg ? "visible" : ""}`} aria-live="assertive">
            {errMsg}
          </p>
        </div>
      </section>
    </div>

  )
}
