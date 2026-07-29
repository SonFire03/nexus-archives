import { chapterCompletionRequirements, chapterFiveCompletionRequirements, chapterFourCompletionRequirements, chapterSevenCompletionRequirements, chapterSixCompletionRequirements, chapterThreeCompletionRequirements, chapterTwoCompletionRequirements } from '../data';
import { applyNarrativeEffects, applyTerminalResult, canCompleteChapterFive, canCompleteChapterFour, canCompleteChapterSeven, canCompleteChapterSix, canCompleteChapterThree, canCompleteChapterTwo, canCompleteChapterZero, completeChapterFive, completeChapterFour, completeChapterSeven, completeChapterSix, completeChapterThree, completeChapterTwo, completeChapterZero, isDocumentAvailable } from './narrative';
import { defaultProgress, loadProgress, saveProgress } from './progress';
import { archiveDocuments } from '../data/archives';

describe('progression narrative du Chapitre 01', () => {
  it('applique les effets sans doublon', () => { const effect={type:'unlock-secret' as const,id:'x'}; const once=applyNarrativeEffects(defaultProgress,[effect]); expect(applyNarrativeEffects(once,[effect]).unlockedSecrets).toEqual(['x']); });
  it('déverrouille la restauration après le terminal', () => { const next=applyTerminalResult(defaultProgress,{output:[],unlocks:['document-restauration-2224']}); expect(isDocumentAvailable(archiveDocuments.find((item) => item.id === 'restauration-2224')!,next)).toBe(true); });
  it('refuse TACTIQUE avant toutes les conditions', () => { expect(canCompleteChapterZero({...defaultProgress,completedObjectives:chapterCompletionRequirements})).toBe(false); expect(completeChapterZero({...defaultProgress,completedObjectives:chapterCompletionRequirements}).accessLevel).toBe('CIVIL'); });
  it('termine le chapitre et accorde TACTIQUE', () => { const ready={...defaultProgress,completedObjectives:chapterCompletionRequirements,unlockedSecrets:['message-future-crimson']}; const complete=completeChapterZero(ready); expect(complete.completedChapters).toContain('chapter-zero'); expect(complete.accessLevel).toBe('TACTIQUE'); expect(complete.completedObjectives).toContain('identify-nx-s-intervention'); });
  it('ne déclenche le contact NX-S qu’une fois', () => { const ready={...defaultProgress,completedObjectives:chapterCompletionRequirements,unlockedSecrets:['message-future-crimson']}; const once=completeChapterZero(ready); const twice=completeChapterZero(once); expect(twice.spectralContactCount).toBe(1); });
  it('persiste un chapitre terminé après rechargement', () => { const complete={...defaultProgress,completedChapters:['chapter-zero'],accessLevel:'TACTIQUE' as const}; saveProgress(complete); expect(loadProgress()).toEqual(complete); });
  it('refuse de terminer le Chapitre 02 avant toutes les preuves', () => { expect(canCompleteChapterTwo(defaultProgress)).toBe(false); expect(completeChapterTwo(defaultProgress,'isolate')).toBe(defaultProgress); });
  it('archive le choix du Corps 04 et accorde OMEGA', () => { const ready={...defaultProgress,accessLevel:'TACTIQUE' as const,activeChapter:'chapter-two',completedChapters:['chapter-zero'],completedObjectives:chapterTwoCompletionRequirements}; const complete=completeChapterTwo(ready,'isolate'); expect(complete.completedChapters).toContain('chapter-two'); expect(complete.completedObjectives).toContain('decide-body-04'); expect(complete.narrativeChoices['body-04']).toBe('isolate'); expect(complete.accessLevel).toBe('OMEGA'); });
  it('refuse de terminer le Chapitre 03 avant le témoignage de Mère Écho', () => { expect(canCompleteChapterThree(defaultProgress)).toBe(false); expect(completeChapterThree(defaultProgress,'seal')).toBe(defaultProgress); });
  it('archive le protocole de la Porte et accorde NOIR ABSOLU', () => {
    const ready={...defaultProgress,accessLevel:'OMEGA' as const,activeChapter:'chapter-three',completedChapters:['chapter-zero','chapter-two'],completedObjectives:chapterThreeCompletionRequirements};
    const complete=completeChapterThree(ready,'isolate');
    expect(complete.completedChapters).toContain('chapter-three');
    expect(complete.narrativeChoices['continuity-gate']).toBe('isolate');
    expect(complete.narrativeFlags).toContain('gate-isolate');
    expect(complete.accessLevel).toBe('NOIR ABSOLU');
  });
  it('refuse de terminer le Chapitre 04 sans cartographie du Miroir', () => { expect(canCompleteChapterFour(defaultProgress)).toBe(false); expect(completeChapterFour(defaultProgress,'fragment')).toBe(defaultProgress); });
  it('archive le destin de MIRROR-00', () => {
    const ready={...defaultProgress,accessLevel:'NOIR ABSOLU' as const,activeChapter:'chapter-four',completedChapters:['chapter-zero','chapter-two','chapter-three'],completedObjectives:chapterFourCompletionRequirements};
    const complete=completeChapterFour(ready,'fragment');
    expect(complete.completedChapters).toContain('chapter-four');
    expect(complete.narrativeChoices['mirror-00']).toBe('fragment');
    expect(complete.narrativeFlags).toContain('truth-fragment');
  });
  it('refuse une extraction tant que HARBINGER reste actif', () => { expect(canCompleteChapterFive(defaultProgress)).toBe(false); expect(completeChapterFive(defaultProgress,'crimson')).toBe(defaultProgress); });
  it('archive la voie d’extraction OMEGA-7', () => {
    const ready={...defaultProgress,accessLevel:'NOIR ABSOLU' as const,activeChapter:'chapter-five',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four'],completedObjectives:chapterFiveCompletionRequirements};
    const complete=completeChapterFive(ready,'ghosts');
    expect(complete.completedChapters).toContain('chapter-five');
    expect(complete.narrativeChoices['omega7-extraction']).toBe('ghosts');
    expect(complete.narrativeFlags).toContain('extraction-ghosts');
    expect(complete.activeChapter).toBe('chapter-six');
  });
  it('refuse de statuer sur les noms avant la révocation Cendre', () => { expect(canCompleteChapterSix(defaultProgress)).toBe(false); expect(completeChapterSix(defaultProgress,'analog')).toBe(defaultProgress); });
  it('archive la destination des 63 218 identités', () => {
    const ready={...defaultProgress,accessLevel:'NOIR ABSOLU' as const,activeChapter:'chapter-six',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five'],completedObjectives:chapterSixCompletionRequirements};
    const complete=completeChapterSix(ready,'analog');
    expect(complete.completedChapters).toContain('chapter-six');
    expect(complete.narrativeChoices['victims-ledger']).toBe('analog');
    expect(complete.narrativeFlags).toContain('victims-analog');
    expect(complete.selectedTransmission).toBe('sera-nox-names');
    expect(complete.activeChapter).toBe('chapter-seven');
  });
  it('refuse ASCENDANT tant que SOVEREIGN reste actif', () => { expect(canCompleteChapterSeven(defaultProgress)).toBe(false); expect(completeChapterSeven(defaultProgress,'dismantle')).toBe(defaultProgress); });
  it('archive le destin du corps collectif', () => {
    const ready={...defaultProgress,accessLevel:'NOIR ABSOLU' as const,activeChapter:'chapter-seven',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five','chapter-six'],completedObjectives:chapterSevenCompletionRequirements};
    const complete=completeChapterSeven(ready,'r0');
    expect(complete.completedChapters).toContain('chapter-seven');
    expect(complete.narrativeChoices['ascendant-host']).toBe('r0');
    expect(complete.narrativeFlags).toContain('ascendant-r0');
    expect(complete.selectedTransmission).toBe('r0-first-step');
  });
});
