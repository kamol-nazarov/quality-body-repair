import { BUSINESS } from '../lib/data';
import { Words } from '../lib/motion';
import { IconClock, IconPin, IconPhone } from '../lib/icons';

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24 md:py-32">
      <div className="px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
          05 / Contact
        </p>
        <h2 className="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]" data-split>
          <Words text="Ready to" />{' '}
          <span className="text-ember">
            <Words text="restore?" />
          </span>
        </h2>

        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Info column */}
          <div data-fade>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">Call us now</p>
            <a
              href={BUSINESS.phoneHref}
              className="mt-3 block font-display text-[clamp(2.6rem,5.5vw,4.8rem)] uppercase leading-none text-ink transition-colors hover:text-ember"
            >
              {BUSINESS.phoneDisplay}
            </a>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                <dt className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                  <IconPin size={14} className="mt-0.5" /> Visit
                </dt>
                <dd>
                  <p className="text-ink">{BUSINESS.address}</p>
                  <p className="text-sm text-smoke">{BUSINESS.city} — {BUSINESS.neighborhood}</p>
                  <a
                    href={BUSINESS.directions}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ember hover:text-ink"
                  >
                    Get directions →
                  </a>
                </dd>
              </div>
              {BUSINESS.hours.map((h) => (
                <div key={h.days} className="grid grid-cols-[110px_1fr] gap-4 py-5">
                  <dt className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                    <IconClock size={14} className="mt-0.5" /> Hours
                  </dt>
                  <dd className="flex items-baseline justify-between gap-4">
                    <span className="text-smoke">{h.days}</span>
                    <span className="text-right text-ink">{h.time}</span>
                  </dd>
                </div>
              ))}
              <div className="grid grid-cols-[110px_1fr] gap-4 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">Language</dt>
                <dd className="text-ink">{BUSINESS.languages}</dd>
              </div>
            </dl>
          </div>

          <div data-fade>
            <div className="border border-line bg-panel p-7 md:p-10">
              <h3 className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">
                Request a callback
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                Call the shop and we will take the details. Monday through Friday, 8:00 AM to 5:00 PM.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="mt-10 flex w-full items-center justify-center gap-3 bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal transition-colors hover:bg-ink"
              >
                <IconPhone size={16} />
                Call {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-6 text-sm leading-relaxed text-smoke">
                This page does not send a message. The button places a phone call to the shop.
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 overflow-hidden border border-line" data-fade>
          <iframe
            src={BUSINESS.mapsEmbed}
            width="100%"
            height="440"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Quality Body Repair — 221 Bay 37th Street, Brooklyn"
            className="map-dark h-[360px] w-full border-0 md:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
