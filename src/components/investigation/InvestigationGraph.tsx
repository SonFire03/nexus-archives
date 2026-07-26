import type { KeyboardEvent } from 'react';
import type { EvidenceNode, EvidenceRelation } from '../../types';

const positions: Record<string, { x: number; y: number }> = {
  'nuit-zero':{x:360,y:80}, a7:{x:180,y:220}, crimson:{x:540,y:220}, 'zone-zero':{x:360,y:610},
  'projet-continuite':{x:360,y:260}, 'nx-s':{x:360,y:450}, 'fil-mnesique':{x:590,y:390},
  'sept-corps':{x:120,y:420}, 'protocole-cendre':{x:570,y:560}, 'restauration-2224':{x:470,y:350}, directoire:{x:150,y:90},
};

export function InvestigationGraph({ nodes, relations, onSelect, selectedId }: { nodes: EvidenceNode[]; relations: EvidenceRelation[]; onSelect: (node: EvidenceNode) => void; selectedId?: string }) {
  const activate = (event: KeyboardEvent<SVGGElement>, node: EvidenceNode) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(node); } };
  const nodeIds = new Set(nodes.map((node) => node.id));
  return <svg className="investigation-graph" viewBox="0 0 720 700" role="img" aria-labelledby="investigation-title investigation-desc">
    <title id="investigation-title">Tableau visuel des preuves de la Nuit Zéro</title><desc id="investigation-desc">Les preuves découvertes sont reliées par les relations établies. Une liste textuelle équivalente suit le graphe.</desc>
    <defs><pattern id="evidence-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth=".4" /></pattern></defs><rect width="720" height="700" fill="url(#evidence-grid)" opacity=".25" />
    {relations.filter((relation) => nodeIds.has(relation.from) && nodeIds.has(relation.to)).map((relation) => { const from=positions[relation.from]!; const to=positions[relation.to]!; return <g key={relation.id} className="evidence-edge"><line x1={from.x} y1={from.y} x2={to.x} y2={to.y} /><text x={(from.x+to.x)/2} y={(from.y+to.y)/2-7} textAnchor="middle">{relation.label.toUpperCase()}</text></g>; })}
    {nodes.map((node) => { const position=positions[node.id] ?? {x:360,y:350}; return <g key={node.id} role="button" tabIndex={0} aria-label={`${node.label}, ${node.category}`} className={`evidence-node ${node.id === 'nx-s' ? 'is-spectral' : ''} ${selectedId === node.id ? 'selected' : ''}`} transform={`translate(${position.x} ${position.y})`} onClick={() => onSelect(node)} onKeyDown={(event) => activate(event,node)}><path d="M-72-24H54L72-6V24H-72Z" /><text textAnchor="middle" y="-2">{node.label.toUpperCase()}</text><text className="node-category" textAnchor="middle" y="14">{node.category.toUpperCase()}</text></g>; })}
  </svg>;
}
