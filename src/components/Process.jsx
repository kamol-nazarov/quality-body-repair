import { Words } from '../lib/motion';
import { PROCESS } from '../lib/data';

export default function Process() {
  return (
    <section id="process" className="relative border-y border-line bg-panel">
      <div className="grid lg:grid-cols-2">
        {/* Sticky intro column */}
        <div className="flex flex-col justify-center px-5 py-20 md:px-10 lg:sticky lg:top-0 lg:h-svh lg:py-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
            02 / The process
          </p>
          <h2
            className="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,7vw,6.5rem)]"
            data-split
          >
            <Words text="From wreck" />
            <br />
            <span className="text-outline-ember">
              <Words text="to right." />
            </span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-smoke" data-fade>
            Four steps. Zero stress. Most claims are handled without you ever picking up the phone to your insurer.
          </p>
          <div className="hazard mt-12 h-3 w-44 opacity-90" data-fade />
        </div>

        {/* Steps */}
        <div className="border-t border-line lg:border-l lg:border-t-0">
          {PROCESS.map((s) => (
            <div key={s.num} className="group grid grid-cols-[auto_1fr] gap-6 border-b border-line px-5 py-12 last:border-b-0 md:gap-10 md:px-10 md:py-16" data-fade>
              <span className="step-num font-display text-6xl leading-none md:text-8xl">
                {s.num}
              </span>
              <div className="pt-2 md:pt-4">
                <h3 className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke md:text-base">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
