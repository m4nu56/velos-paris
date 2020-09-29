import Link from 'next/link';
import slugify from 'slugify';
import { CounterStat } from '../lib/types.d';

const Num = ({ n }: { n: number }) => (
  <span className="font-mono">{n.toLocaleString('fr-FR')}</span>
);

function Counter({ stat, avg }: { stat: CounterStat; avg: boolean }) {
  const week = avg ? Math.round(stat.lastWeek / 7) : stat.lastWeek;
  const month = avg ? Math.round(stat.last30Days / 30) : stat.last30Days;
  const total = avg ? Math.round(stat.total / stat.days) : stat.total;
  return (
    <>
      <h2>{stat.label}</h2>
      <Link href={`/details/${slugify(stat.label)}`}>Voir les détails</Link>
      <dl className="pt-2">
        <dt>Hier</dt>
        <dd>
          <Num n={stat.yesterday} />
        </dd>
        <dt>Sur 7 jours</dt>
        <dd>
          <Num n={week} />
        </dd>
        <dt>Sur 30 jours</dt>
        <dd>
          <Num n={month} />
        </dd>
        <dt>Sur {stat.days} jours</dt>
        <dd>
          <Num n={total} />
        </dd>
        <dt>Compteurs</dt>
        <dd>
          <ul className="text-xs">
            {stat.included.map((counter) => (
              <li key={counter}>{counter}</li>
            ))}
          </ul>
        </dd>
      </dl>
    </>
  );
}

export default Counter;
