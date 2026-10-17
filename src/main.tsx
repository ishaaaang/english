import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AskRaaga from './ask/AskRaaga';
import './index.css';
import './ask/ask.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AskRaaga />
  </StrictMode>
);
