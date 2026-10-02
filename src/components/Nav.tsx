import { useEffect, useState } from "react";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";
import { useCopy } from "../site-copy";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const os = useOS();
  const download = useDownloads();
  const copy = useCopy();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={stuck ? "nav stuck" : "nav"}>
      <div className="shell nav-inner">
        <a className="brand" href={copy.home}>
          <span className="brand-name">VTracer 2</span>
        </a>
        {/* Absolute, so the same nav works from the legal pages, and rooted
            at this language's landing page. */}
        <nav className="nav-links">
          <a href={`${copy.home}#features`}>{copy.nav.features}</a>
          <a href={`${copy.home}#background`}>{copy.nav.whatsNew}</a>
          <a href={`${copy.home}#open-source`}>VTracer 1</a>
        </nav>
        <a className="btn btn-primary btn-sm" href={download(os)}>
          {copy.nav.download}
        </a>
      </div>
    </header>
  );
}
