import { useProgress } from '../../state/ProgressContext';

export function NarrativeNotification() {
  const { notification, dismissNotification } = useProgress();
  if (!notification) return null;
  return <aside className={`narrative-notification is-${notification.kind}`} role="status" aria-live="polite"><span>{notification.kind === 'spectral' ? '◇ NX-S' : 'NOUVEL ÉVÉNEMENT'}</span><strong>{notification.title}</strong><p>{notification.message}</p><button aria-label="Fermer la notification" onClick={dismissNotification}>×</button></aside>;
}
