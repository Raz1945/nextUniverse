import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { RequireAuth } from '../components/RequireAuth';
import { Welcome } from '../pages/Welcome';
import { Main } from '../pages/Main';
import { Installations } from '../pages/Installations';

import { Navigate } from 'react-router-dom';
export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Redirección desde "/" a "/welcome/login"
      {
        index: true,
        element: <Navigate to="/welcome/login" replace />
      },
      {
        path: 'welcome',
        element: <Welcome />,
        children: [
          // Redirección desde "/welcome" a "/welcome/login"
          {
            index: true,
            element: <Navigate to="login" replace />
          },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'main',
            element: <Main />,
            children: [
              { path: 'installations', element: <Installations /> },
              { index: true, element: <Installations /> },
              { path: 'hangar', element: <h1>Hangar</h1> },
            ],
          },
        ],
      },
      { path: '*', element: <h1>Missing</h1> },
    ],
  },
]);
