import Showcase from "./components/Showcase";
import StarButton from "./components/StarButton";
import Features from "./components/Features";
import Footer from "./components/Footer";
import GenAI from "./components/GenAI";
import Hero from "./components/Hero";
import Install from "./components/Install";
import Nav from "./components/Nav";
import Pencil from "./components/Pencil";
import Platforms from "./components/Platforms";
import Accented from "./components/Accented";
import { REPO } from "./site";
import { useCopy } from "./site-copy";
import { useDownloads } from "./useDownloads";
import { useOS } from "./useOS";

export default function App() {
  const os = useOS();
  const download = useDownloads();
  const { sections, pencil, shotAlt, scarcity, cta } = useCopy();

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section className="section" id="features" style={{ borderTop: 0 }}>
          <div className="shell">
            <div className="section-head">
              <span className="section-num">01</span>
              <div>
                <h2 className="display section-title">
                  <Accented parts={sections.design.title} />
                </h2>
                <p className="section-note">{sections.design.note}</p>
              </div>
            </div>
            <Features />
          </div>
        </section>

        <section className="section" id="background">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">02</span>
              <div>
                <h2 className="display section-title">{sections.whatsNew.title}</h2>
                <p className="section-note">{sections.whatsNew.note}</p>
              </div>
            </div>
            <Showcase />
          </div>
        </section>

        <section className="section" id="gen-ai">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">03</span>
              <div>
                <h2 className="display section-title">
                  <Accented parts={sections.prompt.title} />
                </h2>
                <p className="section-note">{sections.prompt.note}</p>
              </div>
            </div>
            <GenAI />
          </div>
        </section>

        <section className="section" id="pencil">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">04</span>
              <div>
                <h2 className="display section-title">
                  <Accented parts={sections.pencil.title} />
                </h2>
                <p className="section-note">{pencil.intro}</p>
              </div>
            </div>
            <Pencil />
          </div>
        </section>

        <section className="section" id="download">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">05</span>
              <div>
                <h2 className="display section-title">
                  <Accented parts={sections.download.title} />
                </h2>
                <p className="section-note">{sections.download.note}</p>
              </div>
            </div>
            <figure className="shot">
              <img
                src="/vtracer2-app-dark.png"
                alt={shotAlt}
                width={1552}
                height={922}
              />
            </figure>

            <p className="scarcity">
              <span className="scarcity-dot" aria-hidden="true" />
              <span>
                <b>{scarcity.strong}</b> {scarcity.rest}
              </span>
            </p>
            <Platforms />
          </div>
        </section>

        <section className="section" id="open-source">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">06</span>
              <div>
                <h2 className="display section-title">
                  <Accented parts={sections.open.title} />
                </h2>
                <p className="section-note">{sections.open.note}</p>
                <StarButton />
              </div>
            </div>
            <Install />
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <h2 className="display">
              <Accented parts={cta.title} />
            </h2>
            <div className="hero-cta">
              <a className="btn btn-primary" href={download(os)}>
                {cta.download}
              </a>
              <a className="btn btn-ghost" href={REPO}>
                {cta.github}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
