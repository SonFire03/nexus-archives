import { useState } from 'react';
import { AssetPlaceholder } from './AssetPlaceholder';

type AssetVariant = 'operator' | 'armor' | 'faction' | 'archive' | 'location' | 'brand';

const dimensions: Record<AssetVariant, { width: number; height: number }> = {
  operator:{width:1024,height:1536},
  armor:{width:1024,height:1536},
  faction:{width:768,height:768},
  archive:{width:1672,height:941},
  location:{width:1536,height:1024},
  brand:{width:768,height:768},
};

export function AssetImage({ src, alt, label, variant, className = '', eager = false }: { src?: string; alt: string; label: string; variant: AssetVariant; className?: string; eager?: boolean }) {
  const [failed,setFailed] = useState(false);
  if (!src || failed) return <AssetPlaceholder label={label} variant={variant === 'archive' || variant === 'location' || variant === 'brand' ? 'faction' : variant} />;
  const size = dimensions[variant];
  return <div className={`asset-image asset-image--${variant} ${className}`}><img src={src} alt={alt} width={size.width} height={size.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding={eager ? 'sync' : 'async'} onError={() => setFailed(true)} /><span aria-hidden="true">NEXUS // VISUEL AUTHENTIFIÉ</span></div>;
}
