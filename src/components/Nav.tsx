import { useEffect, useState } from "react";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const os = useOS();
  const download = useDownloads();

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
          <span className="brand-name">VTracer 2</span>
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#background">What&rsquo;s new</a>
          <a href="#open-source">VTracer 1</a>
        </nav>
        <a className="btn btn-primary btn-sm" href={download(os)}>
          Download
        </a>
      </div>
    </header>
  );
}
