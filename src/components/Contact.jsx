import { useState } from 'react';
import { BUSINESS } from '../lib/data';
import { Words } from '../lib/motion';
import { IconClock, IconPin, IconArrowRight, IconCheck } from '../lib/icons';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'done' | 'error'

  const submit = (e) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('done');
      setForm({ name: '', phone: '', vehicle: '' });
    }, 900);
  };

  const field =
    'w-full border-b border-line bg-transparent py-4 text-base text-ink placeholder:text-smoke/60 outline-none transition-colors focus:border-ember';

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

          {/* Callback form */}
          <div data-fade>
            <div className="border border-line bg-panel p-7 md:p-10">
              {status === 'done' ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ember text-coal">
                    <IconCheck size={26} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl uppercase text-ink">Request received</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-smoke">
                    We will call you back shortly. For anything urgent, ring us directly at {BUSINESS.phoneDisplay}.
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ember hover:text-ink"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">
                    Request a callback
                  </h3>
                  <p className="mt-2 text-sm text-smoke">
                    Tell us where to call — we'll take it from there.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div>
                      <label htmlFor="cb-name" className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                        Name
                      </label>
                      <input
                        id="cb-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={field}
                      />
                    </div>
                    <div>
                      <label htmlFor="cb-phone" className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                        Phone *
                      </label>
                      <input
                        id="cb-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(718) 555-0100"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (status === 'error') setStatus(null);
                        }}
                        className={field}
                      />
                      {status === 'error' && (
                        <p className="mt-2 font-mono text-[11px] text-ember">
                          Please enter a phone number so we can call you back.
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cb-vehicle" className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                        Vehicle
                      </label>
                      <input
                        id="cb-vehicle"
                        type="text"
                        placeholder="Year / Make / Model"
                        value={form.vehicle}
                        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                        className={field}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group mt-10 flex w-full items-center justify-center gap-3 bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal transition-colors hover:bg-ink disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Request callback'}
                    {status !== 'sending' && (
                      <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}
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
