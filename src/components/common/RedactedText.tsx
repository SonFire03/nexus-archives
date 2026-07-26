export function RedactedText({ revealed, children }: { revealed: boolean; children: string }) {
  return revealed ? <span>{children}</span> : <span className="redacted" aria-label="Information classifiée verrouillée"><span aria-hidden="true">████████ ██████</span></span>;
}
