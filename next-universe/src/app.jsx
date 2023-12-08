import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './context/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';
import './app.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<AppRoutes />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
