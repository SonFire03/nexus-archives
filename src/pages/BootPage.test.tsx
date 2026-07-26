import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import BootPage from './BootPage';
import { renderRoute } from '../test/render';
import { STORAGE_KEY } from '../state/progress';

describe('écran de démarrage', () => {
  it('affiche le réseau sécurisé et le titre', () => { renderRoute(<BootPage />); expect(screen.getByText('NEXUS SECURE NETWORK')).toBeInTheDocument(); expect(screen.getByRole('heading',{name:/NEXUS/})).toBeInTheDocument(); });
  it('permet de passer immédiatement au tableau de bord', async () => {
    const user = userEvent.setup();
    renderRoute(<Routes><Route path="/" element={<BootPage />} /><Route path="/dashboard" element={<h1>Tableau chargé</h1>} /></Routes>);
    await user.click(screen.getByRole('button',{name:'PASSER LA SÉQUENCE'}));
    expect(await screen.findByRole('heading',{name:'Tableau chargé'})).toBeInTheDocument();
  });
  it('mémorise introSeen', async () => {
    const user = userEvent.setup(); renderRoute(<BootPage />); await user.click(screen.getByRole('button',{name:'PASSER LA SÉQUENCE'}));
    await waitFor(() => { const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); expect(value).toEqual(expect.objectContaining({ introSeen: true })); });
  });
});
