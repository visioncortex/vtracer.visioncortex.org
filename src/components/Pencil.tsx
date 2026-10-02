import LoopVideo from "./LoopVideo";
import { PENCIL } from "../site";
import { useCopy } from "../site-copy";

/** Pencil to vector: the demo up top, then what comes out of it. */
export default function Pencil() {
  const { hero, points } = PENCIL;
  const { pencil } = useCopy();

  return (
    <>
      <figure className="pencil-hero">
        <LoopVideo {...hero} label={pencil.heroLabel} />
      </figure>

      <div className="pencil-grid">
        {points.map((point, i) => {
          // Words by position from the copy; media from site.ts. Notes are
          // numbered in order among the cards that carry one.
          const text = pencil.points[i];
          const mark = pencil.points.slice(0, i + 1).filter((p) => p.note).length;
          return (
            <article className="showcase-item" key={point.image?.src ?? point.video?.src}>
              <div className="pencil-media">
                {point.image ? (
                  <img
                    src={point.image.src}
                    alt={text.media}
                    width={point.image.width}
                    height={point.image.height}
                    loading="lazy"
                  />
                ) : (
                  point.video && (
                    <LoopVideo {...point.video} label={text.media} controls={false} />
                  )
                )}
              </div>
              <h3>{text.title}</h3>
              <p>
                {text.body}
                {text.note && <sup className="footnote-mark">{mark}</sup>}
              </p>
              {text.note && (
                <p className="footnote">
                  <sup>{mark}</sup> {text.note}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
