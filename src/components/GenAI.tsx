import { GENAI } from "../site";
import { useCopy } from "../site-copy";

/**
 * The Gen AI lab, shown in the reader's own language: one screenshot of the
 * app running in it. The marketing page is dark-only, so this takes the dark
 * one; the fact sheet has both schemes and picks in CSS.
 */
export default function GenAI() {
  const { shot } = GENAI;
  const { lang, genai } = useCopy();

  return (
    <>
      <figure className="shot">
        <img
          src={shot.images[lang].dark}
          alt={genai.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
        />
      </figure>

      <div className="feature-grid">
        {genai.points.map((point) => (
          <article className="feature" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
