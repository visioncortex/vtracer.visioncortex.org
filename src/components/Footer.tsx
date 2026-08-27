import { ORG } from "../site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>
          © {new Date().getFullYear()} <a href={ORG}>Vision Cortex</a>
        </span>
      </div>
    </footer>
  );
}
