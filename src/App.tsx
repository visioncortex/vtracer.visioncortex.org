import Download from "./components/Download";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Install from "./components/Install";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import TraceDemo from "./components/TraceDemo";
import { RELEASES, REPO } from "./site";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <section className="section" id="compare" style={{ borderTop: 0 }}>
          <div className="shell">
            <div className="section-head">
              <span className="section-num">01</span>
              <div>
                <h2 className="display section-title">Pixels in, curves out</h2>
                <p className="section-note">
                  Vector output holds its edge at any zoom, and describes the same artwork in a
                  fraction of the bytes.
                </p>
              </div>
            </div>
            <TraceDemo />
          </div>
        </section>

        <section className="section" id="features">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">02</span>
              <div>
                <h2 className="display section-title">
                  Built for <span className="accent">real</span> images
                </h2>
                <p className="section-note">
                  Originally written to trace gigapixel scans of historic blueprints. It handles
                  photographs and pixel art just as happily.
                </p>
              </div>
            </div>
            <Features />
          </div>
        </section>

        <section className="section" id="install">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">03</span>
              <div>
                <h2 className="display section-title">Wherever you work</h2>
                <p className="section-note">
                  One Rust engine, shipped as a desktop app, a command line tool, and a library for
                  Rust, Python and Node.
                </p>
              </div>
            </div>
            <Install />
          </div>
        </section>

        <section className="section" id="download">
          <div className="shell">
            <div className="section-head">
              <span className="section-num">04</span>
              <div>
                <h2 className="display section-title">Get the app</h2>
                <p className="section-note">
                  Free and open source, on every desktop platform.
                </p>
              </div>
            </div>
            <Download />
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <h2 className="display">
              Stop redrawing. <span className="accent">Start tracing.</span>
            </h2>
            <div className="hero-cta">
              <a className="btn btn-primary" href={RELEASES}>
                Download VTracer 2
              </a>
              <a className="btn btn-ghost" href={REPO}>
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
