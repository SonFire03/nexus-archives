import type { Transmission } from '../../types';

export function TransmissionCard({ transmission }: { transmission: Transmission }) {
  return <blockquote className={`transmission ${transmission.sender === 'NX-S' ? 'is-spectral' : ''}`}><span>TRANSMISSION // {transmission.sender}</span><p>« {transmission.text} »</p></blockquote>;
}
