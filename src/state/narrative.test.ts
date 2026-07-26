import { chapterCompletionRequirements } from '../data';
import { applyNarrativeEffects, applyTerminalResult, canCompleteChapterZero, completeChapterZero, isDocumentAvailable } from './narrative';
import { defaultProgress, loadProgress, saveProgress } from './progress';
import { archiveDocuments } from '../data/archives';

describe('progression narrative du Chapitre 01', () => {
  it('applique les effets sans doublon', () => { const effect={type:'unlock-secret' as const,id:'x'}; const once=applyNarrativeEffects(defaultProgress,[effect]); expect(applyNarrativeEffects(once,[effect]).unlockedSecrets).toEqual(['x']); });
  it('déverrouille la restauration après le terminal', () => { const next=applyTerminalResult(defaultProgress,{output:[],unlocks:['document-restauration-2224']}); expect(isDocumentAvailable(archiveDocuments.find((item) => item.id === 'restauration-2224')!,next)).toBe(true); });
  it('refuse TACTIQUE avant toutes les conditions', () => { expect(canCompleteChapterZero({...defaultProgress,completedObjectives:chapterCompletionRequirements})).toBe(false); expect(completeChapterZero({...defaultProgress,completedObjectives:chapterCompletionRequirements}).accessLevel).toBe('CIVIL'); });
  it('termine le chapitre et accorde TACTIQUE', () => { const ready={...defaultProgress,completedObjectives:chapterCompletionRequirements,unlockedSecrets:['message-future-crimson']}; const complete=completeChapterZero(ready); expect(complete.completedChapters).toContain('chapter-zero'); expect(complete.accessLevel).toBe('TACTIQUE'); expect(complete.completedObjectives).toContain('identify-nx-s-intervention'); });
  it('ne déclenche le contact NX-S qu’une fois', () => { const ready={...defaultProgress,completedObjectives:chapterCompletionRequirements,unlockedSecrets:['message-future-crimson']}; const once=completeChapterZero(ready); const twice=completeChapterZero(once); expect(twice.spectralContactCount).toBe(1); });
  it('persiste un chapitre terminé après rechargement', () => { const complete={...defaultProgress,completedChapters:['chapter-zero'],accessLevel:'TACTIQUE' as const}; saveProgress(complete); expect(loadProgress()).toEqual(complete); });
});
