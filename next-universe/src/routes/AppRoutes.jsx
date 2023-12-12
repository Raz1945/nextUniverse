import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { RequireAuth } from '../components/RequireAuth';
import { Welcome } from '../pages/Welcome';
import { Overview } from '../pages/Overview';
import { Installations } from '../pages/Installations';

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes  */}
        <Route path="/" element={<Welcome />} /> {/* Ruta a la Pagina de Inicio */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes   */}
        <Route element={<RequireAuth />}>
          <Route path="/overview" element={<Overview />} /> {/* Ruta a la Pagina Principal  */}
          <Route path="/installations" element={<Installations />} /> {/* Ruta a la Pagina de Instalaciones  */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>Missing</h1>} />
      </Route>
    </Routes>
  )
}

