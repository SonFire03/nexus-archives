import { Link } from 'react-router-dom';
import type { NarrativeObjective } from '../../types';
import { Icon } from '../common/Icon';

export function PrimaryObjectivePanel({ objective, completed, total, percentage, chapter = '01', completedDescription = 'Le Dossier des Sept Corps est maintenant disponible.', completedRoute = '/archives/dossier-sept-corps' }: { objective?: NarrativeObjective; completed: number; total: number; percentage: number; chapter?: string; completedDescription?: string; completedRoute?: string }) {
  const actionLabel = objective ? 'SUIVRE LA PISTE' : 'OUVRIR LE CHAPITRE SUIVANT';
  return <section className={`primary-objective ${objective ? 'is-active' : 'is-complete'}`} aria-labelledby="primary-objective-title">
    <div className="primary-objective__marker"><Icon name="objective" size={26} /><span>OBJ-{String(Math.min(completed + 1,total)).padStart(2,'0')}</span></div>
    <div className="primary-objective__content"><p className="eyebrow">OBJECTIF PRIORITAIRE // {completed}/{total}</p><h2 id="primary-objective-title">{objective?.title ?? `Chapitre ${chapter} terminé`}</h2><p>{objective?.description ?? completedDescription}</p>{objective?.hint && <small>INDICE DISPONIBLE // {objective.hint}</small>}</div>
    <div className="primary-objective__progress"><div><span>PROGRESSION DU CHAPITRE</span><strong>{percentage}%</strong></div><div className="progress-track" role="progressbar" aria-label={`Progression du Chapitre ${chapter}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><i style={{width:`${percentage}%`}} /></div><Link className="button-primary" aria-label={`${actionLabel} →`} to={objective?.route ?? completedRoute}>{actionLabel}<span aria-hidden="true">→</span></Link></div>
  </section>;
}
