import s from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface StatProps {
  label: string;
  data: Array<number>;
}

export function Stat({ label, data }: StatProps) {
  const [prev, curr] = data;
  const animationDirection = prev < curr ? 1 : -1;

  let variants = {
    enter: (animationDirection: number) => ({ y: animationDirection * -100 }),
    center: { y: 0 },
    exit: (animationDirection: number) => ({ y: animationDirection * 100 })
  };

  return (
    <div className={s.container}>
      <div className={s.dataWrapper}>
        <AnimatePresence initial={false} custom={animationDirection}>
          <motion.p
            key={curr}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={animationDirection}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={s.data}
          >
            {data[1]}
          </motion.p>
        </AnimatePresence>
      </div>
      <h3 className={s.label}>{label}</h3>
    </div>
  );
};
