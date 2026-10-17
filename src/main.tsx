import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AskRaaga from './ask/AskRaaga';
import EscapeRoom from './escape/EscapeRoom';
import './index.css';
import './ask/ask.css';

// The original escape room is still available at /?escape
const showEscape = new URLSearchParams(window.location.search).has('escape');

createRoot(document.getElementById('root')!).render(
  <StrictMode>{showEscape ? <EscapeRoom /> : <AskRaaga />}</StrictMode>
);
