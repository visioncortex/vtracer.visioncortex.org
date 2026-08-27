import Legal, { Contact } from "./Legal";
import { LEGAL, REPO, TRIAL } from "../site";

const TRACES = TRIAL.traces.toLocaleString("en-US");

export default function TermsOfService() {
  return (
    <Legal
      title="Terms of Service"
      lede={
        <p>
          These are the terms you agree to by downloading VTracer, creating an account, or using
          it. They are short, and they are meant to be read.
        </p>
      }
    >
      <section>
        <h2>Acceptance of these terms</h2>
        <p>
          By downloading, installing, creating an account for, or otherwise using the VTracer
          desktop application (the &ldquo;App&rdquo;) or this website (together, the &ldquo;Services&rdquo;), provided by{" "}
          {LEGAL.entity} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;), you agree to be bound by these Terms of Service (the
          &ldquo;Terms&rdquo;). If you do not agree to them, do not use the Services.
        </p>
      </section>

      <section>
        <h2>What VTracer is</h2>
        <p>
          VTracer is a desktop application that converts raster images into vector graphics, and it
          runs on your own machine. &ldquo;VTracer 2&rdquo; names its next-generation engine — the
          features a free trial or a paid licence switches on inside the App. These Terms govern
          the App whichever of its features you use.
        </p>
        <ul>
          <li>
            <b>Local processing.</b> Tracing happens on your device, using a model bundled with the
            App. Your source images and the SVGs the App produces are not uploaded to us.
          </li>
          <li>
            <b>What does reach us.</b> Your account details, trial usage counts and licence status,
            plus coarse product analytics. The{" "}
            <a href="/privacy-policy">Privacy Policy</a> sets out all of it.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your account</h2>
        <p>
          Some features, including the free trial and any licence you buy, require an account. You
          sign in with Google, and the address on that Google account is the address your entitlement
          is attached to.
        </p>
        <ul>
          <li>
            The email address you sign in with must be valid, current and one you control. A licence
            is granted to that account and delivered to that address; if we cannot reach you there,
            we cannot deliver or reissue it.
          </li>
          <li>
            You are responsible for what happens under your account, and for keeping the Google
            account you sign in with secure.
          </li>
          <li>
            One person, one account. Do not create accounts to obtain trials you have already used.
          </li>
        </ul>
      </section>

      <section>
        <h2>The free trial</h2>
        <p>
          The App is free to download, and VTracer 2 is enabled from inside it as a trial with no
          card required. The trial ends after {TRACES} traces or {TRIAL.days} days from activation,
          whichever comes first.
        </p>
        <p>
          The trial exists so you can judge the App on your own artwork, on your own machine,
          before paying anything — and we encourage you to do exactly that. A licence buys the App
          you evaluated, not a promise that it will do more.
        </p>
        <ul>
          <li>
            To enforce that limit the App reports trace counts and trial status to us. Interfering
            with, blocking or falsifying that reporting is a breach of these Terms.
          </li>
          <li>
            The trial is offered as-is and per account. We may change the limits for future trials,
            and we may end or withhold a trial where we reasonably believe it is being abused.
          </li>
          <li>
            When the trial ends, the VTracer 2 features switch off; the rest of the App keeps
            working. Anything you have already traced remains yours, on your disk, untouched.
          </li>
        </ul>
      </section>

      <section>
        <h2>Licences</h2>
        <p>
          Paid licences are not yet available. When they are, this is how they work, and buying one
          means accepting these Terms as they read at that time.
        </p>
        <ul>
          <li>
            <b>Perpetual.</b> A purchased licence does not expire and does not need renewing. Once
            activated it requires no metering and no periodic check-in to keep working.
          </li>
          <li>
            <b>Device-bound.</b> Activation issues a licence certificate bound to the device you
            activate it on. It is a licence to use the App on that device, not a transfer of
            ownership, and it may not be resold, sublicensed or shared.
          </li>
          <li>
            <b>Tied to your account.</b> The grant belongs to the account and email address you
            bought it with. That is how we identify you if you need it reissued.
          </li>
          <li>
            <b>Moving it.</b> If your device is replaced, rebuilt or lost, contact us and we will
            help you re-activate on a replacement. We may limit how often this is done, to keep a
            single licence from covering an office.
          </li>
          <li>
            <b>What a licence covers.</b> The version line you bought into. We are not obliged to
            provide upgrades, and a future major version may be a separate purchase.
          </li>
        </ul>
      </section>

      <section>
        <h2>Payment</h2>
        <p>
          Payment for licences is handled by a third-party payment processor. We do not receive or
          store raw card details. Prices are stated at the point of purchase and exclude taxes unless
          we say otherwise; you are responsible for any tax that applies where you are. Refunds, where
          offered, are as stated at the point of purchase and as required by the law that applies to
          you.
        </p>
      </section>

      <section>
        <h2>Your artwork and what the App makes from it</h2>
        <p>
          As between you and us, your source images are yours, and so is every SVG the App produces
          from them. We claim no ownership of, and no licence over, either. We do not use them for
          anything, including training, because we never receive them.
        </p>
        <p>
          Tracing does not launder rights. A trace is a derivative of its source, not a new
          original: whatever rights exist in the source image — someone else&rsquo;s copyright, a
          trademark, a licence condition — survive into the SVG, and passing an image through the
          App gives you no rights in it that you did not already have. We make no promise that any
          output is free of third-party rights, and we accept no responsibility for establishing
          that it is. That depends entirely on what you put in.
        </p>
        <p>
          The App is a tool, and you alone are responsible for what you put through it and for what
          you do with the result. Do not use the Services on material you have no right to
          reproduce. If we suffer a loss because you traced material you had no right to use, you
          agree to compensate us for it.
        </p>
      </section>

      <section>
        <h2>Our intellectual property</h2>
        <p>
          The App, its models and weights, its interface and visual design, the VTracer and Vision
          Cortex names and logos, and the software behind the Services are the property of{" "}
          {LEGAL.entity} and are protected by copyright, trademark and other laws. These Terms grant
          you a limited, non-exclusive, non-transferable, revocable licence to use the App, and
          nothing more.
        </p>
        <p>
          The sample artwork bundled with the App is there to demonstrate tracing, and for no other
          purpose. It is ours or licensed to us for that demonstration; you receive no rights in
          it, and neither the samples nor anything traced from them may be used in your own work,
          published or redistributed.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Reverse engineer, decompile or disassemble the App, or attempt to extract its source
            code, model weights or licence keys, except where that restriction is unenforceable
            where you live.
          </li>
          <li>
            Circumvent, disable or tamper with licence activation, trial metering or any other
            technical measure in the App.
          </li>
          <li>Share, resell or publish a licence certificate, or use one you were not granted.</li>
          <li>
            Interfere with or disrupt the Services or the infrastructure behind them, or attempt to
            reach accounts or systems that are not yours.
          </li>
          <li>Use the Services for anything unlawful, fraudulent or infringing.</li>
        </ul>
      </section>

      <section>
        <h2>VTracer 1 is separate, and stays open</h2>
        <p>
          The original VTracer 1 engine and its libraries remain open source under the MIT licence
          and are <a href={REPO}>available on GitHub</a>. Nothing in these Terms restricts your
          rights under that licence, and these Terms do not govern your use of them. The desktop
          App and the VTracer 2 engine are separate, proprietary software; the MIT licence does not
          extend to them.
        </p>
      </section>

      <section>
        <h2>Availability and changes to the App</h2>
        <p>
          We may change, add or remove features, and we may suspend parts of the Services for
          maintenance or for reasons outside our control. We will not deliberately disable a
          perpetual licence you have already activated and paid for, except where these Terms allow
          us to terminate it.
        </p>
      </section>

      <section>
        <h2>Support, and its limits</h2>
        <p>
          Because your artwork never reaches us, we cannot see, reproduce or diagnose what the App
          did with a particular image. Support is provided on a reasonable-efforts basis, and some
          problems we will only be able to fix in a future version, or not at all.
        </p>
        <p>
          For the same reason, checking a trace is yours to do. Inspect the output before you rely
          on it — especially before it goes to print, to a client, or into production. The App also
          reads and writes files on your device; keep your own backups of work that matters.
        </p>
      </section>

      <section>
        <h2>Disclaimer of warranties</h2>
        <p className="legal-caps">
          THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS
          WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED OR ERROR-FREE, OR
          THAT ANY PARTICULAR TRACE WILL MEET YOUR REQUIREMENTS.
        </p>
        <p>
          If you use the Services as a consumer, nothing in this clause or these Terms takes away
          rights that the law of your country grants you and does not allow to be waived — in the
          United Kingdom, your statutory rights under the Consumer Rights Act 2015.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p className="legal-caps">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {LEGAL.entity.toUpperCase()} AND ITS
          AFFILIATES, OFFICERS, EMPLOYEES AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS OF
          PROFITS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE
          SERVICES. OUR TOTAL LIABILITY FOR ALL CLAIMS TAKEN TOGETHER SHALL NOT EXCEED THE AMOUNT
          YOU PAID US FOR THE LICENCE OR SERVICE THE CLAIM ARISES FROM, OR US$50 IF YOU HAVE PAID
          US NOTHING.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot lawfully be excluded — including
          for death or personal injury caused by negligence, or for fraud — or limits a
          consumer&rsquo;s statutory rights.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          You may stop using the Services and close your account at any time. We may suspend or
          terminate your account, your trial, or a licence if you materially breach these Terms —
          in particular by tampering with licence enforcement or by sharing a licence. Where the
          breach is capable of being fixed we will tell you and give you a reasonable chance to fix
          it first.
        </p>
        <p>
          The App stays on your disk either way; what ends is your right to use it. Closing your
          account ends the licence grant attached to it.
        </p>
      </section>

      <section>
        <h2>Changes to these Terms</h2>
        <p>
          We may modify these Terms. We will move the &ldquo;last updated&rdquo; date at the top of
          this page, and for material changes we will also notify you in the App. Continuing to use
          the Services after a change means you accept the new Terms.
        </p>
      </section>

      <section>
        <h2>Governing law and contact</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of {LEGAL.law},
          without regard to conflict of law provisions, and you and we submit to the exclusive
          jurisdiction of {LEGAL.courts}. If you are a consumer, this does not deprive you of the
          protection of the mandatory consumer law of the country you live in.
        </p>
        <p>For questions about these Terms:</p>
        <Contact />
      </section>
    </Legal>
  );
}
