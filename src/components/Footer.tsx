import { DOCS, ORG, REPO } from "../site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} Vision Cortex</span>
        <span>MIT / Apache-2.0</span>
        <nav className="footer-links">
          <a href={REPO}>GitHub</a>
          <a href={DOCS}>Algorithm docs</a>
          <a href="https://crates.io/crates/vtracer">crates.io</a>
          <a href="https://pypi.org/project/vtracer/">PyPI</a>
          <a href="https://www.npmjs.com/package/@visioncortex/vtracer">npm</a>
          <a href={ORG}>Vision Cortex</a>
        </nav>
      </div>
    </footer>
  );
}
