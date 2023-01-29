import s from './styles.module.scss';

export function EmptyState() {
  return (
    <div className={s.container}>
      <img src="/meditating.svg" alt="No tasks to do!" />
      <p>It&apos;s all good <br />around here</p>
    </div>
  );
};
