import { archiveDocuments, archiveImages, armorImages, armors, evidenceNodes, evidenceRelations, factionImages, factions, locationImages, locations, operatorImages, operators, timeline, validateData } from '.';

describe('intégrité du canon NEXUS', () => {
  it('utilise des identifiants uniques et des relations valides', () => { expect(validateData()).toEqual([]); });
  it('expose les cinq zones de VANTA', () => { expect(locations.map((item) => item.name)).toEqual(['La Couronne','Le Voile','Les Profondeurs','Cimetière numérique','Zone Zéro']); });
  it('ordonne les événements chronologiques', () => { expect(timeline.map((item) => item.sort)).toEqual([...timeline].sort((a,b) => a.sort-b.sort).map((item) => item.sort)); });
  it('référence des armures et factions existantes', () => {
    expect(operators.every((operator) => armors.some((armor) => armor.id === operator.armorId))).toBe(true);
    expect(factions.every((faction) => faction.relationships.every((relation) => factions.some((target) => target.id === relation.targetId)))).toBe(true);
  });
  it('utilise des identifiants uniques pour tous les documents', () => { expect(new Set(archiveDocuments.map((item) => item.id)).size).toBe(archiveDocuments.length); });
  it('relie uniquement des nœuds d’enquête valides', () => { const ids=new Set(evidenceNodes.map((item) => item.id)); expect(evidenceRelations.every((relation) => ids.has(relation.from) && ids.has(relation.to))).toBe(true); });
  it('associe chaque indice à son document source', () => { const clues=archiveDocuments.flatMap((document) => document.pages.flatMap((page) => page.blocks.filter((block) => block.type === 'clue').map((block) => ({document,block})))); expect(clues.every(({document,block}) => document.onOpenEffects?.some((effect) => effect.type === 'discover-clue' && effect.id === block.clueId))).toBe(true); });
  it('associe chaque entité publiée à un visuel local optimisé', () => {
    expect(operators.every(({id}) => operatorImages[id]?.endsWith('.webp'))).toBe(true);
    expect(armors.every(({id}) => armorImages[id]?.endsWith('.webp'))).toBe(true);
    expect(factions.every(({id}) => factionImages[id]?.endsWith('.webp'))).toBe(true);
    expect(locations.every(({id}) => locationImages[id]?.endsWith('.webp'))).toBe(true);
    expect(archiveDocuments.every(({id}) => archiveImages[id]?.endsWith('.webp'))).toBe(true);
  });
});
