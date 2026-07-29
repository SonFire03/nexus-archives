import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterFiveCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import ChapterFivePage from './ChapterFivePage';
import CounterTracePage from './CounterTracePage';

describe('Chapitre 05 — Traque Omega', () => {
  it('rompt les trois couches avec une route sans victime civile', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-five',unlockedSecrets:['counter-trace-online'],narrativeChoices:{'mirror-00':'fragment'}}));
    const user=userEvent.setup();
    renderRoute(<CounterTracePage />,'/counter-trace');
    expect(screen.getByText('CORRÉLATION DES TROIS ÉCLATS MIRROR-00')).toBeInTheDocument();
    await user.click(screen.getByRole('radio',{name:/RELAIS ANALOGIQUE K-13/}));
    await user.click(screen.getByRole('radio',{name:/IMPULSION MNÉSIQUE R-9/}));
    await user.click(screen.getByRole('radio',{name:/CANAL MORT DU CIMETIÈRE/}));
    await user.click(screen.getByRole('button',{name:'EXÉCUTER LA CONTRE-TRAQUE'}));
    expect(await screen.findByText('HARBINGER CONNAÎT VOTRE SIGNATURE. PLUS VOTRE POSITION.')).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {solvedPuzzles?:string[]}; expect(stored.solvedPuzzles).toContain('harbinger-counter-trace'); });
  });

  it('rejette une route exposant le Voile', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-five',unlockedSecrets:['counter-trace-online']}));
    const user=userEvent.setup();
    renderRoute(<CounterTracePage />,'/counter-trace');
    await user.click(screen.getByRole('radio',{name:/RELAIS ANALOGIQUE K-13/}));
    await user.click(screen.getByRole('radio',{name:/FLUX CIVIL DU VOILE/}));
    await user.click(screen.getByRole('radio',{name:/CANAL MORT DU CIMETIÈRE/}));
    await user.click(screen.getByRole('button',{name:'EXÉCUTER LA CONTRE-TRAQUE'}));
    expect(screen.getByRole('alert')).toHaveTextContent('ROUTE REJETÉE');
  });

  it('archive l’extraction avec les Fantômes Libres', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'NOIR ABSOLU',activeChapter:'chapter-five',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four'],completedObjectives:chapterFiveCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterFivePage />,'/chapter-five');
    await user.click(screen.getByRole('radio',{name:/REJOINDRE LES FANTÔMES LIBRES/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER REJOINDRE LES FANTÔMES LIBRES/}));
    expect(await screen.findByRole('heading',{name:'EXTRACTION ARCHIVÉE'})).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {narrativeChoices?:Record<string,string>}; expect(stored.narrativeChoices?.['omega7-extraction']).toBe('ghosts'); });
  });
});
