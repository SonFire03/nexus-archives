import { executeCommand } from './terminal';

describe('moteur du terminal', () => {
  it('affiche les commandes avec help', () => { expect(executeCommand('HELP').output.join(' ')).toContain('open a7'); });
  it('ouvre le dossier A7', () => { expect(executeCommand('open a7').navigateTo).toBe('/operators/a7'); });
  it('retourne une erreur pour une commande inconnue', () => { expect(executeCommand('danse').output.some((line) => line.includes('COMMANDE INCONNUE'))).toBe(true); });
  it('déchiffre et déverrouille un fragment de Zone Zéro', () => { expect(executeCommand('decrypt zero')).toEqual(expect.objectContaining({ unlock:'zero-fragment-1', complete:'unlock-fragment' })); });
});
