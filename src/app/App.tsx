import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { ProgressProvider } from '../state/ProgressContext';
import { AppRouter } from './router';

export default function App() {
  return <ErrorBoundary><ProgressProvider><AppRouter /></ProgressProvider></ErrorBoundary>;
}
