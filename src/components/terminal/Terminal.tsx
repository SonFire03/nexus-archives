import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { executeCommand, terminalCommands } from '../../services/terminal';
import { useProgress } from '../../state/ProgressContext';
import { useAudio } from '../../hooks/useAudio';

interface Line { id: number; command?: string; output: string[] }

export function Terminal() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([{ id: 0, output: ['NXS-OS TERMINAL // SESSION OMEGA-7', 'SAISISSEZ HELP POUR LA LISTE DES COMMANDES.'] }]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const counter = useRef(1);
  const navigate = useNavigate();
  const { progress, update, unlock } = useProgress();
  const play = useAudio(progress.audioEnabled, progress.volume);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    const result = executeCommand(command);
    if (result.clear) setLines([]); else setLines((current) => [...current, { id: counter.current++, command, output: result.output }]);
    const history = [...progress.terminalHistory.filter((item) => item !== command), command].slice(-40);
    update({ terminalHistory: history });
    if (result.unlock) unlock(result.unlock, result.complete);
    if (result.navigateTo) {
      const destination = result.navigateTo;
      window.setTimeout(() => { void navigate(destination); }, 350);
    }
    setInput(''); setHistoryIndex(-1); play(command.includes('nx-s') ? 'spectral' : 'terminal');
  };
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') { event.preventDefault(); const next = Math.min(historyIndex + 1, progress.terminalHistory.length - 1); setHistoryIndex(next); setInput(progress.terminalHistory.at(-(next + 1)) ?? ''); }
    if (event.key === 'ArrowDown') { event.preventDefault(); const next = historyIndex - 1; setHistoryIndex(next); setInput(next < 0 ? '' : progress.terminalHistory.at(-(next + 1)) ?? ''); }
    if (event.key === 'Tab') { event.preventDefault(); const matches = terminalCommands.filter((item) => item.startsWith(input.toLowerCase())); if (matches.length === 1) setInput(matches[0]!); }
  };
  return <section className="terminal-window" aria-label="Terminal interactif NEXUS" onClick={(event) => event.currentTarget.querySelector('input')?.focus()}><header><span>TERMINAL://OMEGA-7</span><span>CHIFFREMENT INSTABLE</span></header><div className="terminal-output" role="log" aria-live="polite">{lines.map((line) => <div className="terminal-line" key={line.id}>{line.command && <p><span>OMEGA-7@NEXUS:~$</span> {line.command}</p>}{line.output.map((output,index) => <p className={output.includes('NX-S') ? 'spectral-text' : ''} key={`${line.id}-${index}`}>{output}</p>)}</div>)}</div><form onSubmit={submit}><label htmlFor="terminal-input">COMMANDE</label><span aria-hidden="true">OMEGA-7@NEXUS:~$</span><input id="terminal-input" autoComplete="off" autoCapitalize="none" spellCheck={false} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={keyDown} /></form></section>;
}
