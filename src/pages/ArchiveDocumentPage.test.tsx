import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import ArchivesPage from './ArchivesPage';
import ArchiveDocumentPage from './ArchiveDocumentPage';
import { renderRoute } from '../test/render';
import { defaultProgress, STORAGE_KEY } from '../state/progress';

describe('lecteur d’archives', () => {
  it('navigue depuis l’index vers le rapport', async () => { const user=userEvent.setup(); renderRoute(<Routes><Route path="/archives" element={<ArchivesPage />} /><Route path="/archives/:documentId" element={<ArchiveDocumentPage />} /></Routes>,'/archives'); await user.click(screen.getByRole('link',{name:/OUVRIR LE DOCUMENT/})); expect(await screen.findByRole('heading',{name:'RAPPORT D’INCIDENT — NUIT ZÉRO'})).toBeInTheDocument(); });
  it('affiche le rapport Nuit Zéro', () => { renderRoute(<ArchiveDocumentPage />,'/archives/rapport-nuit-zero','/archives/:documentId'); expect(screen.getByRole('heading',{name:'RAPPORT D’INCIDENT — NUIT ZÉRO'})).toBeInTheDocument(); expect(screen.getByRole('heading',{name:'Synthèse officielle'})).toBeInTheDocument(); });
  it('refuse un document verrouillé par URL directe', () => { renderRoute(<ArchiveDocumentPage />,'/archives/restauration-2224','/archives/:documentId'); expect(screen.getByRole('heading',{name:'DOCUMENT VERROUILLÉ'})).toBeInTheDocument(); });
  it('marque la lecture et découvre Z-2219', async () => { renderRoute(<ArchiveDocumentPage />,'/archives/rapport-nuit-zero','/archives/:documentId'); await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {viewedDocuments?:string[];discoveredClues?:string[]}; expect(stored.viewedDocuments).toContain('rapport-nuit-zero'); expect(stored.discoveredClues).toContain('clue-z-2219'); }); });
  it('pagine le document', async () => { const user=userEvent.setup(); renderRoute(<ArchiveDocumentPage />,'/archives/rapport-nuit-zero','/archives/:documentId'); await user.click(screen.getByRole('button',{name:'PAGE SUIVANTE →'})); expect(screen.getByRole('heading',{name:'Chronologie publiée'})).toBeInTheDocument(); expect(screen.getByText('PAGE 02 / 04')).toBeInTheDocument(); });
  it('affiche les deux versions lorsque la restauration est lue', () => { localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,completedObjectives:['read-restoration-log']})); renderRoute(<ArchiveDocumentPage />,'/archives/rapport-nuit-zero','/archives/:documentId'); expect(screen.getByText('VERSION OFFICIELLE')).toBeInTheDocument(); expect(screen.getByText('VERSION CLASSIFIÉE')).toBeInTheDocument(); });
  it('enregistre une contradiction comme preuve', async () => { localStorage.setItem(STORAGE_KEY,JSON.stringify({...defaultProgress,completedObjectives:['read-restoration-log']})); const user=userEvent.setup(); renderRoute(<ArchiveDocumentPage />,'/archives/rapport-nuit-zero','/archives/:documentId'); await user.click(screen.getByRole('button',{name:'ENREGISTRER COMME PREUVE'})); await waitFor(() => { const stored=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {completedObjectives?:string[];evidenceRelations?:string[]}; expect(stored.completedObjectives).toContain('compare-zero-versions'); expect(stored.evidenceRelations).toContain('a7-ancre-continuite'); }); });
});
