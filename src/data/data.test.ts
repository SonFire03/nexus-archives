import { armors, factions, locations, operators, timeline, validateData } from '.';

describe('intégrité du canon NEXUS', () => {
  it('utilise des identifiants uniques et des relations valides', () => { expect(validateData()).toEqual([]); });
  it('expose les cinq zones de VANTA', () => { expect(locations.map((item) => item.name)).toEqual(['La Couronne','Le Voile','Les Profondeurs','Cimetière numérique','Zone Zéro']); });
  it('ordonne les événements chronologiques', () => { expect(timeline.map((item) => item.sort)).toEqual([...timeline].sort((a,b) => a.sort-b.sort).map((item) => item.sort)); });
  it('référence des armures et factions existantes', () => {
    expect(operators.every((operator) => armors.some((armor) => armor.id === operator.armorId))).toBe(true);
    expect(factions.every((faction) => faction.relationships.every((relation) => factions.some((target) => target.id === relation.targetId)))).toBe(true);
  });
});
