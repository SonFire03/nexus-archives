import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterFourCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import ChapterFourPage from './ChapterFourPage';
import TruthReconstructionPage from './TruthReconstructionPage';

describe('Chapitre 04 — Vérité originale', () => {
  it('reconstruit quatre faits invariants et conserve l’origine liée à la Porte', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-four',unlockedSecrets:['truth-reconstructor-online'],narrativeChoices:{'continuity-gate':'seal'}}));
    const user=userEvent.setup();
    renderRoute(<TruthReconstructionPage />,'/truth-reconstruction');
    expect(screen.getByText('CACHE EXFILTRÉ PAR MÈRE ÉCHO AVANT SCELLEMENT')).toBeInTheDocument();
    for (const name of [/sorties de Zone Zéro/,/A7 servait d’ancre/,/R-9 a rétabli/,/thèse terroriste/]) await user.click(screen.getByRole('button',{name}));
    await user.click(screen.getByRole('button',{name:'ISOLER LES FAITS INVARIANTS'}));
    expect(await screen.findByText('LE MENSONGE PRÉCÈDE LA CATASTROPHE.')).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {solvedPuzzles?:string[]}; expect(stored.solvedPuzzles).toContain('mirror-truth-invariants'); });
  });

  it('refuse une assertion issue uniquement du récit public', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-four',unlockedSecrets:['truth-reconstructor-online']}));
    const user=userEvent.setup();
    renderRoute(<TruthReconstructionPage />,'/truth-reconstruction');
    for (const name of [/sorties de Zone Zéro/,/A7 servait d’ancre/,/R-9 a rétabli/,/réacteur expérimental/]) await user.click(screen.getByRole('button',{name}));
    await user.click(screen.getByRole('button',{name:'ISOLER LES FAITS INVARIANTS'}));
    expect(screen.getByRole('alert')).toHaveTextContent('COHÉRENCE REFUSÉE');
  });

  it('archive la fragmentation de MIRROR-00', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'NOIR ABSOLU',activeChapter:'chapter-four',completedChapters:['chapter-zero','chapter-two','chapter-three'],completedObjectives:chapterFourCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterFourPage />,'/chapter-four');
    await user.click(screen.getByRole('radio',{name:/FRAGMENTER LA VÉRITÉ/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER FRAGMENTER LA VÉRITÉ/}));
    expect(await screen.findByRole('heading',{name:'DESTIN DE MIRROR-00 ARCHIVÉ'})).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {narrativeChoices?:Record<string,string>}; expect(stored.narrativeChoices?.['mirror-00']).toBe('fragment'); });
  });
});
