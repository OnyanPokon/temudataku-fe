import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AntdConfigProviders, AuthProvider, CrudModalProvider, NotificationProvider } from './providers';
import 'leaflet/dist/leaflet.css';
import CartProvider from './providers/CartProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <AntdConfigProviders>
        <NotificationProvider>
          <AuthProvider>
            <CrudModalProvider>
              <App />
            </CrudModalProvider>
          </AuthProvider>
        </NotificationProvider>
      </AntdConfigProviders>
    </CartProvider>
  </StrictMode>
);
