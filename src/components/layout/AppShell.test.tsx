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

  it('réduit la sidebar et mémorise la préférence', async () => {
    const user = userEvent.setup();
    const view = renderRoute(<Routes><Route element={<AppShell />}><Route path="dashboard" element={<h1>TABLEAU</h1>} /></Route></Routes>, '/dashboard');
    const toggle = screen.getByRole('button',{name:'Réduire la navigation'});
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed','true');
    expect(localStorage.getItem('nexus-archives:sidebar-collapsed')).toBe('true');
    view.unmount();
    renderRoute(<Routes><Route element={<AppShell />}><Route path="dashboard" element={<h1>TABLEAU</h1>} /></Route></Routes>, '/dashboard');
    expect(screen.getByRole('button',{name:'Déployer la navigation'})).toHaveAttribute('aria-pressed','true');
  });

  it('ouvre et ferme le menu mobile puis rend le focus au bouton', async () => {
    const user = userEvent.setup();
    renderRoute(<Routes><Route element={<AppShell />}><Route path="dashboard" element={<h1>TABLEAU</h1>} /></Route></Routes>, '/dashboard');
    const menu = screen.getByRole('button',{name:/MENU/});
    await user.click(menu);
    expect(menu).toHaveAttribute('aria-expanded','true');
    await user.click(screen.getByRole('button',{name:'Fermer la navigation'}));
    expect(menu).toHaveAttribute('aria-expanded','false');
    expect(menu).toHaveFocus();
  });
});
