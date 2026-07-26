import { chapterZeroObjectives } from '../data/chapterZero';
import type { TerminalContext, TerminalResult } from '../types';

export const terminalCommands = [
  'help','status','whoami','access','objectives','evidence','investigation','clear','reboot',
  'map','locations','operators','armors','factions','timeline','archives','open a7','open crimson',
  'open report zero','open restoration','decrypt z-2219','compare zero','echo a7','memory crimson',
  'scan nx-s','trace voss','protocol shadow','protocol ash','secrets',
];

export const emptyTerminalContext: TerminalContext = {
  accessLevel:'CIVIL', viewedDocuments:[], unlockedSecrets:[], completedObjectives:[], activeChapter:'chapter-zero',
  discoveredClues:[], evidenceNodes:[], evidenceRelations:[], spectralContactCount:0,
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
};

const isDecryptZero = (command: string) => ['decrypt z 2219','decrypt z2219','decrypt zero','decrypt nuit zero'].includes(command);

export function executeCommand(raw: string, context: TerminalContext = emptyTerminalContext): TerminalResult {
  const command = normalizeCommand(raw);
  if (!command) return { output: [] };
  if (command === 'clear') return { output: [], clear: true };
  if (command === 'help') return { output: ['COMMANDES DISPONIBLES', terminalCommands.join(' · ')] };
  if (command === 'status') return { output: [`CHAPITRE : ${context.activeChapter === 'chapter-zero' ? '01 // NUIT ZÉRO' : context.activeChapter}`,`ACCÈS : ${context.accessLevel}`,`PREUVES : ${context.evidenceNodes.length} NŒUDS // ${context.evidenceRelations.length} RELATIONS`,context.spectralContactCount ? 'ACTIVITÉ SPECTRALE : TERMINAL COMPROMIS' : 'ACTIVITÉ SPECTRALE : INSTABLE'] };
  if (command === 'whoami') return { output: ['IDENTITÉ : INCONNUE', `AUTORISATION : ${context.accessLevel}`, 'LOCALISATION : IMPOSSIBLE'] };
  if (command === 'access') return { output: [`NIVEAU ACTUEL : ${context.accessLevel}`, context.accessLevel === 'CIVIL' ? 'CONDITION TACTIQUE : TERMINER L’ENQUÊTE NUIT ZÉRO' : 'ACCÈS TACTIQUE CONFIRMÉ'] };
  if (command === 'objectives') {
    const next = chapterZeroObjectives.find((objective) => !context.completedObjectives.includes(objective.id));
    return { output: next ? [`OBJECTIF PRIORITAIRE : ${next.title.toUpperCase()}`, next.description.toUpperCase(), next.hint?.toUpperCase() ?? 'AUCUN INDICE DISPONIBLE'] : ['TOUS LES OBJECTIFS DU CHAPITRE SONT TERMINÉS.'] };
  }
  if (command === 'evidence') return { output: [`NŒUDS DÉCOUVERTS : ${context.evidenceNodes.length}`,`RELATIONS ÉTABLIES : ${context.evidenceRelations.length}`,'OUVERTURE DU TABLEAU D’ENQUÊTE…'], navigateTo:'/investigation' };
  if (command === 'reboot') return { output: ['RÉINITIALISATION VISUELLE AUTORISÉE.','LA MÉMOIRE LOCALE EST CONSERVÉE.'], navigateTo:'/', reboot:true };
  if (directRoutes[command]) return { output:[`OUVERTURE : ${command.toUpperCase()}`], navigateTo:directRoutes[command] };
  if (['open restoration','open restauration','open restauration 22 24'].includes(command)) {
    return context.unlockedSecrets.includes('document-restauration-2224') ? { output:['OUVERTURE : JOURNAL DE RESTAURATION 22:24'],navigateTo:'/archives/restauration-2224' } : { output:['ACCÈS REFUSÉ','DOCUMENT NON INDEXÉ. DÉCHIFFREMENT REQUIS.'] };
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
