import type { AccessLevel, ProgressState } from '../types';

export const STORAGE_KEY = 'nexus-archives:v1';
export const accessOrder: AccessLevel[] = ['CIVIL', 'TACTIQUE', 'OMEGA', 'NOIR ABSOLU'];
export const MAX_IMPORT_SIZE = 250_000;

export const defaultProgress: ProgressState = {
  version: 7,
  introSeen: false,
  accessLevel: 'CIVIL',
  viewedDocuments: [],
  unlockedSecrets: [],
  terminalHistory: [],
  completedObjectives: [],
  audioEnabled: false,
  volume: 0.25,
  reducedEffects: false,
  selectedTransmission: null,
  lastVisitedRoute: '/dashboard',
  activeChapter: 'chapter-zero',
  completedChapters: [],
  discoveredClues: [],
  evidenceNodes: [],
  evidenceRelations: [],
  spectralContactCount: 0,
  lastNarrativeEvent: null,
  documentReadingProgress: {},
  solvedPuzzles: [],
  narrativeChoices: {},
  narrativeFlags: [],
};

interface LegacyProgress {
  version: 1; introSeen: boolean; accessLevel: AccessLevel; viewedDocuments: string[];
  unlockedSecrets: string[]; terminalHistory: string[]; completedObjectives: string[];
  audioEnabled: boolean; volume?: number; reducedEffects: boolean;
  selectedTransmission: string | null; lastVisitedRoute: string;
}

interface LegacyV2Progress {
  version: 2; introSeen: boolean; accessLevel: AccessLevel; viewedDocuments: string[];
  unlockedSecrets: string[]; terminalHistory: string[]; completedObjectives: string[];
  audioEnabled: boolean; volume: number; reducedEffects: boolean;
  selectedTransmission: string | null; lastVisitedRoute: string; activeChapter: string;
  completedChapters: string[]; discoveredClues: string[]; evidenceNodes: string[];
  evidenceRelations: string[]; spectralContactCount: number;
  lastNarrativeEvent: string | null; documentReadingProgress: Record<string, number>;
}

interface LegacyV3Progress extends Omit<ProgressState,'version' | 'narrativeFlags'> { version: 3 }
interface LegacyV4Progress extends Omit<ProgressState,'version'> { version: 4 }
interface LegacyV5Progress extends Omit<ProgressState,'version'> { version: 5 }
interface LegacyV6Progress extends Omit<ProgressState,'version'> { version: 6 }

const stringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isReadingProgress = (value: unknown): value is Record<string, number> => isRecord(value) && Object.values(value).every((item) => typeof item === 'number' && Number.isInteger(item) && item >= 0);
const isStringRecord = (value: unknown): value is Record<string, string> => isRecord(value) && Object.values(value).every((item) => typeof item === 'string');

const legacyDocumentIds: Record<string, string> = {
  'sept-corps': 'dossier-sept-corps', 'fil-rouge': 'protocole-fil-rouge', 'ordre-a7': 'ordre-execution-a7',
  'future-crimson': 'message-future-crimson', ascendant: 'projet-ascendant',
};

export function mergeUnique(current: string[], additions: string[]): string[] {
  return [...new Set([...current, ...additions])];
}

export function migrateV1ToV2(legacy: LegacyProgress): LegacyV2Progress {
  return {
    version: 2,
    introSeen: legacy.introSeen,
    accessLevel: legacy.accessLevel,
    viewedDocuments: legacy.viewedDocuments.map((id) => legacyDocumentIds[id] ?? id),
    unlockedSecrets: [...legacy.unlockedSecrets],
    terminalHistory: [...legacy.terminalHistory],
    completedObjectives: [...legacy.completedObjectives],
    audioEnabled: legacy.audioEnabled,
    volume: typeof legacy.volume === 'number' ? legacy.volume : defaultProgress.volume,
    reducedEffects: legacy.reducedEffects,
    selectedTransmission: legacy.selectedTransmission,
    lastVisitedRoute: legacy.lastVisitedRoute,
    activeChapter: 'chapter-zero',
    completedChapters: [],
    discoveredClues: [],
    evidenceNodes: [],
    evidenceRelations: [],
    spectralContactCount: 0,
    lastNarrativeEvent: null,
    documentReadingProgress: {},
  };
}

export function migrateV2ToV3(legacy: LegacyV2Progress): LegacyV3Progress {
  const activeChapter = legacy.completedChapters.includes('chapter-two')
    ? 'chapter-two'
    : legacy.completedChapters.includes('chapter-zero') ? 'chapter-two' : legacy.activeChapter;
  return { ...legacy, version: 3, activeChapter, solvedPuzzles: [], narrativeChoices: {} };
}

export function migrateV3ToV4(legacy: LegacyV3Progress): LegacyV4Progress {
  const activeChapter = legacy.completedChapters.includes('chapter-three')
    ? 'chapter-three'
    : legacy.completedChapters.includes('chapter-two') ? 'chapter-three' : legacy.activeChapter;
  return { ...legacy, version:4, activeChapter, narrativeFlags:[] };
}

