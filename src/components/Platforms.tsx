import { PLATFORMS } from "../site";
import { useDownloads } from "../useDownloads";
import { useOS } from "../useOS";

export default function Platforms() {
  const os = useOS();
  const download = useDownloads();

  return (
    <ul className="platform-strip">
      {PLATFORMS.map((p) => (
        <li key={p.os}>
          <a className={p.os === os ? "yours" : undefined} href={download(p.os)}>
            <span className="platform-os">{p.os}</span>
            <span className="platform-meta">{p.os === os ? "Your platform" : p.meta}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
