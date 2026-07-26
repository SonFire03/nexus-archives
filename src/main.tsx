import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/panels.css';
import './styles/controls.css';
import './styles/navigation.css';
import './styles/dashboard.css';
import './styles/pages.css';
import './styles/animations.css';
import './styles/effects.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
