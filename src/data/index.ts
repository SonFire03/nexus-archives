export { operators } from './operators';
export { armors } from './armors';
export { factions } from './factions';
export { locations } from './locations';
export { timeline } from './timeline';
export { transmissions } from './transmissions';
export { archiveDocuments } from './archives';

import { operators } from './operators';
import { armors } from './armors';
import { factions } from './factions';
import { locations } from './locations';
import { timeline } from './timeline';

export function validateData(): string[] {
  const errors: string[] = [];
  const collections = [operators, armors, factions, locations, timeline];
  for (const collection of collections) {
    const ids = collection.map((item) => item.id);
    if (new Set(ids).size !== ids.length) errors.push('Identifiants dupliqués détectés.');
  }
  for (const operator of operators) {
    if (!armors.some((armor) => armor.id === operator.armorId)) errors.push(`Armure manquante pour ${operator.id}.`);
  }
  for (const faction of factions) {
    for (const relation of faction.relationships) {
      if (!factions.some((candidate) => candidate.id === relation.targetId)) errors.push(`Faction inconnue : ${relation.targetId}.`);
    }
  }
  for (const armor of armors) {
    if (Object.values(armor.stats).some((value) => value < 0 || value > 10)) errors.push(`Statistique invalide : ${armor.id}.`);
  }
  if (timeline.some((event, index) => index > 0 && event.sort < (timeline[index - 1]?.sort ?? -Infinity))) errors.push('Chronologie désordonnée.');
  return errors;
}
