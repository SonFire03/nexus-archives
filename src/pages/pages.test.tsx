import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from './DashboardPage';
import OperatorDetailPage from './OperatorDetailPage';
import ArmorsPage from './ArmorsPage';
import NotFoundPage from './NotFoundPage';
import { renderRoute } from '../test/render';

describe('pages principales', () => {
  it('charge le tableau de bord', () => { renderRoute(<DashboardPage />); expect(screen.getByRole('heading',{name:/SITUATION/})).toBeInTheDocument(); expect(screen.getByText('STATUT DE VANTA')).toBeInTheDocument(); });
  it('affiche le dossier A7', () => { renderRoute(<OperatorDetailPage />, '/operators/a7', '/operators/:operatorId'); expect(screen.getByRole('heading',{name:/A7/})).toBeInTheDocument(); expect(screen.getByText('99.7/100')).toBeInTheDocument(); });
  it('affiche le dossier Crimson', () => { renderRoute(<OperatorDetailPage />, '/operators/crimson', '/operators/:operatorId'); expect(screen.getByRole('heading',{name:/Crimson/})).toBeInTheDocument(); expect(screen.getAllByText(/FIL ROUGE/).length).toBeGreaterThan(0); });
  it('affiche les armures et filtre les modèles interdits', async () => { const user=userEvent.setup(); renderRoute(<ArmorsPage />); expect(screen.getByText('OMBRE')).toBeInTheDocument(); await user.selectOptions(screen.getByLabelText('STATUT'),'interdit'); expect(screen.getByText('WRAITH')).toBeInTheDocument(); expect(screen.queryByText('BASTION')).not.toBeInTheDocument(); });
  it('affiche la page 404 immersive', () => { renderRoute(<NotFoundPage />); expect(screen.getByRole('heading',{name:'DOSSIER INTROUVABLE'})).toBeInTheDocument(); });
});
