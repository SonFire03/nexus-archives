import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProgressState } from '../types';
import { defaultProgress, loadProgress, mergeUnique, resolveAccessLevel, saveProgress, validateProgress } from './progress';

interface ProgressContextValue {
  progress: ProgressState;
  update: (patch: Partial<ProgressState>) => void;
  unlock: (secret: string, objective?: string) => void;
  markViewed: (documentId: string) => void;
  reset: () => void;
  exportProgress: () => string;
  importProgress: (raw: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  useEffect(() => saveProgress(progress), [progress]);

  const update = useCallback((patch: Partial<ProgressState>) => {
    setProgress((current) => ({ ...current, ...patch }));
  }, []);

  const unlock = useCallback((secret: string, objective?: string) => {
    setProgress((current) => {
      const unlockedSecrets = mergeUnique(current.unlockedSecrets, [secret]);
      const accessLevel = resolveAccessLevel(unlockedSecrets.length, current.accessLevel);
      return {
        ...current,
        unlockedSecrets,
        completedObjectives: objective ? mergeUnique(current.completedObjectives, [objective]) : current.completedObjectives,
        accessLevel,
      };
    });
  }, []);

  const markViewed = useCallback((documentId: string) => {
    setProgress((current) => ({ ...current, viewedDocuments: mergeUnique(current.viewedDocuments, [documentId]) }));
  }, []);

  const reset = useCallback(() => setProgress(defaultProgress), []);
  const exportProgress = useCallback(() => JSON.stringify(progress, null, 2), [progress]);
  const importProgress = useCallback((raw: string) => {
    try {
      const parsed = validateProgress(JSON.parse(raw));
      if (!parsed) return false;
      setProgress(parsed);
      return true;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(() => ({ progress, update, unlock, markViewed, reset, exportProgress, importProgress }), [progress, update, unlock, markViewed, reset, exportProgress, importProgress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress doit être utilisé dans ProgressProvider.');
  return context;
}
