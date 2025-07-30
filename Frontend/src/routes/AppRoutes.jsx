import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { RequireAuth } from '../components/RequireAuth';

import { Layout } from '../components/Layout/Layout';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { Welcome } from '../pages/Welcome';

import { Main } from '../pages/Main';
import { Installations } from '../pages/Installations';

//todo Paginas en costruccion
import { Research } from '../pages/Research';
import { Defense } from '../pages/Defense';
import { Fleet } from '../pages/Fleet';
import { Alliance } from '../pages/Alliance';
import { Galaxy } from '../pages/Galaxy';
import { Empire } from '../pages/Empire';
import { Store } from '../pages/Store';
import { Hangar } from '../pages/Hangar';
import { Overview } from '../pages/Overview';

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
              // Rutas de las páginas principales
              { path: 'overview', element: <Overview /> },
              { index: true, element: <Overview /> }, // Redirección a Overview por defecto 
              { path: 'installations', element: <Installations /> },
              { path: 'hangar', element: <Hangar /> },
              { path: 'research', element: <Research /> },
              { path: 'defense', element: <Defense /> },
              { path: 'fleet', element: <Fleet /> },
              { path: 'alliance', element: <Alliance /> },
              { path: 'galaxy', element: <Galaxy /> },
              { path: 'empire', element: <Empire /> },
              { path: 'store', element: <Store /> },
            ],
          },
        ],
      }
    ],
  },
]);
