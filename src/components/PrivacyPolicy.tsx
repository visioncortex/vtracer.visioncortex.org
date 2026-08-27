import Legal, { Contact } from "./Legal";
import { LEGAL, TRIAL } from "../site";

const TRACES = TRIAL.traces.toLocaleString("en-US");

export default function PrivacyPolicy() {
  return (
    <Legal
      title="Privacy Policy"
      lede={
        <p>
          VTracer traces your artwork on your own computer. The images you open and the SVGs it
          produces are never uploaded to us — there is no server in that loop at all. What we do
          collect is small, and this page describes all of it.
        </p>
      }
    >
      <section>
        <h2>Who we are</h2>
        <p>
          The VTracer desktop application (the &ldquo;App&rdquo;) and this website are published
          by {LEGAL.entity} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a company
          registered in {LEGAL.registeredIn}, trading as Vision Cortex. We are the data controller
          for the information described here. This policy explains what personal information we
          handle, why, and what you can ask us to do with it. It applies to the App and to{" "}
          <span className="legal-mono">vtracer.visioncortex.org</span>.
        </p>
      </section>

      <section>
        <h2>Your artwork never leaves your device</h2>
        <p>
          Tracing runs entirely on your machine, using a model that ships inside the App. We do not
          receive, store or process your source images, your traced SVGs, your file names, or
          anything else about the contents of your disk. None of the collection described below
          involves your artwork.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>Four categories.</p>

        <h3>Account information</h3>
        <p>
          When you sign in with Google, Google passes the App your email address, your name, your
          profile picture and your Google account identifier. We store these to create your account
          and to attach your trial and any licence you buy to it. We never see your Google password,
          and we cannot read anything else in your Google account. Your email address has to be one
          you can actually receive mail at, because it is where a licence is delivered and how we
          re-issue one.
        </p>
        <p>
          Our use of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements.
        </p>

        <h3>Trial and licence usage</h3>
        <p>
          The free trial ends after {TRACES} traces or {TRIAL.days} days, whichever comes first. To
          make that limit mean anything, the App reports to us a count of completed traces and when
          they happened, when your trial started, an identifier for the device the App is installed
          on, the App version and your operating system. This is the minimum needed to enforce the
          trial, and it is the only reason we collect it.
        </p>

        <h3>Product analytics</h3>
        <p>
          Coarse counters about how the App is used — how many traces are run, which features and
          parameters are reached for, and errors the App runs into. These are aggregate numbers that
          tell us which parts of the product are worth the work. They are never joined to your
          artwork, because we do not have your artwork.
        </p>

        <h3>This website</h3>
        <p>
          The site is static and sets no advertising or tracking cookies. Our host records ordinary
          server logs, including IP addresses, and web fonts are loaded from Google&rsquo;s servers,
          which means Google sees the IP address that requests them.
        </p>
      </section>

      <section>
        <h2>What we never collect</h2>
        <ul>
          <li>Your source images, your traced output, or any thumbnail or derivative of either.</li>
          <li>File names, folder paths, or anything else about the contents of your disk.</li>
          <li>Anything from your Google account beyond the basic profile fields listed above.</li>
        </ul>
        <p>
          We do not sell personal information, we do not share it with advertisers, and we do not
          use it — or anything you trace — to train models.
        </p>
      </section>

      <section>
        <h2>Why we are allowed to process it</h2>
        <ul>
          <li>
            <b>To perform our contract with you:</b> creating your account, running and enforcing
            the free trial, issuing and honouring a licence, and supporting you.
          </li>
          <li>
            <b>Our legitimate interests:</b> understanding how the App is used so we can improve it,
            and detecting abuse of the trial or of licences.
          </li>
          <li>
            <b>Legal obligation:</b> keeping the transaction records that tax and accounting rules
            require of us.
          </li>
        </ul>
      </section>

      <section>
        <h2>After you buy, the metering stops</h2>
        <p>
          A paid licence is perpetual and is activated against the device you install it on. Once it
          is activated, the App does not need to meter your usage or check in to keep working — the
          counting described above exists to enforce the free trial, and a paid licence has nothing
          to count.
        </p>
      </section>

      <section>
        <h2>Who else sees it</h2>
        <p>
          Service providers who process data on our behalf and under contract — hosting, our
          analytics infrastructure, and, once paid licences are available, a payment processor. A
          payment processor handles card details directly; we receive the fact of a completed
          purchase and the licence record, never your card number.
        </p>
        <p>
          Beyond that we disclose personal information only where we are legally required to, or
          where it is transferred as part of a merger or acquisition — in which case this policy
          continues to apply to it.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>
            <b>Account information:</b> for as long as your account exists, and deleted within 30
            days of you closing it.
          </li>
          <li>
            <b>Trial counters:</b> for the length of the trial and a short period after it, so an
            expired trial cannot simply be restarted.
          </li>
          <li>
            <b>Licence records:</b> for as long as the licence is valid. A perpetual licence means
            we keep the record indefinitely, because otherwise we cannot honour or reissue it.
          </li>
          <li>
            <b>Purchase records:</b> for the period tax and accounting law requires.
          </li>
          <li>
            <b>Analytics:</b> retained in aggregate form, which does not identify you.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us for a copy of the personal information we hold about you, ask us to correct
          it, ask us to delete it, ask for it in a portable form, or object to our processing it.
          Email <a href={`mailto:${LEGAL.contact}`}>{LEGAL.contact}</a> and we will respond within
          one month. You can also disconnect the App from your Google account at any time from{" "}
          <a href="https://myaccount.google.com/permissions">Google account permissions</a>.
        </p>
        <p>
          One thing to know before you ask: your licence is tied to your account. Deleting the
          account deletes the licence grant with it, and we cannot restore it afterwards.
        </p>
        <p>
          Depending on where you live you may also have the right to complain to a data protection
          authority — in the UK, the Information Commissioner&rsquo;s Office.
        </p>
      </section>

      <section>
        <h2>Transfers, security, and children</h2>
        <p>
          We and our service providers may process your information in countries other than the one
          you live in. Where that happens we rely on the safeguards those providers offer for
          international transfers.
        </p>
        <p>
          Data in transit is encrypted, and access to account and licence records is limited to
          people who need it to run the service. No system is perfectly secure, and we do not claim
          otherwise.
        </p>
        <p>
          The App is not directed at children under 13, and we do not knowingly collect their
          personal information. If you believe a child has given us any, write to us and we will
          delete it.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy. When we do, we will move the &ldquo;last updated&rdquo; date at
          the top of this page, and for material changes we will also tell you in the App. Continuing
          to use the App after a change means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>For anything in this policy, including a request about your data, write to us:</p>
        <Contact />
      </section>
    </Legal>
  );
}
