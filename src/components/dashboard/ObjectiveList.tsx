import { Link } from 'react-router-dom';
import type { NarrativeObjective } from '../../types';

export function ObjectiveList({ objectives, completedIds, activeId }: { objectives: NarrativeObjective[]; completedIds: string[]; activeId?: string }) {
  const activeIndex = objectives.findIndex((objective) => objective.id === activeId);
  return <ol className="objective-tracker">{objectives.map((objective,index) => { const complete=completedIds.includes(objective.id); const active=objective.id === activeId; const locked=!complete && !active && index > activeIndex; return <li key={objective.id} className={complete ? 'is-complete' : active ? 'is-active' : locked ? 'is-locked' : 'is-available'}><span className="objective-tracker__number">{String(index + 1).padStart(2,'0')}</span><span className="objective-tracker__line" aria-hidden="true"><i /></span><div><strong>{objective.title}</strong><small>{complete ? 'TERMINÉ' : active ? 'EN COURS' : locked ? 'VERROUILLÉ' : 'DISPONIBLE'}</small></div>{active && <Link aria-label={`Ouvrir l’objectif : ${objective.title}`} to={objective.route}>OUVRIR →</Link>}</li>; })}</ol>;
}
