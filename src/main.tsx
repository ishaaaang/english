import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EscapeRoom from './escape/EscapeRoom';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EscapeRoom />
  </StrictMode>
);
