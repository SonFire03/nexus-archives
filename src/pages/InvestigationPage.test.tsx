import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvestigationPage from './InvestigationPage';
import { renderRoute } from '../test/render';
import { chapterCompletionRequirements } from '../data';
import { defaultProgress, STORAGE_KEY } from '../state/progress';

describe('tableau d’enquête', () => {
  it('masque les nœuds non découverts', () => { renderRoute(<InvestigationPage />); expect(screen.queryByRole('button',{name:/A7, opérateur/})).not.toBeInTheDocument(); });
  it('affiche une preuve et la même information en texte', () => { localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,evidenceNodes:['a7']})); renderRoute(<InvestigationPage />); expect(screen.getByRole('button',{name:/A7, opérateur/})).toBeInTheDocument(); expect(screen.getAllByText('Ancre biologique du Projet Continuité.').length).toBeGreaterThan(0); });
  it('affiche une relation débloquée dans les deux représentations', () => { localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,evidenceNodes:['a7','projet-continuite'],evidenceRelations:['a7-ancre-continuite']})); renderRoute(<InvestigationPage />); expect(screen.getAllByText(/utilisé comme ancre/i).length).toBeGreaterThan(0); });
  it('déclenche le contact final et le sauvegarde', async () => { localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,completedObjectives:chapterCompletionRequirements,unlockedSecrets:['message-future-crimson']})); const user=userEvent.setup(); renderRoute(<InvestigationPage />); await user.click(screen.getByRole('button',{name:'ÉTABLIR LA SYNTHÈSE FINALE'})); expect(await screen.findByRole('heading',{name:'CHAPITRE 01 TERMINÉ'})).toBeInTheDocument(); await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {accessLevel?:string;spectralContactCount?:number}; expect(stored.accessLevel).toBe('TACTIQUE'); expect(stored.spectralContactCount).toBe(1); }); });
});
