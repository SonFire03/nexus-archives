import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterThreeCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import ChapterThreePage from './ChapterThreePage';
import SpectralAnalysisPage from './SpectralAnalysisPage';

describe('Chapitre 03 — L’Enfant du Cimetière', () => {
  it('authentifie les trois fragments humains et sauvegarde la preuve', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-three',unlockedSecrets:['spectral-analyzer-online']}));
    const user=userEvent.setup();
    renderRoute(<SpectralAnalysisPage />,'/spectral-analysis');
    await user.click(screen.getByRole('button',{name:/Il neigeait/}));
    await user.click(screen.getByRole('button',{name:/A7… ce n’était pas/}));
    await user.click(screen.getByRole('button',{name:/N’ouvre pas la porte/}));
    await user.click(screen.getByRole('button',{name:'AUTHENTIFIER LES TROIS FRAGMENTS'}));
    expect(await screen.findByText('LES IMPERFECTIONS ONT SERVI DE SIGNATURE.')).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {solvedPuzzles?:string[];narrativeFlags?:string[]}; expect(stored.solvedPuzzles).toContain('voice-authentication'); expect(stored.narrativeFlags).toContain('child-voice-authenticated'); });
  });

  it('signale une imitation sans bloquer une nouvelle tentative', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-three',unlockedSecrets:['spectral-analyzer-online']}));
    const user=userEvent.setup();
    renderRoute(<SpectralAnalysisPage />,'/spectral-analysis');
    await user.click(screen.getByRole('button',{name:/Il neigeait/}));
    await user.click(screen.getByRole('button',{name:/Aucune conscience/}));
    await user.click(screen.getByRole('button',{name:/N’ouvre pas la porte/}));
    await user.click(screen.getByRole('button',{name:'AUTHENTIFIER LES TROIS FRAGMENTS'}));
    expect(screen.getByRole('alert')).toHaveTextContent('SIGNATURE INCOHÉRENTE');
    expect(screen.getByRole('button',{name:/Aucune conscience/})).toBeEnabled();
  });

  it('archive la décision finale et accorde NOIR ABSOLU', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'OMEGA',activeChapter:'chapter-three',completedChapters:['chapter-zero','chapter-two'],completedObjectives:chapterThreeCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterThreePage />,'/chapter-three');
    await user.click(screen.getByRole('radio',{name:/ISOLER L’ENFANT/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER ISOLER L’ENFANT/}));
    expect(await screen.findByRole('heading',{name:'STATUT DE LA PORTE ARCHIVÉ'})).toBeInTheDocument();
    expect(screen.getByText(/NOIR ABSOLU/)).toBeInTheDocument();
    await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {accessLevel?:string;narrativeChoices?:Record<string,string>}; expect(stored.accessLevel).toBe('NOIR ABSOLU'); expect(stored.narrativeChoices?.['continuity-gate']).toBe('isolate'); });
  });
});
