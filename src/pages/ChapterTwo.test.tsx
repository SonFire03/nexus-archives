import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterTwoCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import ChapterTwoPage from './ChapterTwoPage';
import MemoryReconstructionPage from './MemoryReconstructionPage';

describe('Chapitre 02 — Les Sept Corps', () => {
  it('reconstruit la séquence 04:17 et la sauvegarde', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-two',unlockedSecrets:['memory-reconstructor-0417']}));
    const user=userEvent.setup();
    renderRoute(<MemoryReconstructionPage />,'/memory');
    await user.click(screen.getByRole('button',{name:/A7-03/}));
    await user.click(screen.getByRole('button',{name:/INCONNUE/}));
    await user.click(screen.getByRole('button',{name:/R-9/}));
    await user.click(screen.getByRole('button',{name:/HELIX/}));
    await user.click(screen.getByRole('button',{name:'STABILISER LA MÉMOIRE'}));
    expect(await screen.findByText('SÉQUENCE RESTAURÉE')).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {solvedPuzzles?:string[];completedObjectives?:string[]}; expect(stored.solvedPuzzles).toContain('memory-0417'); expect(stored.completedObjectives).toContain('reconstruct-memory-0417'); });
  });

  it('refuse une séquence incohérente sans bloquer le joueur', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-two',unlockedSecrets:['memory-reconstructor-0417']}));
    const user=userEvent.setup();
    renderRoute(<MemoryReconstructionPage />,'/memory');
    await user.click(screen.getByRole('button',{name:/R-9/}));
    await user.click(screen.getByRole('button',{name:/A7-03/}));
    await user.click(screen.getByRole('button',{name:/INCONNUE/}));
    await user.click(screen.getByRole('button',{name:/HELIX/}));
    await user.click(screen.getByRole('button',{name:'STABILISER LA MÉMOIRE'}));
    expect(screen.getByRole('alert')).toHaveTextContent('ÉCHEC DE COHÉRENCE');
    expect(screen.getByRole('button',{name:'RÉINITIALISER'})).toBeEnabled();
  });

  it('archive une décision et accorde l’accès OMEGA', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'TACTIQUE',activeChapter:'chapter-two',completedChapters:['chapter-zero'],completedObjectives:chapterTwoCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterTwoPage />,'/chapter-two');
    await user.click(screen.getByRole('radio',{name:/ISOLER LE CORPS/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER ISOLER LE CORPS/}));
    expect(await screen.findByRole('heading',{name:'DÉCISION ARCHIVÉE'})).toBeInTheDocument();
    expect(screen.getByText(/ACCÈS OMEGA/)).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {accessLevel?:string;narrativeChoices?:Record<string,string>}; expect(stored.accessLevel).toBe('OMEGA'); expect(stored.narrativeChoices?.['body-04']).toBe('isolate'); });
  });
});
