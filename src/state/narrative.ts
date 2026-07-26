import { accessOrder, deriveAccessLevel, mergeUnique } from './progress';
import type { ArchiveDocument, NarrativeEffect, ProgressState, TerminalResult, UnlockRequirement } from '../types';
import { chapterCompletionRequirements } from '../data/chapterZero';

export function requirementMet(requirement: UnlockRequirement, progress: ProgressState): boolean {
  if (requirement.type === 'access') return accessOrder.indexOf(progress.accessLevel) >= accessOrder.indexOf(requirement.value);
  if (requirement.type === 'secret') return progress.unlockedSecrets.includes(requirement.value);
  if (requirement.type === 'objective') return progress.completedObjectives.includes(requirement.value);
  return progress.completedChapters.includes(requirement.value);
}

export function isDocumentAvailable(document: ArchiveDocument, progress: ProgressState): boolean {
  if (document.requirements?.length) return document.requirements.every((requirement) => requirementMet(requirement, progress));
  return accessOrder.indexOf(progress.accessLevel) >= accessOrder.indexOf(document.classification);
}

export function applyNarrativeEffects(progress: ProgressState, effects: NarrativeEffect[]): ProgressState {
  const next = { ...progress };
  for (const effect of effects) {
    if (effect.type === 'unlock-secret') next.unlockedSecrets = mergeUnique(next.unlockedSecrets, [effect.id]);
    if (effect.type === 'complete-objective') next.completedObjectives = mergeUnique(next.completedObjectives, [effect.id]);
    if (effect.type === 'discover-clue') {
      next.discoveredClues = mergeUnique(next.discoveredClues, [effect.id]);
      if (effect.id === 'clue-z-2219') next.completedObjectives = mergeUnique(next.completedObjectives, ['identify-z-2219']);
    }
    if (effect.type === 'add-evidence-node') next.evidenceNodes = mergeUnique(next.evidenceNodes, [effect.id]);
    if (effect.type === 'add-evidence-relation') next.evidenceRelations = mergeUnique(next.evidenceRelations, [effect.id]);
    if (effect.type === 'transmission') next.selectedTransmission = effect.id;
    if (effect.type === 'narrative-event') next.lastNarrativeEvent = effect.id;
  }
  next.accessLevel = deriveAccessLevel(next);
  return next;
}

export function applyTerminalResult(progress: ProgressState, result: TerminalResult): ProgressState {
  const next: ProgressState = {
    ...progress,
    unlockedSecrets: mergeUnique(progress.unlockedSecrets, result.unlocks ?? []),
    completedObjectives: mergeUnique(progress.completedObjectives, result.completedObjectives ?? []),
    discoveredClues: mergeUnique(progress.discoveredClues, result.discoveredClues ?? []),
    evidenceNodes: mergeUnique(progress.evidenceNodes, result.evidenceNodes ?? []),
    evidenceRelations: mergeUnique(progress.evidenceRelations, result.evidenceRelations ?? []),
    selectedTransmission: result.transmissionId ?? progress.selectedTransmission,
    lastNarrativeEvent: result.notification ?? progress.lastNarrativeEvent,
    spectralContactCount: progress.spectralContactCount + (result.spectralEvent ? 1 : 0),
  };
  if (result.accessLevelChange) next.accessLevel = result.accessLevelChange;
  return { ...next, accessLevel: deriveAccessLevel(next) };
}

export function canCompleteChapterZero(progress: ProgressState): boolean {
  return chapterCompletionRequirements.every((id) => progress.completedObjectives.includes(id)) && progress.unlockedSecrets.includes('message-future-crimson');
}

export function completeChapterZero(progress: ProgressState): ProgressState {
  if (progress.completedChapters.includes('chapter-zero') || !canCompleteChapterZero(progress)) return progress;
  const next: ProgressState = {
    ...progress,
    completedObjectives: mergeUnique(progress.completedObjectives, ['link-main-evidence','identify-nx-s-intervention']),
    completedChapters: mergeUnique(progress.completedChapters, ['chapter-zero']),
    unlockedSecrets: mergeUnique(progress.unlockedSecrets, ['nx-s-contact-01','document-dossier-sept-corps']),
    evidenceNodes: mergeUnique(progress.evidenceNodes, ['nx-s','sept-corps','protocole-cendre']),
    evidenceRelations: mergeUnique(progress.evidenceRelations, ['continuite-genere-nxs','sept-corps-identite-a7','fil-restaure-a7','cendre-detruit-zero']),
    spectralContactCount: progress.spectralContactCount + 1,
    selectedTransmission: 'nx-s-contact-01',
    lastNarrativeEvent: 'chapter-zero-complete',
  };
  return { ...next, accessLevel: deriveAccessLevel(next) };
}
