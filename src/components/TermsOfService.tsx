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
          it. They are written in plain language, and they are meant to be read.
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
            <b>Local processing.</b> Tracing happens on your device, using a model stored on it.
            Your source images and the SVGs the App produces are not uploaded to us.
          </li>
          <li>
            <b>What does reach us.</b> Your account details, licence activations and status
            checks, plus coarse product analytics. The{" "}
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
            The email address you sign in with must be valid, current and one you control. A
            licence is granted to your account, and you collect and manage it by signing in — on
            our website or in the App. The address is how a purchase is matched to your account,
            and how we identify you for support and account recovery.
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
          credit card required. The trial ends after {TRACES} traces or {TRIAL.days} days from activation,
          whichever comes first.
        </p>
        <p>
          The trial exists so you can judge the App on your own artwork, on your own machine,
          before paying anything — and we encourage you to do exactly that. A licence buys the App
          you evaluated, not a promise that it will do more.
        </p>
        <ul>
          <li>
            The trial runs on a time-limited licence certificate issued to your account and device.
            Its limits are conditions of the trial, however and whenever we enforce them, and
            interfering with, blocking or falsifying enforcement is a breach of these Terms.
          </li>
          <li>
            One trial per person and per device. A device that has used a trial cannot start
            another, even under a different account.
          </li>
          <li>
            The trial is offered as-is. We may change the limits for future trials, and we may end
            or withhold a trial where we reasonably believe it is being abused.
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
          Paid licences are not yet available. When they are, this is how the Pro licence works,
          and buying one means accepting these Terms as they read at that time.
        </p>
        <ul>
          <li>
            <b>Perpetual.</b> A Pro licence does not expire and does not need renewing. Once a
            device is activated and the release installed, it keeps working indefinitely — with no
            metering, and no internet connection required to keep working. The{" "}
            <a href="/privacy-policy">Privacy Policy</a> describes the limited licensing traffic
            the App exchanges with our service when it is reachable.
          </li>
          <li>
            <b>A model line.</b> A licence covers the model line you bought — every release in that
            line, including model, engine and interface updates. A future model line is a new
            product, and moving to it may be a separate purchase.
          </li>
          <li>
            <b>Activation allocations.</b> A Pro licence includes the number of active activation
            allocations stated at purchase — currently two, meaning up to two of your devices
            activated at the same time. Activation requires
            your account and an internet connection, and issues a certificate bound to that device.
            A licence is for your own devices; it is not a pool of seats for a team.
          </li>
          <li>
            <b>Moving devices.</b> Deactivate a device from inside the App, or release it from your
            account if the device is lost or will not start, and the freed allocation can activate
            a replacement. Releasing a device ends its licence: using that installation afterwards
            is outside what you have licensed, it receives no updates or model downloads, and we
            may disable it when it next contacts our service. We may apply reasonable limits where
            releases and reactivations look like sharing rather than replacement.
          </li>
          <li>
            <b>Tied to your account.</b> A purchase is claimed to your account on our website, and
            the email address used at checkout currently must match your account email. The licence
            then belongs to that account. It may not be resold, sublicensed, shared or transferred
            to another account.
          </li>
          <li>
            <b>What perpetual means — and what it does not.</b> Perpetual is a promise about what
            you already have: an activated device with its release installed keeps working,
            offline, indefinitely. It is not a promise of perpetual services around it — signing
            in, claiming a purchase, activating new devices and downloading releases all require
            our service to be running. If we ever wind the service down, we will give advance
            notice and keep downloads available through the published shutdown date, and what you
            have installed keeps working after it.
          </li>
          <li>
            <b>Refunds and reversals.</b> If your purchase is refunded, or its payment is reversed
            or charged back, the licence ends and its activations are cancelled.
          </li>
        </ul>
      </section>

      <section>
        <h2>For a person, at a desktop</h2>
        <p>
          The App is licensed for interactive use, by a person, on a desktop computer. That is the
          whole of what a licence buys, so the boundary is worth spelling out. You may not:
        </p>
        <ul>
          <li>
            Automate the App — drive it with scripts, macros or UI-automation tools, call into its
            internal interfaces or processes, or feed it work from another program.
          </li>
          <li>
            Run it unattended or headless: on a server, in CI, in a container, or as a step in a
            pipeline or batch process.
          </li>
          <li>
            Run it in a virtual machine. The App may detect virtualized, containerized and headless
            environments and refuse to run; that refusal is not a defect.
          </li>
          <li>
            Offer the App&rsquo;s functionality to others as a product or service — hosting it
            behind a website, API or bot, reselling access to it, or building a subscription or
            per-use tracing service on top of it.
          </li>
        </ul>
        <p>
          The other side of that line, to be equally clear: using the App yourself and selling or
          publishing what you make with it — including work you do for clients — is exactly what it
          is for. If your workflow needs automation, servers or an API, that is a different
          product: write to us, or build on the open-source VTracer 1 libraries, which these Terms
          do not restrict.
        </p>
      </section>

      <section>
        <h2>Payment</h2>
        <p>
          Purchases are handled by a merchant of record, identified at checkout, which is the
          seller for the transaction under its own terms of sale and handles payment details
          directly; we never receive or store raw card details. These Terms govern the licence the
          purchase grants. Prices are stated at checkout and exclude taxes unless we say otherwise;
          you are responsible for any tax that applies where you are. Refunds, where offered, are
          as stated at the point of purchase and as required by the law that applies to you.
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
            Circumvent, disable or tamper with licence activation, trial enforcement or any other
            technical measure in the App.
          </li>
          <li>
            Extract, copy, back up or replay the App&rsquo;s licence credentials outside its own
            activation and deactivation flows, or misrepresent the device identity they are bound
            to.
          </li>
          <li>
            Copy, publish or redistribute the App, the VTracer 2 engine, its models, or any other
            component the App downloads, or make any of them available to others outside our own
            install and update flows.
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
          in particular by tampering with licence enforcement or by sharing a licence. Where a
          breach looks inadvertent and can be fixed, we will normally tell you and give you a
          reasonable chance to fix it; deliberate circumvention or sharing is not in that
          category.
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
        <h2>General</h2>
        <p>
          If we do not enforce a part of these Terms, or do not enforce it for a time, that is not
          a waiver of it — we may enforce it later. If a part of these Terms is found invalid or
          unenforceable, that part is treated as trimmed to the minimum extent necessary, and the
          rest continues in force.
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
