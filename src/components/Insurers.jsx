import Ticker from './Ticker';
import { Words } from '../lib/motion';
import { INSURERS_ROW_1, INSURERS_ROW_2 } from '../lib/data';

export default function Insurers() {
  return (
    <section id="insurers" className="overflow-hidden border-t border-line py-24 md:py-32">
      <div className="px-5 text-center md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
          04 / Insurance
        </p>
        <h2 className="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.6rem,7vw,6.5rem)]" data-split>
          <Words text="Every major insurer." />
          <br />
          <span className="text-outline">
            <Words text="Direct billing." />
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-smoke" data-fade>
          We file the claim, chase the supplements, and bill your provider directly. You never touch the paperwork.
        </p>
      </div>

      <div className="mt-14 space-y-2 md:mt-20">
        <Ticker
          items={INSURERS_ROW_1}
          itemClass="ins-name font-display uppercase text-6xl md:text-8xl px-8"
        />
        <Ticker
          items={INSURERS_ROW_2}
          reverse
          itemClass="ins-name font-display uppercase text-6xl md:text-8xl px-8"
        />
      </div>

      <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-smoke" data-fade>
        Don't see yours? <span className="text-ink">We accept all valid US auto insurance.</span>
      </p>
    </section>
  );
}
