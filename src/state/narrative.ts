import { accessOrder, deriveAccessLevel, mergeUnique } from './progress';
import type { ArchiveDocument, NarrativeEffect, ProgressState, TerminalResult, UnlockRequirement } from '../types';
import { chapterCompletionRequirements } from '../data/chapterZero';
import { chapterTwoChoices, chapterTwoCompletionRequirements, type ChapterTwoChoice } from '../data/chapterTwo';
import { chapterThreeChoices, chapterThreeCompletionRequirements, type ChapterThreeChoice } from '../data/chapterThree';
import { chapterFourChoices, chapterFourCompletionRequirements, type ChapterFourChoice } from '../data/chapterFour';
import { chapterFiveChoices, chapterFiveCompletionRequirements, type ChapterFiveChoice } from '../data/chapterFive';
import { chapterSixChoices, chapterSixCompletionRequirements, type ChapterSixChoice } from '../data/chapterSix';

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
    if (effect.type === 'activate-chapter') next.activeChapter = effect.id;
    if (effect.type === 'solve-puzzle') next.solvedPuzzles = mergeUnique(next.solvedPuzzles, [effect.id]);
    if (effect.type === 'flag') next.narrativeFlags = mergeUnique(next.narrativeFlags, [effect.id]);
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
    narrativeFlags: mergeUnique(progress.narrativeFlags, result.narrativeFlags ?? []),
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
    activeChapter: 'chapter-two',
  };
  return { ...next, accessLevel: deriveAccessLevel(next) };
}

export function canCompleteChapterTwo(progress: ProgressState): boolean {
  return chapterTwoCompletionRequirements.every((id) => progress.completedObjectives.includes(id));
}

export function completeChapterTwo(progress: ProgressState, choice: ChapterTwoChoice): ProgressState {
  if (progress.completedChapters.includes('chapter-two') || !canCompleteChapterTwo(progress) || !chapterTwoChoices.some((item) => item.id === choice)) return progress;
  const next: ProgressState = {
    ...progress,
    completedObjectives: mergeUnique(progress.completedObjectives, ['decide-body-04']),
    completedChapters: mergeUnique(progress.completedChapters, ['chapter-two']),
    unlockedSecrets: mergeUnique(progress.unlockedSecrets, ['chapter-two-decision','document-protocole-fil-rouge']),
    evidenceRelations: mergeUnique(progress.evidenceRelations, ['corps-04-contient-sauvegarde']),
    narrativeChoices: { ...progress.narrativeChoices, 'body-04': choice },
    selectedTransmission: 'nx-s-body-04',
    spectralContactCount: progress.spectralContactCount + 1,
    lastNarrativeEvent: 'chapter-two-complete',
    activeChapter: 'chapter-three',
  };
  return { ...next, accessLevel: deriveAccessLevel(next) };
}

export function canCompleteChapterThree(progress: ProgressState): boolean {
  return chapterThreeCompletionRequirements.every((id) => progress.completedObjectives.includes(id));
}

export function completeChapterThree(progress: ProgressState, choice: ChapterThreeChoice): ProgressState {
  if (progress.completedChapters.includes('chapter-three') || !canCompleteChapterThree(progress) || !chapterThreeChoices.some((item) => item.id === choice)) return progress;
  const next: ProgressState = {
    ...progress,
    activeChapter:'chapter-four',
    completedObjectives:mergeUnique(progress.completedObjectives,['decide-continuity-gate']),
    completedChapters:mergeUnique(progress.completedChapters,['chapter-three']),
    unlockedSecrets:mergeUnique(progress.unlockedSecrets,['chapter-three-decision','verite-enfant-r0']),
    narrativeChoices:{...progress.narrativeChoices,'continuity-gate':choice},
    narrativeFlags:mergeUnique(progress.narrativeFlags,[`gate-${choice}`]),
    selectedTransmission:'nx-s-gate-final',
    spectralContactCount:progress.spectralContactCount + 1,
    lastNarrativeEvent:'chapter-three-complete',
  };
  return {...next,accessLevel:deriveAccessLevel(next)};
}

