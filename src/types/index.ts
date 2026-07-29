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

export type ArchiveCategory = 'incident' | 'médical' | 'ordre' | 'programme' | 'identité' | 'transmission' | 'registre' | 'laboratoire';
export type ArchiveReferenceType = 'operator' | 'armor' | 'location' | 'faction' | 'timeline' | 'archive';
export type ArchiveBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'system-log'; lines: string[]; spectral?: boolean }
  | { type: 'quote'; text: string; source: string }
  | { type: 'warning'; title: string; text: string }
  | { type: 'metadata'; entries: { label: string; value: string }[] }
  | { type: 'redacted'; text: string; revealSecret?: string }
  | { type: 'clue'; clueId: string; label: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'evidence'; nodeId: string; title: string; text: string }
  | { type: 'transmission'; sender: string; text: string };
export interface ArchivePage { id: string; title: string; blocks: ArchiveBlock[] }
export interface ArchiveAttachment { id: string; label: string; type: string; status: string }
export interface ArchiveReference { type: ArchiveReferenceType; id: string; label: string; route: string }
export type UnlockRequirement =
  | { type: 'access'; value: AccessLevel }
  | { type: 'secret'; value: string }
  | { type: 'objective'; value: string }
  | { type: 'chapter'; value: string };
export type NarrativeEffect =
  | { type: 'unlock-secret'; id: string }
  | { type: 'complete-objective'; id: string }
  | { type: 'discover-clue'; id: string }
  | { type: 'add-evidence-node'; id: string }
  | { type: 'add-evidence-relation'; id: string }
  | { type: 'transmission'; id: string }
  | { type: 'activate-chapter'; id: string }
  | { type: 'solve-puzzle'; id: string }
  | { type: 'flag'; id: string }
  | { type: 'narrative-event'; id: string };
export interface ArchiveComparisonDifference {
  id: string; label: string; official: string; classified: string;
  evidenceNodeId?: string; evidenceRelationId?: string;
}
export interface ArchiveComparison {
  id: string; officialTitle: string; classifiedTitle: string;
  summary: string; differences: ArchiveComparisonDifference[];
  requirement?: UnlockRequirement; onRecordEffects: NarrativeEffect[];
}
export interface ArchiveDocument {
  id: string; title: string; code: string; classification: AccessLevel;
  category: ArchiveCategory; date: string; issuer: string; author?: string;
  status: string; summary: string; pages: ArchivePage[];
  attachments?: ArchiveAttachment[]; references?: ArchiveReference[];
  requirements?: UnlockRequirement[]; onOpenEffects?: NarrativeEffect[];
  comparison?: ArchiveComparison; terminalCodes?: string[]; chapterId?: string;
}
export interface NarrativeObjective {
  id: string; title: string; description: string; hint?: string; route: string;
  requires?: string[];
}
export interface EvidenceNode {
  id: string; label: string; category: string; summary: string; route?: string;
}
export interface EvidenceRelation {
  id: string; from: string; to: string; label: string; sourceDocumentId: string;
}
export interface NarrativeEvent { id: string; kind: 'document' | 'objective' | 'access' | 'spectral' | 'chapter'; title: string; message: string }
export interface ProgressState {
  version: 7; introSeen: boolean; accessLevel: AccessLevel; viewedDocuments: string[];
  unlockedSecrets: string[]; terminalHistory: string[]; completedObjectives: string[];
  audioEnabled: boolean; volume: number; reducedEffects: boolean;
  selectedTransmission: string | null; lastVisitedRoute: string; activeChapter: string;
  completedChapters: string[]; discoveredClues: string[]; evidenceNodes: string[];
  evidenceRelations: string[]; spectralContactCount: number;
  lastNarrativeEvent: string | null; documentReadingProgress: Record<string, number>;
  solvedPuzzles: string[]; narrativeChoices: Record<string, string>; narrativeFlags: string[];
}
export interface TerminalContext {
  accessLevel: AccessLevel; viewedDocuments: string[]; unlockedSecrets: string[];
  completedObjectives: string[]; activeChapter: string; discoveredClues: string[];
  evidenceNodes: string[]; evidenceRelations: string[]; spectralContactCount: number;
  solvedPuzzles: string[]; narrativeChoices: Record<string, string>;
  narrativeFlags: string[];
}
export interface TerminalResult {
  output: string[]; navigateTo?: string; unlocks?: string[];
  completedObjectives?: string[]; discoveredClues?: string[];
  evidenceNodes?: string[]; evidenceRelations?: string[];
  narrativeFlags?: string[];
  accessLevelChange?: AccessLevel; transmissionId?: string; notification?: string;
  clear?: boolean; reboot?: boolean; spectralEvent?: boolean; altered?: boolean;
}
