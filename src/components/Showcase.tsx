import Wipe from "./Wipe";
import { SHOWCASE, SHOWCASE_ASPECT } from "../site";

export default function Showcase() {
  return (
    <div className="showcase">
      {SHOWCASE.map((item) => (
        <article className="showcase-item" key={item.id}>
          <Wipe
            leftSrc={item.original}
            rightSrc={item.vtracer}
            leftLabel="Before"
            rightLabel="VTracer 2"
            leftAlt={`${item.title}, before`}
            rightAlt={`${item.title}, traced by VTracer 2`}
            stageAspect={SHOWCASE_ASPECT}
            aspect={item.aspect}
            focus={item.focus}
            transparent={"transparent" in item && item.transparent}
            pixelatedLeft
          />
          <h3>{item.title}</h3>
          <p>{item.blurb}</p>
        </article>
      ))}
    </div>
  );
}
