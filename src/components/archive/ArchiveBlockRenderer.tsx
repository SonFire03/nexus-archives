import { Link } from 'react-router-dom';
import type { ArchiveBlock } from '../../types';
import { RedactedText } from '../common/RedactedText';

export function ArchiveBlockRenderer({ block, unlockedSecrets }: { block: ArchiveBlock; unlockedSecrets: string[] }) {
  if (block.type === 'heading') return <h2 className="document-heading">{block.text}</h2>;
  if (block.type === 'paragraph') return <p className="document-paragraph">{block.text}</p>;
  if (block.type === 'system-log') return <div className={`document-log ${block.spectral ? 'is-spectral' : ''}`}><span>SORTIE SYSTÈME{block.spectral ? ' // ALTÉRÉE' : ''}</span>{block.lines.map((line) => <code key={line}>{line}</code>)}</div>;
  if (block.type === 'quote') return <blockquote className="document-quote">« {block.text} »<cite>— {block.source}</cite></blockquote>;
  if (block.type === 'warning') return <aside className="document-warning"><strong>{block.title}</strong><p>{block.text}</p></aside>;
  if (block.type === 'metadata') return <dl className="document-metadata">{block.entries.map((entry) => <div key={entry.label}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>)}</dl>;
  if (block.type === 'redacted') return <p className="document-redacted"><RedactedText revealed={!block.revealSecret || unlockedSecrets.includes(block.revealSecret)}>{block.text}</RedactedText></p>;
  if (block.type === 'clue') return <aside className="document-clue" data-clue-id={block.clueId}><span>INDICE // {block.label}</span><strong>{block.text}</strong></aside>;
  if (block.type === 'table') return <div className="document-table-wrap" tabIndex={0} aria-label="Tableau de données défilable"><table><thead><tr>{block.headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{block.rows.map((row,index) => <tr key={`${row[0]}-${index}`}>{row.map((cell,cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
  if (block.type === 'evidence') return <aside className="document-evidence"><span>PREUVE // {block.nodeId.toUpperCase()}</span><h3>{block.title}</h3><p>{block.text}</p><Link to="/investigation">VOIR DANS L’ENQUÊTE →</Link></aside>;
  return <blockquote className="document-transmission"><span>TRANSMISSION // {block.sender}</span><p>« {block.text} »</p></blockquote>;
}
