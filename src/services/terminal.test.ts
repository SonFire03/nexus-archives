import { emptyTerminalContext, executeCommand, normalizeCommand } from './terminal';

const withClue = { ...emptyTerminalContext, discoveredClues:['clue-z-2219'], unlockedSecrets:['clue-z-2219'] };
const withRestoration = { ...withClue, completedObjectives:['decrypt-z-2219','read-restoration-log'] };

describe('moteur contextuel du terminal', () => {
  it('affiche les commandes avec help', () => { expect(executeCommand('HELP').output.join(' ')).toContain('decrypt z-2219'); });
  it('ouvre le dossier A7', () => { expect(executeCommand('open a7').navigateTo).toBe('/operators/a7'); });
  it('refuse Z-2219 avant la découverte du code', () => { expect(executeCommand('decrypt z-2219').output).toContain('CODE INCONNU'); });
  it('déchiffre Z-2219 après sa découverte', () => { const result=executeCommand('decrypt z-2219',withClue); expect(result.unlocks).toEqual(expect.arrayContaining(['zero-fragment-1','document-restauration-2224'])); expect(result.completedObjectives).toContain('decrypt-z-2219'); });
  it.each(['decrypt Z2219','decrypt zero','decrypt nuit zéro'])('accepte l’alias %s', (alias) => { expect(executeCommand(alias,withClue).output[0]).toContain('DÉCHIFFRÉ'); });
  it('conditionne echo a7 à la restauration', () => { expect(executeCommand('echo a7').output).toContain('ACCÈS REFUSÉ'); expect(executeCommand('echo a7',withRestoration).completedObjectives).toContain('detect-seven-signatures'); });
  it('modifie scan nx-s après le contact', () => { expect(executeCommand('scan nx-s').output).toContain('SIGNAL INSTABLE'); expect(executeCommand('scan nx-s',{...emptyTerminalContext,spectralContactCount:1}).altered).toBe(true); });
  it('reste insensible à la casse et aux accents', () => { expect(normalizeCommand('  OpEn RAPPÔRT NUIT-ZÉRO  ')).toBe('open rapport nuit zero'); });
  it('retourne une erreur non bloquante', () => { expect(executeCommand('danse').output.some((line) => line.includes('COMMANDE INCONNUE'))).toBe(true); });
  it('localise A7-03 uniquement après découverte du dossier', () => { expect(executeCommand('scan signature a7-03').output).toContain('SIGNATURE INCONNUE'); const result=executeCommand('SCAN SIGNATURE A7-03',{...emptyTerminalContext,activeChapter:'chapter-two',discoveredClues:['clue-signature-a7-03']}); expect(result.completedObjectives).toContain('scan-signature-a7-03'); expect(result.unlocks).toContain('document-registre-helix-k13'); });
  it('vérifie Crimson uniquement après reconstruction', () => { expect(executeCommand('verify memory crimson').output).toContain('VÉRIFICATION IMPOSSIBLE'); const result=executeCommand('verify memory crimson',{...emptyTerminalContext,activeChapter:'chapter-two',solvedPuzzles:['memory-0417']}); expect(result.completedObjectives).toContain('verify-crimson-memory'); });
  it('conditionne la décision à la localisation du Corps 04', () => { expect(executeCommand('wake subject').output).toContain('PROTOCOLE INDISPONIBLE'); expect(executeCommand('wake subject',{...emptyTerminalContext,completedObjectives:['locate-body-04']}).navigateTo).toBe('/chapter-two?decision=wake'); });
});
