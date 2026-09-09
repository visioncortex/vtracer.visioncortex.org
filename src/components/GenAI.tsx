import { GENAI } from "../site";

/**
 * The Gen AI lab, shown as it is. The marketing page is dark-only, so this
 * takes the dark screenshots; the fact sheet has both schemes and picks in CSS.
 *
 * The rounds crossfade in CSS rather than on a timer in here: no re-render, no
 * work when the tab is in the background, and it runs whether or not the page
 * has finished hydrating.
 */
export default function GenAI() {
  const { shot, points } = GENAI;

  return (
    <>
      <figure className="shot shot-stack">
        {shot.rounds.map((round, i) => (
          <img
            key={round.dark}
            src={round.dark}
            /* One description covers the pair, on the first image. The rest
               show the same window and would only be read out twice. */
            alt={i === 0 ? shot.alt : ""}
            aria-hidden={i === 0 ? undefined : true}
            width={shot.width}
            height={shot.height}
            loading="lazy"
          />
        ))}
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
