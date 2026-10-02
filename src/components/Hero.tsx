import Comparator from "./Comparator";
import { PLATFORMS } from "../site";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";
import Accented from "./Accented";
import { useCopy } from "../site-copy";

export default function Hero() {
  const os = useOS();
  const download = useDownloads();
  const others = PLATFORMS.filter((p) => p.listed && p.os !== os);
  const { hero } = useCopy();

  return (
    <section className="hero">
      <div className="shell">
        <h1 className="display hero-title">
          <Accented parts={hero.title} />
        </h1>

        <p className="hero-sub">
          <strong>{hero.subStrong}</strong> {hero.sub}
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary" href={download(os)}>
            {os ? hero.downloadFor(os) : hero.downloadApp}
          </a>
          <a className="btn btn-ghost" href="#features">
            {hero.seeWhat}
          </a>
        </div>

        <p className="hero-meta">
          {hero.free} ·{" "}
          {os ? (
            <>
              {hero.alsoBefore}
              {others.map((p, i) => (
                <span key={p.os}>
                  {i > 0 && hero.and}
                  <a href={download(p.os)}>{p.os}</a>
                </span>
              ))}
              {hero.alsoAfter}
            </>
          ) : (
            hero.allPlatforms
          )}{" "}
          · {hero.onDevice}
        </p>

        <Comparator />
      </div>
    </section>
  );
}
