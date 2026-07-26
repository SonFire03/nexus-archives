import type { Transmission } from '../../types';
import { Icon } from './Icon';

export function TransmissionCard({ transmission }: { transmission: Transmission }) {
  const spectral = transmission.sender.includes('NX-S');
  const crimson = transmission.sender.includes('CRIMSON');
  const sourceTone = spectral ? 'spectral' : crimson ? 'crimson' : transmission.sender === 'DIRECTOIRE' ? 'directoire' : 'operator';
  const channel = spectral ? 'SPECTRE-00' : crimson ? 'FIL-R9' : transmission.sender === 'DIRECTOIRE' ? 'DIR-PRIORITÉ' : 'OMEGA-07';
  return <blockquote className={`transmission transmission--${sourceTone} ${spectral ? 'is-spectral' : ''}`}><div className="transmission__source"><span><Icon name="transmission" size={18} /></span><div><strong>{transmission.sender}</strong><small>CANAL // {channel}</small></div><em>{spectral ? 'SIGNAL ALTÉRÉ' : 'AUTHENTICITÉ 87%'}</em></div><p>« {transmission.text} »</p><footer><span>{transmission.trigger.toUpperCase()}</span><span>ARCHIVÉ // NON LU</span></footer></blockquote>;
}
