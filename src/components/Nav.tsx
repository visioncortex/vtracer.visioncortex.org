import { useEffect, useState } from "react";
import { DOCS, RELEASES, REPO } from "../site";

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={stuck ? "nav stuck" : "nav"}>
      <div className="shell nav-inner">
        <a className="brand" href="/">
          <img src="/icon.png" alt="" width={28} height={28} />
          <span className="brand-name">VTracer</span>
          <span className="brand-ver">2.0</span>
        </a>
        <nav className="nav-links">
          <a href="#compare">Compare</a>
          <a href="#features">Features</a>
          <a href="#install">Install</a>
          <a href={DOCS}>Docs</a>
          <a href={REPO}>GitHub</a>
        </nav>
        <a className="btn btn-primary btn-sm" href={RELEASES}>
          Download
        </a>
      </div>
    </header>
  );
}
