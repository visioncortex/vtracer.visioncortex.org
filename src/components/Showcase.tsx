import Wipe from "./Wipe";
import { SHOWCASE, SHOWCASE_ASPECT } from "../site";
import { useCopy } from "../site-copy";

export default function Showcase() {
  const copy = useCopy();
  return (
    <div className="showcase">
      {SHOWCASE.map((item, i) => (
        // Words by position from the copy; media from site.ts.
        <article className="showcase-item" key={item.id}>
          <Wipe
            leftSrc={item.original}
            rightSrc={item.vtracer}
            leftLabel={copy.source}
            rightLabel="VTracer 2"
            leftAlt={copy.sourceAlt(copy.showcase[i].title)}
            rightAlt={copy.tracedAlt(copy.showcase[i].title)}
            stageAspect={SHOWCASE_ASPECT}
            aspect={item.aspect}
            focus={item.focus}
            transparent={"transparent" in item && item.transparent}
            pixelatedLeft
          />
          <h3>{copy.showcase[i].title}</h3>
          <p>{copy.showcase[i].blurb}</p>
        </article>
      ))}
    </div>
  );
}
