import { LINUX_PACKAGES, PLATFORMS } from "../site";
import { useDownloads } from "../useDownloads";
import { useLinuxPackage, useOS } from "../useOS";
import { useCopy } from "../site-copy";

export default function Platforms() {
  const os = useOS();
  const linuxPkg = useLinuxPackage();
  const download = useDownloads();
  const { platforms } = useCopy();

  return (
    <ul className="platform-strip">
      {PLATFORMS.filter((p) => p.listed).map((p) => {
        const yours = p.os === os ? "platform yours" : "platform";

        // One card, two downloads: the card is a box and each package a link,
        // so nobody on Fedora is handed a .deb.
        if (p.os === "Linux") {
          return (
            <li key={p.os}>
              <div className={yours}>
                <span className="platform-os">{p.os}</span>
                <span className="platform-packages">
                  {LINUX_PACKAGES.map((pkg) => (
                    <a
                      key={pkg}
                      className={
                        pkg === linuxPkg ? "platform-meta platform-package mine" : "platform-meta platform-package"
                      }
                      href={download("Linux", pkg)}
                    >
                      <span className="platform-ext">.{pkg}</span>
                      {platforms.linux[pkg]}
                    </a>
                  ))}
                </span>
              </div>
            </li>
          );
        }

        return (
          <li key={p.os}>
            <a className={yours} href={download(p.os)}>
              <span className="platform-os">{p.os}</span>
              <span className="platform-meta">{p.os === os ? platforms.yours : platforms.meta[p.os]}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
