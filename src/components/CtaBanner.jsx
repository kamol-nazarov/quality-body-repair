import { Magnetic, Words } from '../lib/motion';
import { BUSINESS, IMAGES } from '../lib/data';
import { IconPhone, IconArrowRight } from '../lib/icons';

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* Background */}
      <div className="absolute inset-0" data-parallax-wrap>
        <img
          src={IMAGES['engine-detail']}
          alt=""
          aria-hidden="true"
          className="h-[120%] w-full object-cover opacity-30"
          data-parallax="9"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coal via-coal/60 to-coal" />
      </div>

      <div className="hazard h-2.5 w-full opacity-90" />

      <div className="relative z-10 px-5 py-28 text-center md:px-10 md:py-44">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
          One call does it
        </p>
        <h2 className="mt-6 font-display uppercase leading-[0.9] text-ink text-[clamp(3rem,11vw,11rem)]" data-split>
          <Words text="Stop driving" />
          <br />
          <span className="text-outline">
            <Words text="with damage." />
          </span>
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row" data-fade>
          <Magnetic>
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-3 bg-ember px-10 py-5 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal transition-colors hover:bg-ink"
            >
              <IconPhone size={16} />
              {BUSINESS.phoneDisplay}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={BUSINESS.directions}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border border-ink/30 px-10 py-5 font-mono text-sm font-medium uppercase tracking-[0.15em] text-ink transition-colors hover:border-ember hover:text-ember"
            >
              Visit the shop
              <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke" data-fade>
          {BUSINESS.address} · {BUSINESS.city}
        </p>
      </div>

      <div className="hazard h-2.5 w-full opacity-90" />
    </section>
  );
}
