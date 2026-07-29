import { chapterZeroObjectives } from '../data/chapterZero';
import { chapterTwoObjectives } from '../data/chapterTwo';
import { chapterThreeObjectives } from '../data/chapterThree';
import { chapterFourObjectives } from '../data/chapterFour';
import { chapterFiveObjectives } from '../data/chapterFive';
import type { TerminalContext, TerminalResult } from '../types';

export const terminalCommands = [
  'help','status','whoami','access','objectives','evidence','investigation','clear','reboot',
  'map','locations','operators','armors','factions','timeline','archives','open a7','open crimson',
  'open report zero','open restoration','decrypt z-2219','compare zero','echo a7','memory crimson',
  'scan nx-s','trace voss','protocol shadow','protocol ash','secrets',
  'scan signature a7-03','open seven bodies','open helix register','reconstruct memory',
  'verify memory crimson','trace body-04','wake subject','isolate subject','erase subject',
  'scan child-echo','open child register','analyze voice','verify nx-s','open continuity gate',
  'contact mother-echo','open gate','seal gate','isolate child',
  'trace mirror-00','open mirror ledger','reconstruct truth','verify vale signature',
  'open truth directive','map mirror network','broadcast truth','preserve truth','fragment truth',
  'decrypt hunt-314','open harbinger log','counter trace','authenticate crimson',
  'open extraction plan','sever harbinger','follow crimson','join free ghosts','merge nx-s',
];

export const emptyTerminalContext: TerminalContext = {
  accessLevel:'CIVIL', viewedDocuments:[], unlockedSecrets:[], completedObjectives:[], activeChapter:'chapter-zero',
  discoveredClues:[], evidenceNodes:[], evidenceRelations:[], spectralContactCount:0,
  solvedPuzzles:[], narrativeChoices:{},
  narrativeFlags:[],
};

export function normalizeCommand(raw: string): string {
  return raw.trim().toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}

const directRoutes: Record<string, string> = {
  map:'/vanta', locations:'/vanta', operators:'/operators', armors:'/armors', factions:'/factions', timeline:'/timeline', archives:'/archives', investigation:'/investigation',
  'open a7':'/operators/a7', 'open crimson':'/operators/crimson', 'open vanta':'/vanta', 'open zero':'/vanta?zone=zero',
  'open nexus':'/factions/directoire', 'open armor ombre':'/armors/ombre', 'open armor crimson':'/armors/crimson', 'open faction directoire':'/factions/directoire',
  'open rapport nuit zero':'/archives/rapport-nuit-zero', 'open rapport nuit zero officiel':'/archives/rapport-nuit-zero',
  'open report zero':'/archives/rapport-nuit-zero', 'open rapport zero':'/archives/rapport-nuit-zero',
  'open seven bodies':'/archives/dossier-sept-corps', 'open dossier sept corps':'/archives/dossier-sept-corps',
  'reconstruct memory':'/memory', 'reconstruire memoire':'/memory',
  'analyze voice':'/spectral-analysis', 'analyser voix':'/spectral-analysis',
  'reconstruct truth':'/truth-reconstruction', 'reconstruire verite':'/truth-reconstruction',
  'counter trace':'/counter-trace', 'contre traque':'/counter-trace',
};

const isDecryptZero = (command: string) => ['decrypt z 2219','decrypt z2219','decrypt zero','decrypt nuit zero'].includes(command);

