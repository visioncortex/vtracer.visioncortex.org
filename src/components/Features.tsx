import { FEATURES } from "../site";

export default function Features() {
  return (
    <div className="feature-grid">
      {FEATURES.map((feature, i) => (
        <article className="feature" key={feature.title}>
          <p className="feature-num">{String(i + 1).padStart(2, "0")}</p>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </article>
      ))}
    </div>
  );
}