export function migrateV4ToV5(legacy: LegacyV4Progress): LegacyV5Progress {
  const activeChapter = legacy.completedChapters.includes('chapter-four')
    ? 'chapter-four'
    : legacy.completedChapters.includes('chapter-three') ? 'chapter-four' : legacy.activeChapter;
  return { ...legacy, version:5, activeChapter };
}

export function migrateV5ToV6(legacy: LegacyV5Progress): LegacyV6Progress {
  const activeChapter = legacy.completedChapters.includes('chapter-five')
    ? 'chapter-five'
    : legacy.completedChapters.includes('chapter-four') ? 'chapter-five' : legacy.activeChapter;
  return { ...legacy, version:6, activeChapter };
}

export function migrateV6ToV7(legacy: LegacyV6Progress): ProgressState {
  const activeChapter = legacy.completedChapters.includes('chapter-five') ? 'chapter-six' : legacy.activeChapter;
  return { ...legacy, version:7, activeChapter };
}

function validateLegacy(value: unknown): LegacyProgress | null {
  if (!isRecord(value) || value.version !== 1 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  if (!stringArray(value.viewedDocuments) || !stringArray(value.unlockedSecrets) || !stringArray(value.terminalHistory) || !stringArray(value.completedObjectives)) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string') return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  return value as unknown as LegacyProgress;
}

export function validateProgress(value: unknown): ProgressState | null {
  if (!isRecord(value) || value.version !== 7 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations','solvedPuzzles','narrativeFlags'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress) || !isStringRecord(value.narrativeChoices)) return null;
  return value as unknown as ProgressState;
}

function validateV6(value: unknown): LegacyV6Progress | null {
  if (!isRecord(value) || value.version !== 6 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations','solvedPuzzles','narrativeFlags'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress) || !isStringRecord(value.narrativeChoices)) return null;
  return value as unknown as LegacyV6Progress;
}

function validateV5(value: unknown): LegacyV5Progress | null {
  if (!isRecord(value) || value.version !== 5 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations','solvedPuzzles','narrativeFlags'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress) || !isStringRecord(value.narrativeChoices)) return null;
  return value as unknown as LegacyV5Progress;
}

function validateV4(value: unknown): LegacyV4Progress | null {
  if (!isRecord(value) || value.version !== 4 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations','solvedPuzzles','narrativeFlags'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress) || !isStringRecord(value.narrativeChoices)) return null;
  return value as unknown as LegacyV4Progress;
}

function validateV3(value: unknown): LegacyV3Progress | null {
  if (!isRecord(value) || value.version !== 3 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations','solvedPuzzles'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress) || !isStringRecord(value.narrativeChoices)) return null;
  return value as unknown as LegacyV3Progress;
}

function validateV2(value: unknown): LegacyV2Progress | null {
  if (!isRecord(value) || value.version !== 2 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress)) return null;
  return value as unknown as LegacyV2Progress;
}

export function parseProgress(raw: string): ProgressState | null {
  if (raw.length > MAX_IMPORT_SIZE) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    const current = validateProgress(parsed);
    if (current) return current;
    const legacyV6 = validateV6(parsed);
    if (legacyV6) return migrateV6ToV7(legacyV6);
    const legacyV5 = validateV5(parsed);
    if (legacyV5) return migrateV6ToV7(migrateV5ToV6(legacyV5));
    const legacyV4 = validateV4(parsed);
    if (legacyV4) return migrateV6ToV7(migrateV5ToV6(migrateV4ToV5(legacyV4)));
    const legacyV3 = validateV3(parsed);
    if (legacyV3) return migrateV6ToV7(migrateV5ToV6(migrateV4ToV5(migrateV3ToV4(legacyV3))));
    const legacyV2 = validateV2(parsed);
    if (legacyV2) return migrateV6ToV7(migrateV5ToV6(migrateV4ToV5(migrateV3ToV4(migrateV2ToV3(legacyV2)))));
    const legacy = validateLegacy(parsed);
    return legacy ? migrateV6ToV7(migrateV5ToV6(migrateV4ToV5(migrateV3ToV4(migrateV2ToV3(migrateV1ToV2(legacy)))))) : null;
  } catch {
    return null;
  }
}

export function loadProgress(storage: Pick<Storage, 'getItem'> = localStorage): ProgressState {
  const raw = storage.getItem(STORAGE_KEY);
  return raw ? parseProgress(raw) ?? defaultProgress : defaultProgress;
}

export function saveProgress(progress: ProgressState, storage: Pick<Storage, 'setItem'> = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function deriveAccessLevel(progress: ProgressState): AccessLevel {
  if (progress.completedChapters.includes('chapter-three') || progress.accessLevel === 'NOIR ABSOLU') return 'NOIR ABSOLU';
  if (progress.completedChapters.includes('chapter-two')) return 'OMEGA';
  if (progress.accessLevel === 'OMEGA') return progress.accessLevel;
  return progress.completedChapters.includes('chapter-zero') ? 'TACTIQUE' : 'CIVIL';
}
