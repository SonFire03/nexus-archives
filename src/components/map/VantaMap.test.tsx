import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { locations } from '../../data';
import { VantaMap } from './VantaMap';

describe('carte VANTA', () => {
  it('expose les cinq secteurs interactifs', () => { render(<VantaMap locations={locations} selectedId="couronne" onSelect={() => undefined} />); expect(screen.getAllByRole('button')).toHaveLength(5); });
  it('active une zone au clavier', async () => { const user=userEvent.setup(); const onSelect=vi.fn(); render(<VantaMap locations={locations} selectedId="couronne" onSelect={onSelect} />); const zero=screen.getByRole('button',{name:/Zone Zéro/}); zero.focus(); await user.keyboard('{Enter}'); expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({id:'zero'})); });
});
