import Showcase from "./components/Showcase";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Install from "./components/Install";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import Platforms from "./components/Platforms";
import { REPO } from "./site";
import { useDownloads } from "./useDownloads";
import { useOS } from "./useOS";

export default function App() {
  const os = useOS();
  const download = useDownloads();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <section className="section" id="features" style={{ borderTop: 0 }}>
          <div className="shell">
            <div className="section-head">
              <span className="section-num">01</span>
              <div>
                <h2 className="display section-title">
                  Built for <span className="accent">design</span> work
                </h2>
                <p className="section-note">
                  Logos, clip art, illustration, brand assets — the artwork designers actually put
                  through a vectorizer, handled the way they need it handled.
                </p>
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
                <h2 className="display section-title">New in VTracer 2</h2>
                <p className="section-note">
                  Three things the old engine could not do. Drag any of them — the right-hand side of
                  each is the real SVG.
                </p>
              </div>
            </div>
            <Showcase />
          </div>
        </section>

        <section className="section" id="download">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">03</span>
              <div>
                <h2 className="display section-title">
                  The app is <span className="accent">free</span>. VTracer 2 is the add‑in.
                </h2>
                <p className="section-note">
                  Download the app and it is yours, no strings. VTracer 2 switches on from inside it
                  — and while we tune the engine we are handing trial activations to a limited number
                  of designers at a time.
                </p>
              </div>
            </div>
            <Platforms />
          </div>
        </section>

        <section className="section" id="open-source">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">04</span>
              <div>
                <h2 className="display section-title">
                  VTracer 1 stays <span className="accent">open</span>. Forever.
                </h2>
                <p className="section-note">
                  The original engine is MIT-licensed, recently revamped, and free to use in anything
                  you build. That is not changing.
                </p>
              </div>
            </div>
            <Install />
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <h2 className="display">
              Stop redrawing. <span className="accent">Start tracing.</span>
            </h2>
            <div className="hero-cta">
              <a className="btn btn-primary" href={download(os)}>
                Download VTracer
              </a>
              <a className="btn btn-ghost" href={REPO}>
                VTracer 1 on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