export function executeCommand(raw: string, context: TerminalContext = emptyTerminalContext): TerminalResult {
  const command = normalizeCommand(raw);
  if (!command) return { output: [] };
  if (command === 'clear') return { output: [], clear: true };
  if (command === 'help') return { output: ['COMMANDES DISPONIBLES', terminalCommands.join(' · ')] };
  if (command === 'status') { const chapter=context.activeChapter==='chapter-zero'?'01 // NUIT ZÉRO':context.activeChapter==='chapter-two'?'02 // LES SEPT CORPS':context.activeChapter==='chapter-three'?'03 // L’ENFANT DU CIMETIÈRE':context.activeChapter==='chapter-four'?'04 // VÉRITÉ ORIGINALE':'05 // TRAQUE OMEGA'; return { output: [`CHAPITRE : ${chapter}`,`ACCÈS : ${context.accessLevel}`,`PREUVES : ${context.evidenceNodes.length} NŒUDS // ${context.evidenceRelations.length} RELATIONS`,context.spectralContactCount ? 'ACTIVITÉ SPECTRALE : TERMINAL COMPROMIS' : 'ACTIVITÉ SPECTRALE : INSTABLE'] }; }
  if (command === 'whoami') return { output: ['IDENTITÉ : INCONNUE', `AUTORISATION : ${context.accessLevel}`, 'LOCALISATION : IMPOSSIBLE'] };
  if (command === 'access') return { output: [`NIVEAU ACTUEL : ${context.accessLevel}`, context.accessLevel === 'CIVIL' ? 'CONDITION TACTIQUE : TERMINER L’ENQUÊTE NUIT ZÉRO' : context.accessLevel === 'TACTIQUE' ? 'CONDITION OMEGA : STATUER SUR LE CORPS A7-04' : context.accessLevel === 'OMEGA' ? 'CONDITION NOIR ABSOLU : STATUER SUR LA PORTE DE CONTINUITÉ' : 'ACCÈS NOIR ABSOLU CONFIRMÉ'] };
  if (command === 'objectives') {
    const objectives = context.activeChapter === 'chapter-five' ? chapterFiveObjectives : context.activeChapter === 'chapter-four' ? chapterFourObjectives : context.activeChapter === 'chapter-three' ? chapterThreeObjectives : context.activeChapter === 'chapter-two' ? chapterTwoObjectives : chapterZeroObjectives;
    const next = objectives.find((objective) => !context.completedObjectives.includes(objective.id));
    return { output: next ? [`OBJECTIF PRIORITAIRE : ${next.title.toUpperCase()}`, next.description.toUpperCase(), next.hint?.toUpperCase() ?? 'AUCUN INDICE DISPONIBLE'] : ['TOUS LES OBJECTIFS DU CHAPITRE SONT TERMINÉS.'] };
  }
  if (command === 'evidence') return { output: [`NŒUDS DÉCOUVERTS : ${context.evidenceNodes.length}`,`RELATIONS ÉTABLIES : ${context.evidenceRelations.length}`,'OUVERTURE DU TABLEAU D’ENQUÊTE…'], navigateTo:'/investigation' };
  if (command === 'reboot') return { output: ['RÉINITIALISATION VISUELLE AUTORISÉE.','LA MÉMOIRE LOCALE EST CONSERVÉE.'], navigateTo:'/', reboot:true };
  if (directRoutes[command]) return { output:[`OUVERTURE : ${command.toUpperCase()}`], navigateTo:directRoutes[command] };
  if (['open restoration','open restauration','open restauration 22 24'].includes(command)) {
    return context.unlockedSecrets.includes('document-restauration-2224') ? { output:['OUVERTURE : JOURNAL DE RESTAURATION 22:24'],navigateTo:'/archives/restauration-2224' } : { output:['ACCÈS REFUSÉ','DOCUMENT NON INDEXÉ. DÉCHIFFREMENT REQUIS.'] };
  }
  if (['open helix register','open registre helix','open registre k13'].includes(command)) {
    return context.unlockedSecrets.includes('document-registre-helix-k13') ? {output:['OUVERTURE : REGISTRE HELIX — ANNEXE K-13'],navigateTo:'/archives/registre-helix-k13'} : {output:['ACCÈS REFUSÉ','LOCALISEZ D’ABORD LA SIGNATURE A7-03.']};
  }
  if (['scan signature a7 03','scan a7 03','scan signature a703'].includes(command)) {
    if (!context.discoveredClues.includes('clue-signature-a7-03')) return {output:['SIGNATURE INCONNUE','CONSULTEZ LE DOSSIER DES SEPT CORPS.']};
    if (context.completedObjectives.includes('scan-signature-a7-03')) return {output:['SIGNATURE A7-03 DÉJÀ LOCALISÉE','ORIGINE : ANNEXE HELIX // STATION K-13']};
    return {
      output:['BALAYAGE DE LA SIGNATURE A7-03…','RÉPONSE NEURONALE : 0,7 %','ORIGINE : ANNEXE HELIX // STATION K-13','REGISTRE HLX-K13-04 RÉCUPÉRÉ'],
      unlocks:['document-registre-helix-k13'],completedObjectives:['scan-signature-a7-03'],evidenceNodes:['laboratoire-k13'],evidenceRelations:['signature-03-emet-k13'],notification:'signature-a7-03-located',
    };
  }
  if (['scan child echo','scan child','scan enfant echo'].includes(command)) {
    if (!context.discoveredClues.includes('clue-child-echo')) return {output:['ÉCHO INCONNU','CONSULTEZ LE PROGRAMME R — FIL ROUGE.']};
    if (context.completedObjectives.includes('scan-child-echo')) return {output:['ÉCHO R-0 DÉJÀ LOCALISÉ','SOURCES : A7 // NŒUD MÉMORIEL 29']};
    return {output:['BALAYAGE DE L’ÉCHO R-0…','SOURCE 01 : NOYAU A7 // 14 %','SOURCE 02 : NŒUD MÉMORIEL 29 // 61 %','REGISTRE ECHO-R0-29 RÉCUPÉRÉ'],unlocks:['document-registre-enfant'],completedObjectives:['scan-child-echo'],evidenceNodes:['enfant-echo','noeud-memorial-29'],notification:'child-echo-located'};
  }
  if (['open child register','open registre enfant','open child echo'].includes(command)) return context.unlockedSecrets.includes('document-registre-enfant')?{output:['OUVERTURE : REGISTRE R-0'],navigateTo:'/archives/registre-enfant-cimetiere'}:{output:['ACCÈS REFUSÉ','LOCALISATION DE R-0 REQUISE.']};
  if (['decrypt hunt 314','decrypt hunt314','decrypt traque omega'].includes(command)) {
    if (!context.discoveredClues.includes('clue-hunt-314')) return {output:['CODE HUNT-314 INCONNU','CONSULTEZ L’ORDRE DE CAPTURE OMEGA-7.']};
    if (context.completedObjectives.includes('decrypt-hunt-314')) return {output:['HUNT-314 DÉJÀ DÉCHIFFRÉ','JOURNAL HARBINGER-TRACE-03 DISPONIBLE.']};
    return {output:['HUNT-314 DÉCHIFFRÉ','COUCHE 01 : SIGNATURE ARCHIVE','COUCHE 02 : DÉRIVE TEMPORELLE','COUCHE 03 : NŒUD DE SORTIE','CONVERGENCE : 04:12','JOURNAL HARBINGER-TRACE-03 RÉCUPÉRÉ'],unlocks:['document-harbinger-trace'],completedObjectives:['decrypt-hunt-314'],evidenceNodes:['harbinger-network'],notification:'hunt314-decrypted'};
  }
  if (['open harbinger log','open journal harbinger','open triangulation log'].includes(command)) return context.unlockedSecrets.includes('document-harbinger-trace')?{output:['OUVERTURE : JOURNAL DE TRIANGULATION HARBINGER'],navigateTo:'/archives/journal-triangulation-harbringer'}:{output:['ACCÈS REFUSÉ','DÉCHIFFREMENT HUNT-314 REQUIS.']};
  if (['authenticate crimson','auth crimson','verify crimson channel'].includes(command)) {
    if (!context.solvedPuzzles.includes('harbinger-counter-trace')) return {output:['CANAL NON AUTHENTIFIABLE','TRIANGULATION HARBINGER ENCORE ACTIVE.']};
    if (context.completedObjectives.includes('authenticate-crimson-channel')) return {output:['CANAL CRIMSON DÉJÀ AUTHENTIFIÉ','PLAN R9-EXIT-11 DISPONIBLE.']};
    return {output:['AUTHENTIFICATION DU CANAL R-9…','CICATRICE MNÉSIQUE : 17 %','PHRASE DE RESTAURATION : CONFIRMÉE','SOURCE HUMAINE : CRIMSON','PLAN R9-EXIT-11 RÉCUPÉRÉ'],unlocks:['document-extraction-omega7'],completedObjectives:['authenticate-crimson-channel'],evidenceNodes:['crimson-extraction'],transmissionId:'crimson-extraction',notification:'crimson-channel-authenticated'};
  }
  if (['open extraction plan','open plan extraction','open r9 exit 11'].includes(command)) return context.unlockedSecrets.includes('document-extraction-omega7')?{output:['OUVERTURE : PLAN D’EXTRACTION OMEGA-7'],navigateTo:'/archives/plan-extraction-omega-7'}:{output:['ACCÈS REFUSÉ','CANAL CRIMSON NON AUTHENTIFIÉ.']};
  if (['sever harbinger','cut harbinger','couper harbinger'].includes(command)) {
    if (!context.completedObjectives.includes('read-extraction-plan')) return {output:['RUPTURE REFUSÉE','PLAN D’EXTRACTION NON CONSULTÉ.']};
    if (context.completedObjectives.includes('sever-harbinger-network')) return {output:['HARBINGER DÉJÀ COUPÉ','FENÊTRE D’EXTRACTION : 00:00:11']};
    return {output:['INJECTION DE LA CONTRE-ROUTE…','NŒUD COURONNE : AVEUGLE','NŒUD VOILE : DÉCALÉ','NŒUD CIMETIÈRE : DÉCLARÉ MORT','HARBINGER : HORS LIGNE','FENÊTRE D’EXTRACTION : 00:00:11'],completedObjectives:['sever-harbinger-network'],narrativeFlags:['harbinger-severed'],notification:'harbinger-severed'};
  }
  const extractionDecisions:Record<string,string>={'follow crimson':'crimson','suivre crimson':'crimson','join free ghosts':'ghosts','rejoindre fantomes libres':'ghosts','merge nx s':'spectral','disappear nx s':'spectral','disparaitre nx s':'spectral'};
  if (extractionDecisions[command]) return context.completedObjectives.includes('sever-harbinger-network')?{output:['ROUTE D’EXTRACTION CHARGÉE','CONFIRMATION LOCALE REQUISE.'],navigateTo:`/chapter-five?decision=${extractionDecisions[command]}`}:{output:['EXTRACTION INDISPONIBLE','HARBINGER ENCORE ACTIF.']};
  if (['trace mirror 00','trace mirror00','trace original truth'].includes(command)) {
    if (!context.discoveredClues.includes('clue-mirror-00')) return {output:['CHECKSUM INCONNU','CONSULTEZ VÉRITÉ ORIGINALE.']};
    if (context.completedObjectives.includes('trace-mirror-00')) return {output:['CHECKSUM MIRROR-00 DÉJÀ TRACÉ','REGISTRE MIRROR-LEDGER-17 DISPONIBLE.']};
    return {output:['TRACE DU CHECKSUM MIRROR-00…','17 RÉVISIONS DÉTECTÉES','PREMIÈRE SIGNATURE : J-1 // 03:42','REGISTRE MIRROR-LEDGER-17 RÉCUPÉRÉ'],unlocks:['document-registre-miroir'],completedObjectives:['trace-mirror-00'],evidenceNodes:['registre-miroir'],notification:'mirror-ledger-recovered'};
  }
  if (['open mirror ledger','open registre miroir'].includes(command)) return context.unlockedSecrets.includes('document-registre-miroir')?{output:['OUVERTURE : REGISTRE DES RÉVISIONS MIRROR'],navigateTo:'/archives/registre-revisions-miroir'}:{output:['ACCÈS REFUSÉ','CHECKSUM MIRROR-00 NON TRACÉ.']};
  if (['verify vale signature','verify orin vale','authentifier vale'].includes(command)) {
    if (!context.solvedPuzzles.includes('mirror-truth-invariants')) return {output:['SIGNATURE NON VÉRIFIABLE','FAITS INVARIANTS NON RECONSTRUITS.']};
    if (context.completedObjectives.includes('verify-vale-signature')) return {output:['SIGNATURE ORIN VALE DÉJÀ CONFIRMÉE','DIRECTIVE VÉRITÉ SUPPORTABLE DISPONIBLE.']};
    return {output:['AUTHENTIFICATION CRYPTOGRAPHIQUE…','SIGNATAIRE : ORIN_VALE','HORODATAGE : J-1 // 03:42','ANTÉRIORITÉ : 18 H 25 MIN','DIRECTIVE MIRROR-DOCTRINE-01 RÉCUPÉRÉE'],unlocks:['document-directive-verite'],completedObjectives:['verify-vale-signature'],evidenceNodes:['orin-vale'],evidenceRelations:['preuve-authentifie-vale','vale-signe-mirror-00'],transmissionId:'orin-vale-01',notification:'vale-signature-confirmed'};
  }
  if (['open truth directive','open directive verite','open directive supportable'].includes(command)) return context.unlockedSecrets.includes('document-directive-verite')?{output:['OUVERTURE : DIRECTIVE VÉRITÉ SUPPORTABLE'],navigateTo:'/archives/directive-verite-supportable'}:{output:['ACCÈS REFUSÉ','SIGNATURE ORIN VALE REQUISE.']};
  if (['map mirror network','map reseau miroir','trace mirror network'].includes(command)) {
    if (!context.completedObjectives.includes('read-truth-directive')) return {output:['CARTOGRAPHIE REFUSÉE','DIRECTIVE VÉRITÉ SUPPORTABLE NON CONSULTÉE.']};
    if (context.completedObjectives.includes('map-mirror-network')) return {output:['RÉSEAU DU MIROIR DÉJÀ CARTOGRAPHIÉ','11 RELAIS // AUTORITÉ LOCALE DISPONIBLE.']};
    return {output:['CARTOGRAPHIE DU RÉSEAU DU MIROIR…','11 RELAIS ACTIFS','REMPLACEMENT GLOBAL : 03:42','ORIN_VALE : CONNECTÉ','TROIS DIRECTIVES DE DIFFUSION DISPONIBLES'],completedObjectives:['map-mirror-network'],evidenceNodes:['reseau-miroir'],evidenceRelations:['doctrine-justifie-reseau','vale-dirige-reseau'],narrativeFlags:['mirror-network-mapped'],notification:'mirror-network-mapped'};
  }
  const truthDecisions:Record<string,string>={'broadcast truth':'broadcast','diffuser verite':'broadcast','preserve truth':'preserve','preserver archive':'preserve','fragment truth':'fragment','fragmenter verite':'fragment'};
  if (truthDecisions[command]) return context.completedObjectives.includes('map-mirror-network')?{output:['DIRECTIVE MIRROR-00 CHARGÉE','CONFIRMATION LOCALE REQUISE.'],navigateTo:`/chapter-four?decision=${truthDecisions[command]}`}:{output:['DIRECTIVE INDISPONIBLE','RÉSEAU DU MIROIR NON CARTOGRAPHIÉ.']};
  if (isDecryptZero(command)) {
    if (!context.discoveredClues.includes('clue-z-2219') && !context.unlockedSecrets.includes('clue-z-2219')) return { output:['CODE INCONNU','AUCUNE RÉFÉRENCE Z-2219 DANS LES DOCUMENTS CONSULTÉS'] };
    if (context.completedObjectives.includes('decrypt-z-2219')) return { output:['FRAGMENT Z-2219 DÉJÀ DÉCHIFFRÉ','JOURNAL DE RESTAURATION 22:24 DISPONIBLE'] };
    return {
      output:['FRAGMENT Z-2219 DÉCHIFFRÉ','22:19:04 — ARRÊT DE L’ANCRE A7','22:19:07 — ACTIVITÉ NEURONALE NULLE','22:24:18 — INTERFACE R-9 CONNECTÉE','22:30:49 — RESTAURATION EXTERNE DÉTECTÉE','22:31:02 — ACTIVITÉ NEURONALE RÉTABLIE'],
      unlocks:['zero-fragment-1','document-restauration-2224'], completedObjectives:['decrypt-z-2219'],
      evidenceNodes:['a7','crimson','restauration-2224'], notification:'fragment-decrypted',
    };
  }
  if (command === 'compare zero') return context.completedObjectives.includes('read-restoration-log') ? { output:['COMPARATEUR DISPONIBLE','OUVERTURE DU RAPPORT NUIT ZÉRO…'],navigateTo:'/archives/rapport-nuit-zero#comparison' } : { output:['COMPARAISON INCOMPLÈTE','JOURNAL DE RESTAURATION 22:24 REQUIS'] };
  if (command === 'echo a7') {
    if (!context.completedObjectives.includes('read-restoration-log')) return { output:['ACCÈS REFUSÉ','SIGNATURE UNIQUE PRÉSUMÉE'] };
    if (context.completedObjectives.includes('detect-seven-signatures')) return { output:['ÉCHO DÉJÀ INDEXÉ','SEPT SIGNATURES ACTIVES // INTÉGRITÉ VARIABLE'] };
    return { output:['ÉCHO INCOMPLET','SEPT SIGNATURES RÉPONDENT','UNE SEULE PRÉTEND ÊTRE ORIGINALE','AUCUNE NE POSSÈDE L’INTÉGRALITÉ DES SOUVENIRS'],unlocks:['sept-corps'],completedObjectives:['detect-seven-signatures'],evidenceNodes:['sept-corps'],evidenceRelations:['sept-corps-identite-a7'],notification:'seven-signatures-detected' };
  }
  if (command === 'memory crimson') return context.completedObjectives.includes('read-restoration-log') ? { output:['FIL MNÉSIQUE CONNECTÉ','SAUVEGARDE A7-04 SÉLECTIONNÉE MANUELLEMENT','FRAGMENT : « JE SUIS TOI. »'],unlocks:['restauration-2224'] } : { output:['FIL MNÉSIQUE : HORS LIGNE','SOURCE MÉDICALE REQUISE'] };
  if (command === 'verify memory crimson') {
    if (!context.solvedPuzzles.includes('memory-0417')) return {output:['VÉRIFICATION IMPOSSIBLE','SÉQUENCE 04:17 NON RECONSTRUITE.']};
    if (context.completedObjectives.includes('verify-crimson-memory')) return {output:['SIGNATURE R-9 DÉJÀ CONFIRMÉE','MÉMOIRE SOURCE A7-04 DISPONIBLE.']};
    return {output:['COMPARAISON AU FIL MNÉSIQUE…','SIGNATURE R-9 : CONFIRMÉE','ENREGISTREMENT ANTÉRIEUR À LA NUIT ZÉRO','DIRECTIVE : PRÉSERVER LE CORPS 04'],unlocks:['document-memoire-source-a7-04','message-crimson-04'],completedObjectives:['verify-crimson-memory'],evidenceNodes:['sauvegarde-a7-04'],notification:'crimson-memory-verified'};
  }
  if (['trace body 04','trace body04','trace corps 04','trace corps04'].includes(command)) {
    if (!context.completedObjectives.includes('compare-a7-identities')) return {output:['TRACE REFUSÉE','COMPARAISON IDENTITAIRE A7 / A7-04 REQUISE.']};
    if (context.completedObjectives.includes('locate-body-04')) return {output:['CORPS 04 DÉJÀ LOCALISÉ','COORDONNÉES : K-13 // SOUS-NIVEAU 09']};
    return {output:['TRACE BIOLOGIQUE EN COURS…','CORPS 04 : VIABLE','COORDONNÉES : K-13 // SOUS-NIVEAU 09','TROIS PROTOCOLES DE DISPOSITION DISPONIBLES'],unlocks:['body-04-located'],completedObjectives:['locate-body-04'],evidenceNodes:['corps-a7-04'],evidenceRelations:['helix-maintient-corps-04'],notification:'body-04-located'};
  }
  if (command === 'verify nx s' || command === 'verify nxs') {
    if (!context.solvedPuzzles.includes('voice-authentication')) return {output:['VÉRIFICATION IMPOSSIBLE','VOIX R-0 NON AUTHENTIFIÉE.']};
    if (context.completedObjectives.includes('verify-spectral-source')) return {output:['IMITATION NX-S DÉJÀ CONFIRMÉE','DOSSIER PORTE DE CONTINUITÉ DISPONIBLE.'],altered:true};
    return {output:['COMPARAISON SPECTRALE…','3 FRAGMENTS : SOURCE HUMAINE R-0','2 FRAGMENTS : IMITATION NX-S','DEMANDE D’OUVERTURE : SOURCE SPECTRALE'],unlocks:['document-porte-continuite'],completedObjectives:['verify-spectral-source'],evidenceNodes:['voix-spectrale','porte-continuite'],evidenceRelations:['nxs-imite-enfant','voix-composee-par-nxs'],narrativeFlags:['nxs-child-imitation-confirmed'],notification:'nxs-imitation-confirmed',altered:true};
  }
  if (['open continuity gate','open porte continuite','open gate dossier'].includes(command)) return context.unlockedSecrets.includes('document-porte-continuite')?{output:['OUVERTURE : PORTE DE CONTINUITÉ'],navigateTo:'/archives/porte-continuite'}:{output:['ACCÈS REFUSÉ','AUTHENTIFICATION SPECTRALE REQUISE.']};
  if (['contact mother echo','contact mere echo'].includes(command)) {
    if (!context.completedObjectives.includes('read-continuity-gate')) return {output:['CONTACT REFUSÉ','DOSSIER DE LA PORTE NON CONSULTÉ.']};
    if (context.completedObjectives.includes('contact-mother-echo')) return {output:['CANAL MÈRE ÉCHO DÉJÀ ARCHIVÉ','LA PORTE ATTEND VOTRE DÉCISION.']};
    return {output:['OUVERTURE DU CANAL CHŒUR ZÉRO…','MÈRE ÉCHO : « NOUS AVONS OUBLIÉ QUE SA VOIX LUI APPARTENAIT. »','TÉMOIGNAGE ARCHIVÉ // DÉCISION AUTORISÉE'],unlocks:['document-temoignage-mere-echo'],completedObjectives:['contact-mother-echo'],evidenceNodes:['mere-echo'],evidenceRelations:['mere-echo-garde-porte'],transmissionId:'mother-echo-gate',notification:'mother-echo-contacted'};
  }
  const gateDecisions:Record<string,string>={'open gate':'open','ouvrir porte':'open','seal gate':'seal','sceller porte':'seal','isolate child':'isolate','isoler enfant':'isolate'};
  if (gateDecisions[command]) return context.completedObjectives.includes('contact-mother-echo')?{output:['PROTOCOLE DE LA PORTE CHARGÉ','CONFIRMATION NOIR ABSOLU REQUISE.'],navigateTo:`/chapter-three?decision=${gateDecisions[command]}`}:{output:['PROTOCOLE INDISPONIBLE','TÉMOIGNAGE DE MÈRE ÉCHO REQUIS.']};
  const decisions: Record<string,string> = {'wake subject':'wake','reveiller sujet':'wake','isolate subject':'isolate','isoler sujet':'isolate','erase subject':'erase','effacer sujet':'erase'};
  if (decisions[command]) return context.completedObjectives.includes('locate-body-04') ? {output:['PROTOCOLE CHARGÉ','CONFIRMATION MANUELLE REQUISE.'],navigateTo:`/chapter-two?decision=${decisions[command]}`} : {output:['PROTOCOLE INDISPONIBLE','LOCALISATION DU CORPS 04 REQUISE.']};
  if (command === 'scan nx s' || command === 'scan nxs') {
    if (context.spectralContactCount > 0) return { output:['CIBLE PRÉSENTE','LOCALISATION : TERMINAL LOCAL','UTILISATEUR OBSERVÉ DEPUIS 00:00:00'],altered:true };
    return { output:['SIGNAL INSTABLE','ORIGINE : CIMETIÈRE NUMÉRIQUE','AUCUNE LOCALISATION PRÉCISE'] };
  }
  if (command === 'trace voss') return { output:['AUTORISATION REFUSÉE','ORIGINE DU REFUS : UTILISATEUR ELARA_VOSS','DERNIÈRE ACTIVITÉ : IL Y A 0 SECONDE'],unlocks:['trace-voss'] };
  if (command === 'protocol shadow') return { output:['PROTOCOLE OMBRE : VERROUILLÉ','CONDITION : SYNCHRONISATION A7 REQUISE'] };
  if (command === 'protocol ash') return { output:['PROTOCOLE CENDRE : CLASSIFIÉ','63 218 SIGNATURES ASSOCIÉES'] };
  if (command === 'secrets') return { output:['INDEX CHIFFRÉ : Z-2219 · A7 · R-9 · ASCENDANT','UTILISEZ OBJECTIVES POUR IDENTIFIER LA PROCHAINE PISTE.'] };
  return { output:[`COMMANDE INCONNUE : ${raw.trim()}`,'SAISISSEZ HELP POUR AFFICHER LES COMMANDES.'] };
}
