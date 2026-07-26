import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Terminal } from './Terminal';
import { renderRoute } from '../../test/render';

describe('terminal interactif', () => {
  it('exécute help et annonce la sortie', async () => { const user=userEvent.setup(); renderRoute(<Terminal />); const input=screen.getByLabelText('COMMANDE'); await user.type(input,'help{Enter}'); expect(screen.getByText('COMMANDES DISPONIBLES')).toBeInTheDocument(); });
  it('affiche une erreur sans bloquer la saisie', async () => { const user=userEvent.setup(); renderRoute(<Terminal />); const input=screen.getByLabelText('COMMANDE'); await user.type(input,'inconnue{Enter}'); expect(screen.getByText('COMMANDE INCONNUE : inconnue')).toBeInTheDocument(); expect(input).toHaveFocus(); });
});
