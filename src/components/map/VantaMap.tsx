import type { KeyboardEvent } from 'react';
import type { Location } from '../../types';

export function VantaMap({ locations, selectedId, onSelect }: { locations: Location[]; selectedId: string; onSelect: (location: Location) => void }) {
  const activate = (event: KeyboardEvent<SVGGElement>, location: Location) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(location); }
  };
  return <svg className="vanta-map" viewBox="0 0 720 760" role="img" aria-labelledby="vanta-map-title vanta-map-desc">
    <title id="vanta-map-title">Carte verticale interactive de VANTA</title><desc id="vanta-map-desc">Cinq niveaux superposés, de La Couronne à Zone Zéro. Utilisez Tab puis Entrée ou Espace pour ouvrir un secteur.</desc>
    <defs><pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth=".5" /></pattern></defs>
    <rect x="0" y="0" width="720" height="760" fill="url(#map-grid)" opacity=".18" />
    <path d="M360 38L550 125 620 590 360 716 100 590 170 125Z" className="city-outline" />
    {locations.map((location,index) => {
      const y = 75 + index * 128; const half = 130 + index * 22;
      return <g key={location.id} className={`map-zone is-${location.color} ${selectedId === location.id ? 'selected' : ''}`} role="button" tabIndex={0} aria-label={`${location.name}, danger ${location.danger}`} onClick={() => onSelect(location)} onKeyDown={(event) => activate(event, location)}>
        <path d={`M${360-half} ${y+50}L360 ${y}L${360+half} ${y+50}L${360+half-18} ${y+98}L360 ${y+122}L${360-half+18} ${y+98}Z`} />
        <text x="360" y={y+58} textAnchor="middle">0{location.level} // {location.name.toUpperCase()}</text>
        <text className="map-danger" x="360" y={y+82} textAnchor="middle">MENACE {location.danger}</text>
        <circle cx={360-half+8} cy={y+50} r="4" /><circle cx={360+half-8} cy={y+50} r="4" />
      </g>;
    })}
    <path d="M360 55V705" className="core-line" /><text x="380" y="370" className="core-label">NEXUS CORE // AXE NEURAL</text>
  </svg>;
}
