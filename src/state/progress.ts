import type { AccessLevel, ProgressState } from '../types';

export const STORAGE_KEY = 'nexus-archives:v1';
export const accessOrder: AccessLevel[] = ['CIVIL', 'TACTIQUE', 'OMEGA', 'NOIR ABSOLU'];
export const MAX_IMPORT_SIZE = 250_000;

export const defaultProgress: ProgressState = {
  version: 2,
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
};

interface LegacyProgress {
  version: 1; introSeen: boolean; accessLevel: AccessLevel; viewedDocuments: string[];
  unlockedSecrets: string[]; terminalHistory: string[]; completedObjectives: string[];
  audioEnabled: boolean; volume?: number; reducedEffects: boolean;
  selectedTransmission: string | null; lastVisitedRoute: string;
}

const stringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isReadingProgress = (value: unknown): value is Record<string, number> => isRecord(value) && Object.values(value).every((item) => typeof item === 'number' && Number.isInteger(item) && item >= 0);

const legacyDocumentIds: Record<string, string> = {
  'sept-corps': 'dossier-sept-corps', 'fil-rouge': 'protocole-fil-rouge', 'ordre-a7': 'ordre-execution-a7',
  'future-crimson': 'message-future-crimson', ascendant: 'projet-ascendant',
};

export function mergeUnique(current: string[], additions: string[]): string[] {
  return [...new Set([...current, ...additions])];
}

export function migrateV1ToV2(legacy: LegacyProgress): ProgressState {
  return {
    ...defaultProgress,
    introSeen: legacy.introSeen,
    viewedDocuments: legacy.viewedDocuments.map((id) => legacyDocumentIds[id] ?? id),
    unlockedSecrets: [...legacy.unlockedSecrets],
    terminalHistory: [...legacy.terminalHistory],
    completedObjectives: [...legacy.completedObjectives],
    audioEnabled: legacy.audioEnabled,
    volume: typeof legacy.volume === 'number' ? legacy.volume : defaultProgress.volume,
    reducedEffects: legacy.reducedEffects,
    selectedTransmission: legacy.selectedTransmission,
    lastVisitedRoute: legacy.lastVisitedRoute,
  };
}

function validateLegacy(value: unknown): LegacyProgress | null {
  if (!isRecord(value) || value.version !== 1 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  if (!stringArray(value.viewedDocuments) || !stringArray(value.unlockedSecrets) || !stringArray(value.terminalHistory) || !stringArray(value.completedObjectives)) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string') return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  return value as unknown as LegacyProgress;
}

export function validateProgress(value: unknown): ProgressState | null {
  if (!isRecord(value) || value.version !== 2 || typeof value.introSeen !== 'boolean' || typeof value.accessLevel !== 'string' || !accessOrder.includes(value.accessLevel as AccessLevel)) return null;
  const arrays = ['viewedDocuments','unlockedSecrets','terminalHistory','completedObjectives','completedChapters','discoveredClues','evidenceNodes','evidenceRelations'] as const;
  if (arrays.some((key) => !stringArray(value[key]))) return null;
  if (typeof value.audioEnabled !== 'boolean' || typeof value.reducedEffects !== 'boolean' || typeof value.lastVisitedRoute !== 'string' || typeof value.activeChapter !== 'string') return null;
  if (typeof value.volume !== 'number' || value.volume < 0 || value.volume > 1 || typeof value.spectralContactCount !== 'number' || value.spectralContactCount < 0) return null;
  if (value.selectedTransmission !== null && typeof value.selectedTransmission !== 'string') return null;
  if (value.lastNarrativeEvent !== null && typeof value.lastNarrativeEvent !== 'string') return null;
  if (!isReadingProgress(value.documentReadingProgress)) return null;
  return value as unknown as ProgressState;
}

export function parseProgress(raw: string): ProgressState | null {
  if (raw.length > MAX_IMPORT_SIZE) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    const current = validateProgress(parsed);
    if (current) return current;
    const legacy = validateLegacy(parsed);
    return legacy ? migrateV1ToV2(legacy) : null;
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
  if (progress.accessLevel === 'NOIR ABSOLU' || progress.accessLevel === 'OMEGA') return progress.accessLevel;
  return progress.completedChapters.includes('chapter-zero') ? 'TACTIQUE' : 'CIVIL';
}
