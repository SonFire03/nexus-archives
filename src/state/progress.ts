import type { AccessLevel, ProgressState } from '../types';

export const STORAGE_KEY = 'nexus-archives:v1';
export const accessOrder: AccessLevel[] = ['CIVIL', 'TACTIQUE', 'OMEGA', 'NOIR ABSOLU'];

export const defaultProgress: ProgressState = {
  version: 1,
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
};

const stringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');

export function validateProgress(value: unknown): ProgressState | null {
  if (!value || typeof value !== 'object') return null;
  const data = value as Partial<ProgressState>;
  if (data.version !== 1 || typeof data.introSeen !== 'boolean' || !data.accessLevel || !accessOrder.includes(data.accessLevel)) return null;
  if (!stringArray(data.viewedDocuments) || !stringArray(data.unlockedSecrets) || !stringArray(data.terminalHistory) || !stringArray(data.completedObjectives)) return null;
  if (typeof data.audioEnabled !== 'boolean' || typeof data.reducedEffects !== 'boolean' || typeof data.lastVisitedRoute !== 'string') return null;
  if (typeof data.volume !== 'number' || data.volume < 0 || data.volume > 1) return null;
  if (data.selectedTransmission !== null && typeof data.selectedTransmission !== 'string') return null;
  return data as ProgressState;
}

export function loadProgress(storage: Pick<Storage, 'getItem'> = localStorage): ProgressState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return validateProgress(JSON.parse(raw)) ?? defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState, storage: Pick<Storage, 'setItem'> = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function mergeUnique(current: string[], additions: string[]): string[] {
  return [...new Set([...current, ...additions])];
}

export function resolveAccessLevel(secretCount: number, current: AccessLevel): AccessLevel {
  if (secretCount >= 6) return 'NOIR ABSOLU';
  if (secretCount >= 3) return 'OMEGA';
  if (secretCount >= 1) return 'TACTIQUE';
  return current;
}
