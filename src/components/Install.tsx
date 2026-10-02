import { useState } from "react";
import { SNIPPETS } from "../site";
import { useCopy } from "../site-copy";

export default function Install() {
  const [active, setActive] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const { install } = useCopy();

  const snippet = SNIPPETS.find((s) => s.id === active) ?? SNIPPETS[0];

  const copy = async () => {
    const text = snippet.lines.map(([, line]) => line).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; the snippet is selectable either way.
    }
  };

  return (
    <div className="install-layout">
      <div className="tabs" role="tablist" aria-label={install.aria}>
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            className="tab"
            role="tab"
            aria-selected={s.id === active}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="code">
        <div className="code-bar">
          <span>{snippet.file}</span>
          <button className="copy-btn" onClick={copy}>
            {copied ? install.copied : install.copy}
          </button>
        </div>
        <pre>
          <code>
            {snippet.lines.map(([kind, line], i) => (
              <div key={i} className={kind}>
                {line || " "}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
