import { GENAI } from "../site";

/**
 * The Gen AI tab, shown as it is. The marketing page is dark-only, so this
 * takes the dark screenshot; the fact sheet has both and picks in CSS.
 */
export default function GenAI() {
  const { shot, points } = GENAI;

  return (
    <>
      <figure className="shot">
        <img
          src={shot.dark}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
        />
      </figure>

      <div className="feature-grid">
        {points.map((point) => (
          <article className="feature" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
