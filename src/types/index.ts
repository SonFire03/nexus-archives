export type AccessLevel = 'CIVIL' | 'TACTIQUE' | 'OMEGA' | 'NOIR ABSOLU';
export type ThreatLevel = 'FAIBLE' | 'ÉLEVÉ' | 'CRITIQUE' | 'OMEGA' | 'OMEGA-ROUGE';
export type StatBlock = Record<'mobilité' | 'blindage' | 'puissance' | 'furtivité' | 'guerreÉlectronique' | 'autonomie' | 'neuroRisque', number>;

export interface Secret { id: string; label: string; access: AccessLevel }
export interface Operator {
  id: string; matricule: string; name: string; callsign: string; civilName: string;
  gender: string; age: string; height: string; officialStatus: string; realStatus: string;
  className: string; compatibility: number; threat: ThreatLevel; order: string;
  description: string; profile: string[]; origins: string[]; roles: string[];
  armorId: string; weapons: string[]; weaknesses: string[]; nightZero: string[];
  relationships: { target: string; detail: string }[]; secrets: Secret[]; quotes: string[];
}
export interface Armor {
  id: string; designation: string; name: string; generation: number; className: string;
  role: string; appearance: string; operatorId?: string; abilities: string[];
  specialMode: string; weaknesses: string[]; colors: string; status: string;
  level: string; forbidden: boolean; stats: StatBlock;
}
export interface Leader { name: string; role: string }
export interface Relationship { targetId: string; type: 'alliance' | 'tension' | 'opposition' | 'menace'; detail: string }
export interface Faction {
  id: string; name: string; zone: string; motto: string; internalMotto?: string;
  objective: string; description: string; leaders: Leader[]; secret: string;
  relationships: Relationship[]; color: string;
}
export interface Location {
  id: string; name: string; level: number; description: string; atmosphere: string;
  dominantFaction: string; danger: ThreatLevel; status: 'consultable' | 'verrouillé';
  points: string[]; incidents: string[]; color: string;
}
export interface TimelineEvent { id: string; sort: number; date: string; title: string; description: string; classified?: string }
export interface Transmission { id: string; sender: string; text: string; trigger: string }
export interface ArchiveDocument { id: string; title: string; access: AccessLevel; excerpt: string; secretId?: string }
export interface ProgressState {
  version: 1; introSeen: boolean; accessLevel: AccessLevel; viewedDocuments: string[];
  unlockedSecrets: string[]; terminalHistory: string[]; completedObjectives: string[];
  audioEnabled: boolean; volume: number; reducedEffects: boolean;
  selectedTransmission: string | null; lastVisitedRoute: string;
}
export interface TerminalResult { output: string[]; navigateTo?: string; unlock?: string; complete?: string; clear?: boolean }
