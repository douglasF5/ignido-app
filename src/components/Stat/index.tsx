import s from './styles.module.scss';
import { useComposableStyles } from '../../hooks/useComposableStyles';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatProps {
  label: string;
  data: Array<number>;
}

export function Stat({ label, data }: StatProps) {
  const [prev, curr] = data;
  const [dataIsAnimating, setDataIsAnimating] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const cs = useComposableStyles(s);
  const animationDirection = prev < curr ? 1 : -1;

  let variants = {
    enter: (animationDirection: number) => ({ y: animationDirection * -100 }),
    center: { y: 0 },
    exit: (animationDirection: number) => ({ y: animationDirection * 100 })
  };

  function onStart() {
    setDataIsAnimating(true);
  }

  function onEnd() {
    setDataIsAnimating(false);
  }

  useEffect(() => {
    if (renderCount < 5) setRenderCount(prev => prev + 1);
  }, [dataIsAnimating]);

  return (
    <div
      className={cs([
        "container",
        dataIsAnimating && renderCount >= 5 ? "isAnimating" : null
      ])}
    >
      <div
        className={s.dataWrapper}
      >
        <AnimatePresence initial={false} custom={animationDirection}>
          <motion.p
            key={curr}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={animationDirection}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationStart={onStart}
            onAnimationComplete={onEnd}
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
