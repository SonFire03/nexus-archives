export type IconName = 'dashboard' | 'vanta' | 'operators' | 'armors' | 'factions' | 'timeline' | 'terminal' | 'archives' | 'investigation' | 'settings' | 'audio' | 'network' | 'spectral' | 'alert' | 'objective' | 'transmission' | 'collapse' | 'menu' | 'close';

const paths: Record<IconName, React.ReactNode> = {
  dashboard: <><path d="M3 4h7v6H3zM14 4h7v10h-7zM3 14h7v6H3zM14 18h7v2h-7z" /></>,
  vanta: <><path d="m4 19 4-14 4 14 4-10 4 10M2 19h20" /><path d="M8 9h8M7 14h11" /></>,
  operators: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 7h4M19 5v4M17 14h4" /></>,
  armors: <><path d="m8 3-4 4 2 13h12l2-13-4-4-4 3zM8 3l4 3 4-3M9 11h6M10 15h4" /></>,
  factions: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m11 7-5 9M13 7l5 9M7 18h10" /></>,
  timeline: <><path d="M4 5h16M4 12h16M4 19h16" /><circle cx="8" cy="5" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="10" cy="19" r="2" /></>,
  terminal: <><path d="M3 5h18v14H3zM7 9l3 3-3 3M13 15h4" /></>,
  archives: <><path d="M5 3h12l2 2v16H5zM8 8h8M8 12h8M8 16h5" /><path d="M17 3v4h4" /></>,
  investigation: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="7" r="2" /><circle cx="15" cy="17" r="3" /><path d="m10 9 5-1M9 11l4 4M17 9l-1 5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  audio: <><path d="M4 10h4l5-4v12l-5-4H4zM17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12" /></>,
  network: <><circle cx="12" cy="18" r="2" /><path d="M7 13a7 7 0 0 1 10 0M4 9a11 11 0 0 1 16 0" /></>,
  spectral: <><path d="M3 12h3l2-6 4 12 3-9 2 6h4" /></>,
  alert: <><path d="M12 3 2.8 20h18.4zM12 9v5M12 17h.01" /></>,
  objective: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m12 12 7-7" /></>,
  transmission: <><path d="M3 6h18v12H3zM3 7l9 7 9-7" /></>,
  collapse: <><path d="m14 6-6 6 6 6M20 4v16" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="M5 5l14 14M19 5 5 19" /></>,
};

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
