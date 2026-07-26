import type { TerminalResult } from '../types';

export const terminalCommands = [
  'help','status','whoami','clear','reboot','map','locations','operators','armors','factions','timeline','archives',
  'open a7','open crimson','open vanta','open zero','open nexus','open armor ombre','open armor crimson','open faction directoire',
  'scan nx-s','trace voss','decrypt zero','memory crimson','echo a7','protocol shadow','protocol ash','access','secrets',
];

const links: Record<string, string> = {
  map: '/vanta', locations: '/vanta', operators: '/operators', armors: '/armors', factions: '/factions', timeline: '/timeline', archives: '/archives',
  'open a7': '/operators/a7', 'open crimson': '/operators/crimson', 'open vanta': '/vanta', 'open zero': '/vanta?zone=zero',
  'open nexus': '/factions/directoire', 'open armor ombre': '/armors/ombre', 'open armor crimson': '/armors/crimson', 'open faction directoire': '/factions/directoire',
};

export function executeCommand(raw: string): TerminalResult {
  const command = raw.trim().toLocaleLowerCase('fr');
  if (!command) return { output: [] };
  if (command === 'clear') return { output: [], clear: true };
  if (command === 'help') return { output: ['COMMANDES DISPONIBLES', terminalCommands.join(' · ')] };
  if (command === 'status') return { output: ['RÉSEAU : COMPROMIS', 'INTÉGRITÉ : 72 %', 'ACTIVITÉ SPECTRALE : ÉLEVÉE'] };
  if (command === 'whoami') return { output: ['IDENTITÉ : INCONNUE', 'AUTORISATION TEMPORAIRE : OMEGA-7', 'LOCALISATION : IMPOSSIBLE'] };
  if (command === 'reboot') return { output: ['RÉINITIALISATION VISUELLE AUTORISÉE.', 'LA MÉMOIRE LOCALE EST CONSERVÉE.'], navigateTo: '/' };
  if (links[command]) return { output: [`OUVERTURE : ${command.toUpperCase()}`], navigateTo: links[command] };
  if (command === 'scan nx-s') return { output: ['ANALYSE EN COURS...', 'ERREUR : CIBLE NON LOCALISABLE', 'ERREUR : CIBLE PRÉSENTE SUR LE TERMINAL LOCAL', 'NX-S : « Tu confirmes seulement que je suis déjà là. »'], unlock: 'contact-nx-s', complete: 'terminal-command' };
  if (command === 'trace voss') return { output: ['AUTORISATION REFUSÉE', 'ORIGINE DU REFUS : UTILISATEUR ELARA_VOSS', 'DERNIÈRE ACTIVITÉ : IL Y A 0 SECONDE'], unlock: 'trace-voss' };
  if (command === 'decrypt zero') return { output: ['FRAGMENT 1/4 DÉCHIFFRÉ', '22:19:04 — ARRÊT DE L’ANCRE A7', '22:19:07 — ACTIVITÉ NEURONALE NULLE', '22:30:49 — RESTAURATION EXTERNE DÉTECTÉE'], unlock: 'zero-fragment-1', complete: 'unlock-fragment' };
  if (command === 'memory crimson') return { output: ['FIL MNÉSIQUE CONNECTÉ', 'FRAGMENT : « CRIMSON T’A TUÉ. CRIMSON T’A SAUVÉ. »'], unlock: 'restauration-2224' };
  if (command === 'echo a7') return { output: ['ÉCHO INCOMPLET : SEPT SIGNATURES RÉPONDENT.', 'UNE SEULE PRÉTEND ÊTRE ORIGINALE.'], unlock: 'sept-corps' };
  if (command === 'protocol shadow') return { output: ['PROTOCOLE OMBRE : VERROUILLÉ', 'CONDITION : SYNCHRONISATION A7 REQUISE'] };
  if (command === 'protocol ash') return { output: ['PROTOCOLE CENDRE : CLASSIFIÉ', '63 218 SIGNATURES ASSOCIÉES'] };
  if (command === 'access') return { output: ['NIVEAUX : CIVIL > TACTIQUE > OMEGA > NOIR ABSOLU', "L’ACCÈS PROGRESSE PAR EXPLORATION."] };
  if (command === 'secrets') return { output: ['INDEX CHIFFRÉ : ZERO · A7 · R-9 · ASCENDANT', 'UTILISEZ DECRYPT, MEMORY, ECHO ET TRACE.'] };
  return { output: [`COMMANDE INCONNUE : ${raw.trim()}`, 'SAISISSEZ HELP POUR AFFICHER LES COMMANDES.'] };
}
