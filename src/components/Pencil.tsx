import LoopVideo from "./LoopVideo";
import { PENCIL } from "../site";

/** Pencil to vector: the demo up top, then what comes out of it. */
export default function Pencil() {
  const { hero, points } = PENCIL;

  return (
    <>
      <figure className="pencil-hero">
        <LoopVideo {...hero} />
      </figure>

      <div className="pencil-grid">
        {points.map((point, i) => {
          // Notes are numbered in order among the cards that carry one.
          const mark = points.slice(0, i + 1).filter((p) => p.note).length;
          return (
            <article className="showcase-item" key={point.title}>
              <div className="pencil-media">
                {point.image ? (
                  <img
                    src={point.image.src}
                    alt={point.image.alt}
                    width={point.image.width}
                    height={point.image.height}
                    loading="lazy"
                  />
                ) : (
                  point.video && <LoopVideo {...point.video} controls={false} />
                )}
              </div>
              <h3>{point.title}</h3>
              <p>
                {point.body}
                {point.note && <sup className="footnote-mark">{mark}</sup>}
              </p>
              {point.note && (
                <p className="footnote">
                  <sup>{mark}</sup> {point.note}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
