import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store/store';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

import MainLayout     from './components/MainLayout';
import ProductsList   from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart           from './pages/Cart';
import Login          from './pages/Login';
import NotFound       from './pages/NotFound';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#0a0a0a' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text:       { primary: '#0a0a0a', secondary: '#737373' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,         element: <ProductsList /> },
      { path: 'product/:id', element: <ProductDetails /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: 'login',       element: <Login /> },
      { path: '*',           element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 2000,
              style: { borderRadius: '8px', fontSize: '14px' },
            }}
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);