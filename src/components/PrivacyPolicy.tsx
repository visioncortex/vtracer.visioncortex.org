import Legal, { Contact } from "./Legal";
import { LEGAL } from "../site";

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
          Tracing runs entirely on your machine, using a model stored on your device. We do not
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
          and we cannot read anything else in your Google account. Your email address matters
          because it is how a purchase is matched to your account, and how we identify you for
          support and account recovery — a licence itself is delivered through your account, not by
          email.
        </p>
        <p>
          Our use of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements.
        </p>

        <h3>Licensing</h3>
        <p>
          Activating a trial or a paid licence sends us an identifier for your device — a one-way
          hash derived from platform identifiers, not the identifiers themselves — together with
          the App version, your operating system, and the name you give the device so you can
          recognise it in your account. The trial&rsquo;s start and expiry dates are fixed inside
          the certificate this issues.
        </p>
        <p>
          The App downloads its models and updates from our service, authorised by your trial or
          licence. Those requests show us which release was fetched and the usual request metadata,
          and — like everything here — nothing about your artwork.
        </p>
        <p>
          While the App runs with a licence, it makes a brief status check when our service is
          reachable — at launch and then about once a day — carrying the activation identifier, the
          certificate serial and the App version, signed by the device. Like any request over the
          internet, it shows our server an IP address and a time. These checks carry no artwork, no
          file names and no record of what you traced, and on a paid licence a check that fails or
          cannot reach us never stops the App.
        </p>

        <h3>Product analytics</h3>
        <p>
          Coarse counters about how the App is used — how many traces are run, which features and
          parameters are reached for, and errors the App runs into. We use them in aggregate to
          decide which parts of the product are worth the work, and we may check a trial&rsquo;s
          own counters against the trial&rsquo;s limits. They are never joined to your artwork,
          because we do not have your artwork.
        </p>
        <p>
          You can switch analytics off in the App&rsquo;s settings. The one exception is a running
          trial: the counters that enforce the trial&rsquo;s limits stay on for as long as the
          trial does, because they are part of how the trial is provided. Outside a trial — the
          free features, or an activated paid licence — the switch turns everything off.
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
        <h2>A paid licence is not metered</h2>
        <p>
          A paid licence is perpetual and activated against your devices. Nothing you trace is
          counted against any limit, there is no renewal, and no connection is required: once
          activated, the App keeps working indefinitely, offline included. Product analytics
          continues as described above, but the only licensing traffic that remains is the limited
          status check — and when it fails or cannot connect, the App simply carries on.
        </p>
      </section>

      <section>
        <h2>Who else sees it</h2>
        <p>
          Service providers who process data on our behalf and under contract — hosting and our
          analytics infrastructure. And when you buy a licence, the checkout is run by our merchant
          of record: the seller for that transaction, handling your payment details under its own
          privacy policy rather than as our processor. We receive the fact of a completed purchase
          and the licence record, never your card number.
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
            days of you closing it — apart from the anti-abuse markers and purchase records below.
          </li>
          <li>
            <b>Trial anti-abuse markers:</b> a keyed one-way hash of the device and sign-in
            identity that used a trial is kept after the trial ends — and after the account is
            deleted — so an expired trial cannot be restarted with a fresh account. The hash cannot
            be turned back into the identifiers it was made from.
          </li>
          <li>
            <b>Licence records:</b> for as long as the licence is valid. A perpetual licence means
            we keep the record indefinitely, because otherwise we cannot honour or reissue it.
          </li>
          <li>
            <b>Purchase records:</b> for the period tax and accounting law requires.
          </li>
          <li>
            <b>Server logs:</b> raw request and access logs are kept for up to 30 days.
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
          account deletes the licence grant with it, and we cannot restore it afterwards. Deletion
          also does not remove the trial anti-abuse hashes or the purchase records the law requires
          us to keep, both described above.
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
          you live in. Where that happens we rely on recognised safeguards for international
          transfers, such as standard contractual clauses.
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
