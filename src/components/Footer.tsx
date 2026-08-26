import { DOCS, ORG, REPO } from "../site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} Vision Cortex</span>
        <span className="footer-note">
          The app is free. VTracer 2 is a paid add-in. VTracer 1 is MIT-licensed.
        </span>
        <nav className="footer-links">
          <a href="#download">Download</a>
          <a href="#open-source">VTracer 1</a>
          <a href={REPO}>GitHub</a>
          <a href={DOCS}>Algorithm docs</a>
          <a href={ORG}>Vision Cortex</a>
        </nav>
      </div>
    </footer>
  );
}
