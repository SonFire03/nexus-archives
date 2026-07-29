import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterSixCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import AshProtocolPage from './AshProtocolPage';
import ChapterSixPage from './ChapterSixPage';

describe('Chapitre 06 — Les Noms de Cendre', () => {
  it('reconstitue les quatre ordres et conserve la provenance de l’extraction', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-six',unlockedSecrets:['ash-reconstructor-online'],narrativeChoices:{'omega7-extraction':'crimson'}}));
    const user=userEvent.setup();
    renderRoute(<AshProtocolPage />,'/ash-protocol');
    expect(screen.getByText('CICATRICE MNÉSIQUE R-9 // TRACE HUMAINE')).toBeInTheDocument();
    await user.click(screen.getByRole('button',{name:/ACTIVATION CONTINUITÉ/}));
    await user.click(screen.getByRole('button',{name:/SCELLEMENT DES SORTIES/}));
    await user.click(screen.getByRole('button',{name:/SYNCHRONISATION COLLECTIVE/}));
    await user.click(screen.getByRole('button',{name:/PROTOCOLE CENDRE/}));
    await user.click(screen.getByRole('button',{name:'STABILISER LA SÉQUENCE'}));
    expect(await screen.findByText('LES SORTIES ONT ÉTÉ SCELLÉES AVANT LA SYNCHRONISATION.')).toBeInTheDocument();
    await waitFor(()=>{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}') as {solvedPuzzles?:string[]};expect(stored.solvedPuzzles).toContain('ash-command-sequence');});
  });

  it('rejette une séquence où Cendre précède le scellement', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-six',unlockedSecrets:['ash-reconstructor-online']}));
    const user=userEvent.setup();
    renderRoute(<AshProtocolPage />,'/ash-protocol');
    await user.click(screen.getByRole('button',{name:/PROTOCOLE CENDRE/}));
    await user.click(screen.getByRole('button',{name:/ACTIVATION CONTINUITÉ/}));
    await user.click(screen.getByRole('button',{name:/SCELLEMENT DES SORTIES/}));
    await user.click(screen.getByRole('button',{name:/SYNCHRONISATION COLLECTIVE/}));
    await user.click(screen.getByRole('button',{name:'STABILISER LA SÉQUENCE'}));
    expect(screen.getByRole('alert')).toHaveTextContent('SÉQUENCE REJETÉE');
  });

  it('archive la restitution des noms au Chœur Zéro', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'NOIR ABSOLU',activeChapter:'chapter-six',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five'],completedObjectives:chapterSixCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterSixPage />,'/chapter-six');
    await user.click(screen.getByRole('radio',{name:/RESTITUER LES NOMS AU CHŒUR ZÉRO/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER RESTITUER LES NOMS AU CHŒUR ZÉRO/}));
    expect(await screen.findByRole('heading',{name:'LES NOMS ONT QUITTÉ LE REGISTRE'})).toBeInTheDocument();
    await waitFor(()=>{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}') as {narrativeChoices?:Record<string,string>};expect(stored.narrativeChoices?.['victims-ledger']).toBe('choir');});
  });
});
