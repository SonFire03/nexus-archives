export { operators } from './operators';
export { armors } from './armors';
export { factions } from './factions';
export { locations } from './locations';
export { timeline } from './timeline';
export { transmissions } from './transmissions';
export { archiveDocuments } from './archives';
export { chapterZeroObjectives, evidenceNodes, evidenceRelations, narrativeEvents, chapterCompletionRequirements } from './chapterZero';
export { brandImages, operatorImages, armorImages, factionImages, locationImages, archiveImages } from './visualAssets';

import { operators } from './operators';
import { armors } from './armors';
import { factions } from './factions';
import { locations } from './locations';
import { timeline } from './timeline';
import { archiveDocuments } from './archives';
import { evidenceNodes, evidenceRelations } from './chapterZero';

export function validateData(): string[] {
  const errors: string[] = [];
  const collections = [operators, armors, factions, locations, timeline, archiveDocuments, evidenceNodes, evidenceRelations];
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
  const entityIds = new Set([...operators.map(({id}) => id), ...locations.map(({id}) => id), ...factions.map(({id}) => id), ...timeline.map(({id}) => id), ...archiveDocuments.map(({id}) => id)]);
  for (const document of archiveDocuments) {
    for (const reference of document.references ?? []) if (!entityIds.has(reference.id)) errors.push(`Référence d’archive inconnue : ${reference.id}.`);
    for (const page of document.pages) for (const block of page.blocks) if (block.type === 'clue' && !document.onOpenEffects?.some((effect) => effect.type === 'discover-clue' && effect.id === block.clueId)) errors.push(`Indice sans effet source : ${block.clueId}.`);
  }
  const nodeIds = new Set(evidenceNodes.map(({id}) => id));
  for (const relation of evidenceRelations) if (!nodeIds.has(relation.from) || !nodeIds.has(relation.to)) errors.push(`Relation d’enquête invalide : ${relation.id}.`);
  return errors;
}
