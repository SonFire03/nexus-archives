import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './AppShell';
import { renderRoute } from '../../test/render';

describe('navigation principale', () => {
  it('navigue vers VANTA et ferme le menu', async () => {
    const user = userEvent.setup();
    renderRoute(<Routes><Route element={<AppShell />}><Route path="dashboard" element={<h1>TABLEAU</h1>} /><Route path="vanta" element={<h1>CARTE VANTA</h1>} /></Route></Routes>, '/dashboard');
    await user.click(screen.getByRole('link',{name:/VANTA/}));
    expect(await screen.findByRole('heading',{name:'CARTE VANTA'})).toBeInTheDocument();
  });
});
