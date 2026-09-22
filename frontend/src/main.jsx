import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "sonner";
import App from './App.jsx'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/global.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
