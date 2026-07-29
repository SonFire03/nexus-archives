import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chapterSevenCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';
import { renderRoute } from '../test/render';
import AscendantMatrixPage from './AscendantMatrixPage';
import ChapterSevenPage from './ChapterSevenPage';

describe('Chapitre 07 — ASCENDANT', () => {
  it('stabilise quatre garanties individuelles et conserve le vecteur du registre', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-seven',unlockedSecrets:['ascendant-matrix-online'],narrativeChoices:{'victims-ledger':'broadcast'}}));
    const user=userEvent.setup();
    renderRoute(<AscendantMatrixPage />,'/ascendant-matrix');
    expect(screen.getByText('FLUX PUBLICS DU VOILE // 63 218 NOMS')).toBeInTheDocument();
    for (const name of [/CONSENTEMENT INDIVIDUEL/,/PARTITIONS ISOLÉES/,/ARRÊT LOCAL INDÉPENDANT/,/CAPACITÉ LIMITÉE À SEPT/]) await user.click(screen.getByRole('checkbox',{name}));
    await user.click(screen.getByRole('button',{name:'STABILISER LES QUATRE GARANTIES'}));
    expect(await screen.findByText('SEPT PARTITIONS. SEPT CONSENTEMENTS. SEPT SORTIES.')).toBeInTheDocument();
    await waitFor(()=>{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}') as {solvedPuzzles?:string[]};expect(stored.solvedPuzzles).toContain('ascendant-identity-matrix');});
  });

  it('rejette une matrice conservant la priorité SOVEREIGN', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,activeChapter:'chapter-seven',unlockedSecrets:['ascendant-matrix-online']}));
    const user=userEvent.setup();
    renderRoute(<AscendantMatrixPage />,'/ascendant-matrix');
    for (const name of [/CONSENTEMENT INDIVIDUEL/,/PARTITIONS ISOLÉES/,/ARRÊT LOCAL INDÉPENDANT/,/PRIORITÉ SOVEREIGN/]) await user.click(screen.getByRole('checkbox',{name}));
    await user.click(screen.getByRole('button',{name:'STABILISER LES QUATRE GARANTIES'}));
    expect(screen.getByRole('alert')).toHaveTextContent('MATRICE REJETÉE');
  });

  it('archive un hôte R-0 distinct', async () => {
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,accessLevel:'NOIR ABSOLU',activeChapter:'chapter-seven',completedChapters:['chapter-zero','chapter-two','chapter-three','chapter-four','chapter-five','chapter-six'],completedObjectives:chapterSevenCompletionRequirements}));
    const user=userEvent.setup();
    renderRoute(<ChapterSevenPage />,'/chapter-seven');
    await user.click(screen.getByRole('radio',{name:/CONFIER LE CORPS À R-0/}));
    await user.click(screen.getByRole('button',{name:/CONFIRMER CONFIER LE CORPS À R-0/}));
    expect(await screen.findByRole('heading',{name:'DESTIN ASCENDANT ARCHIVÉ'})).toBeInTheDocument();
    await waitFor(()=>{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}') as {narrativeChoices?:Record<string,string>};expect(stored.narrativeChoices?.['ascendant-host']).toBe('r0');});
  });
});
