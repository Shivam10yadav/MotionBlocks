import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SmoothScrollProvider } from "./lib/SmoothScrollProvider";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <SmoothScrollProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </SmoothScrollProvider>
)