export function canCompleteChapterFive(progress: ProgressState): boolean {
  return chapterFiveCompletionRequirements.every((id) => progress.completedObjectives.includes(id));
}

export function completeChapterFive(progress: ProgressState, choice: ChapterFiveChoice): ProgressState {
  if (progress.completedChapters.includes('chapter-five') || !canCompleteChapterFive(progress) || !chapterFiveChoices.some((item) => item.id === choice)) return progress;
  const next: ProgressState = {
    ...progress,
    activeChapter:'chapter-six',
    completedObjectives:mergeUnique(progress.completedObjectives,['choose-extraction']),
    completedChapters:mergeUnique(progress.completedChapters,['chapter-five']),
    unlockedSecrets:mergeUnique(progress.unlockedSecrets,['chapter-five-decision','omega7-extracted']),
    narrativeChoices:{...progress.narrativeChoices,'omega7-extraction':choice},
    narrativeFlags:mergeUnique(progress.narrativeFlags,[`extraction-${choice}`]),
    selectedTransmission:choice==='spectral'?'nxs-exit':'crimson-extraction',
    spectralContactCount:progress.spectralContactCount+(choice==='spectral'?1:0),
    lastNarrativeEvent:'chapter-five-complete',
  };
  return {...next,accessLevel:deriveAccessLevel(next)};
}

export function canCompleteChapterSix(progress: ProgressState): boolean {
  return chapterSixCompletionRequirements.every((id) => progress.completedObjectives.includes(id));
}

export function completeChapterSix(progress: ProgressState, choice: ChapterSixChoice): ProgressState {
  if (progress.completedChapters.includes('chapter-six') || !canCompleteChapterSix(progress) || !chapterSixChoices.some((item) => item.id === choice)) return progress;
  const next: ProgressState = {
    ...progress,
    activeChapter:'chapter-six',
    completedObjectives:mergeUnique(progress.completedObjectives,['decide-victims-ledger']),
    completedChapters:mergeUnique(progress.completedChapters,['chapter-six']),
    unlockedSecrets:mergeUnique(progress.unlockedSecrets,['chapter-six-decision','names-63218-restored']),
    narrativeChoices:{...progress.narrativeChoices,'victims-ledger':choice},
    narrativeFlags:mergeUnique(progress.narrativeFlags,[`victims-${choice}`]),
    selectedTransmission:choice==='choir'?'mother-echo-names':choice==='analog'?'sera-nox-names':'directoire-breach',
    spectralContactCount:progress.spectralContactCount+(choice==='choir'?1:0),
    lastNarrativeEvent:'chapter-six-complete',
  };
  return {...next,accessLevel:deriveAccessLevel(next)};
}

export function canCompleteChapterFour(progress: ProgressState): boolean {
  return chapterFourCompletionRequirements.every((id) => progress.completedObjectives.includes(id));
}

export function completeChapterFour(progress: ProgressState, choice: ChapterFourChoice): ProgressState {
  if (progress.completedChapters.includes('chapter-four') || !canCompleteChapterFour(progress) || !chapterFourChoices.some((item) => item.id === choice)) return progress;
  const next: ProgressState = {
    ...progress,
    activeChapter:'chapter-five',
    completedObjectives:mergeUnique(progress.completedObjectives,['decide-original-truth']),
    completedChapters:mergeUnique(progress.completedChapters,['chapter-four']),
    unlockedSecrets:mergeUnique(progress.unlockedSecrets,['chapter-four-decision','mirror-network-compromised']),
    narrativeChoices:{...progress.narrativeChoices,'mirror-00':choice},
    narrativeFlags:mergeUnique(progress.narrativeFlags,[`truth-${choice}`]),
    selectedTransmission:'orin-vale-final',
    lastNarrativeEvent:'chapter-four-complete',
  };
  return {...next,accessLevel:deriveAccessLevel(next)};
}
