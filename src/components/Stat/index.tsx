import s from './styles.module.scss';

interface StatProps {
  label: string;
  data: number;
}

export function Stat({ label, data }: StatProps) {
  return (
    <div className={s.container}>
      <p className={s.data}>{data}</p>
      <h3 className={s.label}>{label}</h3>
    </div>
  );
};
