import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { narrativeEvents } from '../data/chapterZero';
import type { NarrativeEffect, NarrativeEvent, ProgressState, TerminalResult } from '../types';
import { applyNarrativeEffects, applyTerminalResult, completeChapterZero } from './narrative';
import { defaultProgress, loadProgress, mergeUnique, parseProgress, saveProgress } from './progress';

interface ProgressContextValue {
  progress: ProgressState;
  notification: NarrativeEvent | null;
  update: (patch: Partial<ProgressState>) => void;
  dispatchEffects: (effects: NarrativeEffect[]) => void;
  applyCommandResult: (result: TerminalResult) => void;
  markViewed: (documentId: string) => void;
  setReadingProgress: (documentId: string, page: number) => void;
  finishChapterZero: () => void;
  dismissNotification: () => void;
  reset: () => void;
  exportProgress: () => string;
  importProgress: (raw: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [notification, setNotification] = useState<NarrativeEvent | null>(null);

  useEffect(() => saveProgress(progress), [progress]);
  const update = useCallback((patch: Partial<ProgressState>) => setProgress((current) => ({ ...current, ...patch })), []);
  const notify = useCallback((eventId?: string) => {
    if (!eventId) return;
    const event = narrativeEvents.find((item) => item.id === eventId);
    if (event) setNotification(event);
  }, []);
  const dispatchEffects = useCallback((effects: NarrativeEffect[]) => {
    const eventId = [...effects].reverse().find((effect) => effect.type === 'narrative-event')?.id;
    setProgress((current) => applyNarrativeEffects(current, effects));
    notify(eventId);
  }, [notify]);
  const applyCommandResult = useCallback((result: TerminalResult) => {
    setProgress((current) => applyTerminalResult(current, result));
    notify(result.notification);
  }, [notify]);
  const markViewed = useCallback((documentId: string) => setProgress((current) => ({ ...current, viewedDocuments: mergeUnique(current.viewedDocuments, [documentId]) })), []);
  const setReadingProgress = useCallback((documentId: string, page: number) => setProgress((current) => ({ ...current, documentReadingProgress: { ...current.documentReadingProgress, [documentId]: page } })), []);
  const finishChapterZero = useCallback(() => {
    setProgress((current) => completeChapterZero(current));
    notify('nx-s-contact-01');
  }, [notify]);
  const dismissNotification = useCallback(() => setNotification(null), []);
  const reset = useCallback(() => { setProgress(defaultProgress); setNotification(null); }, []);
  const exportProgress = useCallback(() => JSON.stringify(progress, null, 2), [progress]);
  const importProgress = useCallback((raw: string) => { const parsed = parseProgress(raw); if (!parsed) return false; setProgress(parsed); return true; }, []);
  const value = useMemo(() => ({ progress, notification, update, dispatchEffects, applyCommandResult, markViewed, setReadingProgress, finishChapterZero, dismissNotification, reset, exportProgress, importProgress }), [progress, notification, update, dispatchEffects, applyCommandResult, markViewed, setReadingProgress, finishChapterZero, dismissNotification, reset, exportProgress, importProgress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress doit être utilisé dans ProgressProvider.');
  return context;
}
