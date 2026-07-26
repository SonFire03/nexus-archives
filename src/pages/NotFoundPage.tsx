import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="not-found page"><div className="error-code">404</div><p className="eyebrow">ERREUR DE RÉFÉRENCE // ARCHIVE ABSENTE</p><h1>DOSSIER INTROUVABLE</h1><p>LA RÉFÉRENCE DEMANDÉE A ÉTÉ SUPPRIMÉE<br />OU N’A JAMAIS EXISTÉ</p><Link className="button-primary" to="/dashboard">RETOUR AU TABLEAU DE BORD</Link></div>;
}
