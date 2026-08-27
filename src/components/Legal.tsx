import type { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { LEGAL } from "../site";

/**
 * Chrome shared by the two legal documents. Section numbering is a CSS
 * counter on `.legal-body` rather than typed into each heading, so inserting a
 * clause never leaves the rest of the document misnumbered.
 */
export default function Legal({
  title,
  lede,
  children,
}: {
  title: string;
  lede: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="legal">
        <div className="shell legal-shell">
          <header className="legal-head">
            <p className="eyebrow">VTracer 2</p>
            <h1 className="display legal-title">{title}</h1>
            <p className="legal-updated">Last updated {LEGAL.updated}</p>
            <div className="legal-lede">{lede}</div>
          </header>
          <article className="legal-body">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** The contact block both documents close on. */
export function Contact() {
  return (
    <address className="legal-contact">
      {LEGAL.entity}
      <br />
      <a href={`mailto:${LEGAL.contact}`}>{LEGAL.contact}</a>
      {LEGAL.address ? (
        <>
          <br />
          {LEGAL.address}
        </>
      ) : null}
      {LEGAL.companyNumber ? (
        <>
          <br />
          Registered in {LEGAL.registeredIn}, company number {LEGAL.companyNumber}
        </>
      ) : null}
    </address>
  );
}
