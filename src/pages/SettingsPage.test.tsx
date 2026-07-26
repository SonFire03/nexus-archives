import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsPage from './SettingsPage';
import { renderRoute } from '../test/render';
import { defaultProgress, STORAGE_KEY } from '../state/progress';

describe('réglages', () => {
  it('réinitialise la progression après confirmation', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...defaultProgress, introSeen:true, unlockedSecrets:['zero-fragment-1'] }));
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const user=userEvent.setup(); renderRoute(<SettingsPage />);
    await user.click(screen.getByRole('button',{name:'RÉINITIALISER LA PROGRESSION'}));
    await waitFor(() => expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify(defaultProgress)));
  });
});
