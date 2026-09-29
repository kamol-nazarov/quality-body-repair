export default function Ticker({ items, className = '', itemClass = '', reverse = false }) {
  const Row = () => (
    <div className="flex w-max shrink-0 items-center" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={`whitespace-nowrap ${itemClass} ${/[А-Яа-яЁё]/.test(t) ? 'font-mono tracking-wide' : ''}`}>{t}</span>
          <span className="mx-5 inline-block h-2.5 w-2.5 rotate-45 bg-current opacity-70 md:mx-8" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'} hover:[animation-play-state:paused]`}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
