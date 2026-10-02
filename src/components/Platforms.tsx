import { PLATFORMS } from "../site";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";
import { useCopy } from "../site-copy";

export default function Platforms() {
  const os = useOS();
  const download = useDownloads();
  const { platforms } = useCopy();

  return (
    <ul className="platform-strip">
      {PLATFORMS.filter((p) => p.listed).map((p) => (
        <li key={p.os}>
          <a className={p.os === os ? "yours" : undefined} href={download(p.os)}>
            <span className="platform-os">{p.os}</span>
            <span className="platform-meta">
              {p.os === os ? platforms.yours : platforms.meta[p.os]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
