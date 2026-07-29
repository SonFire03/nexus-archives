import { chapterZeroObjectives } from '../data/chapterZero';
import { chapterTwoObjectives } from '../data/chapterTwo';
import type { TerminalContext, TerminalResult } from '../types';

export const terminalCommands = [
  'help','status','whoami','access','objectives','evidence','investigation','clear','reboot',
  'map','locations','operators','armors','factions','timeline','archives','open a7','open crimson',
  'open report zero','open restoration','decrypt z-2219','compare zero','echo a7','memory crimson',
  'scan nx-s','trace voss','protocol shadow','protocol ash','secrets',
  'scan signature a7-03','open seven bodies','open helix register','reconstruct memory',
  'verify memory crimson','trace body-04','wake subject','isolate subject','erase subject',
];

export const emptyTerminalContext: TerminalContext = {
  accessLevel:'CIVIL', viewedDocuments:[], unlockedSecrets:[], completedObjectives:[], activeChapter:'chapter-zero',
  discoveredClues:[], evidenceNodes:[], evidenceRelations:[], spectralContactCount:0,
  solvedPuzzles:[], narrativeChoices:{},
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
};

const isDecryptZero = (command: string) => ['decrypt z 2219','decrypt z2219','decrypt zero','decrypt nuit zero'].includes(command);

export function executeCommand(raw: string, context: TerminalContext = emptyTerminalContext): TerminalResult {
  const command = normalizeCommand(raw);
  if (!command) return { output: [] };
  if (command === 'clear') return { output: [], clear: true };
  if (command === 'help') return { output: ['COMMANDES DISPONIBLES', terminalCommands.join(' · ')] };
  if (command === 'status') return { output: [`CHAPITRE : ${context.activeChapter === 'chapter-zero' ? '01 // NUIT ZÉRO' : '02 // LES SEPT CORPS'}`,`ACCÈS : ${context.accessLevel}`,`PREUVES : ${context.evidenceNodes.length} NŒUDS // ${context.evidenceRelations.length} RELATIONS`,context.spectralContactCount ? 'ACTIVITÉ SPECTRALE : TERMINAL COMPROMIS' : 'ACTIVITÉ SPECTRALE : INSTABLE'] };
  if (command === 'whoami') return { output: ['IDENTITÉ : INCONNUE', `AUTORISATION : ${context.accessLevel}`, 'LOCALISATION : IMPOSSIBLE'] };
  if (command === 'access') return { output: [`NIVEAU ACTUEL : ${context.accessLevel}`, context.accessLevel === 'CIVIL' ? 'CONDITION TACTIQUE : TERMINER L’ENQUÊTE NUIT ZÉRO' : context.accessLevel === 'TACTIQUE' ? 'CONDITION OMEGA : STATUER SUR LE CORPS A7-04' : 'ACCÈS OMEGA CONFIRMÉ'] };
  if (command === 'objectives') {
    const objectives = context.activeChapter === 'chapter-two' ? chapterTwoObjectives : chapterZeroObjectives;
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
