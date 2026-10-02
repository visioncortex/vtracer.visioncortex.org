import { useCopy } from "../site-copy";

export default function Features() {
  const { features } = useCopy();
  return (
    <div className="feature-grid">
      {features.map((feature, i) => (
        <article className="feature" key={feature.title}>
          <p className="feature-num">{String(i + 1).padStart(2, "0")}</p>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </article>
      ))}
    </div>
  );
}
