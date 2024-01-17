// import { Route, Routes } from 'react-router-dom';
// import { Layout } from '../components/Layout/Layout';
// import { Login } from '../components/Login/Login';
// import { Register } from '../components/Register/Register';
// import { RequireAuth } from '../components/RequireAuth';
// import { Welcome } from '../pages/Welcome';
// import { Overview } from '../pages/Overview';
// import { Installations } from '../pages/Installations';

// export const AppRoutes = () => {

//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* Public routes  */}
//         <Route path="/" element={<Welcome />} /> {/* Ruta a la Pagina de Inicio */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected routes   */}
//         <Route element={<RequireAuth />}>

//           <Route path="/overview" element={<Overview />} /> {/* Ruta a la Pagina Principal  */}

//           <Route path="/installations" element={<Installations />} /> {/* Ruta a la Pagina de Instalaciones  */}
//           <Route path="/profile" element={<h1>Profile</h1>} /> {/* Ruta a la Pagina de Perfil  */}
//         </Route>

//         {/* 404 */}
//         <Route path="*" element={<h1>Missing</h1>} />
//       </Route>
//     </Routes>
//   )
// }

import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { RequireAuth } from '../components/RequireAuth';
import { Welcome } from '../pages/Welcome';
import { Main } from '../pages/Main';
import { Installations } from '../pages/Installations';

// Crear el enrutador con la nueva estructura de rutas
export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Welcome /> }, // Ruta a la página de inicio
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'main',
            element: <Main />, // Ruta a la página principal
            children: [
              { path: 'installations', element: <Installations /> },
              { index: true, element: <Installations /> }, // Se renderiza por el OutLet de 'Main'
              { path: 'hangar', element: <h1>Hangar</h1> }, // Ruta relativa a 'overview'
            ],
          },
        ],
      },
      { path: '*', element: <h1>Missing</h1> }, // 404
    ],
  },
]);


