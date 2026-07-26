import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../state/ProgressContext';

const bootLines = ['NEXUS SECURE NETWORK','INITIALISATION DU NEURO-LINK','CHARGEMENT DES ARCHIVES OMEGA',"VÉRIFICATION DE L’IDENTITÉ",'SIGNATURE BIOMÉTRIQUE ABSENTE','UTILISATEUR NON RECONNU','INTRUSION DÉTECTÉE','TENTATIVE DE LOCALISATION','LOCALISATION IMPOSSIBLE','ACCÈS TEMPORAIRE : OMEGA-7'];

export default function BootPage() {
  const { progress, update } = useProgress();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(progress.introSeen ? bootLines.length : 1);
  const [intercepted, setIntercepted] = useState(false);

  useEffect(() => {
    if (progress.introSeen || progress.reducedEffects) { setVisible(bootLines.length); return; }
    const timer = window.setInterval(() => setVisible((count) => { if (count >= bootLines.length) { window.clearInterval(timer); return count; } return count + 1; }), 480);
    return () => window.clearInterval(timer);
  }, [progress.introSeen, progress.reducedEffects]);

  const enter = () => {
    if (!intercepted) { setIntercepted(true); update({ introSeen: true }); window.setTimeout(() => { void navigate('/dashboard'); }, progress.reducedEffects ? 0 : 1500); }
  };
  const skip = () => { update({ introSeen: true }); void navigate('/dashboard'); };

  return (
    <main className="boot-page">
      <a className="skip-link" href="#boot-actions">Aller aux actions</a>
      <div className="boot-grid" aria-hidden="true" />
      <header className="boot-mark"><span>N</span><div>NEXUS<small>DIRECTOIRE // RÉSEAU SÉCURISÉ</small></div></header>
      {!intercepted ? <>
        <div className="boot-log" role="status" aria-live="polite">{bootLines.slice(0, visible).map((line,index) => <p key={line} className={line.includes('INTRUSION') ? 'danger' : ''}><span>{String(index + 1).padStart(2,'0')}</span>{line}<em>{index < visible - 1 ? 'OK' : '...'}</em></p>)}</div>
        <section className={`boot-title ${visible < bootLines.length ? 'is-locked' : ''}`} aria-label="Accès aux archives">
          <p>TERMINAL CLASSIFIÉ DU DIRECTOIRE</p><h1>NEXUS <span>//</span><br />ARCHIVES OMEGA</h1>
          <div id="boot-actions" className="boot-actions"><button className="button-primary" disabled={visible < bootLines.length} onClick={enter}>ACCÉDER AUX ARCHIVES</button><button className="button-ghost" onClick={skip}>PASSER LA SÉQUENCE</button></div>
        </section>
      </> : <section className="intercept"><p>TRANSMISSION INTERCEPTÉE</p><blockquote>« Si tu peux lire ceci, le Directoire sait déjà que tu es là. »<cite>— CRIMSON</cite></blockquote></section>}
      <footer className="boot-footer"><span>CANAL 07 // NON SÉCURISÉ</span><span>SON DÉSACTIVÉ</span></footer>
    </main>
  );
}
