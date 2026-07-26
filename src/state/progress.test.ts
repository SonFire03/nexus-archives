import { defaultProgress, loadProgress, mergeUnique, resolveAccessLevel, saveProgress, STORAGE_KEY, validateProgress } from './progress';

describe('progression locale', () => {
  it('sauvegarde et recharge la progression', () => { saveProgress({ ...defaultProgress, introSeen: true }); expect(loadProgress().introSeen).toBe(true); });
  it('retombe sur les valeurs par défaut si les données sont invalides', () => { localStorage.setItem(STORAGE_KEY, '{"version":99}'); expect(loadProgress()).toEqual(defaultProgress); });
  it('rejette un import incomplet', () => { expect(validateProgress({ version: 1 })).toBeNull(); });
  it('fusionne les déblocages sans doublon', () => { expect(mergeUnique(['a'], ['a','b'])).toEqual(['a','b']); });
  it('fait progresser les quatre niveaux d’accès', () => { expect([0,1,3,6].map((count) => resolveAccessLevel(count,'CIVIL'))).toEqual(['CIVIL','TACTIQUE','OMEGA','NOIR ABSOLU']); });
});
