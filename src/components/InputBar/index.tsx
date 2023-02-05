import { useToDoContent } from '../../TodoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { useComposableStyles } from '../../hooks/useComposableStyles';
import s from './styles.module.scss';

export function InputBar() {
  const [inputContent, setInputContent] = useState('');
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const { addNewToDoItem } = useToDoContent();
  const cs = useComposableStyles(s);

  function handleSubmit(e: FormEvent<EventTarget>) {
    e.preventDefault();
    addNewToDoItem({ title: inputContent });
    setInputContent('');
  }

  return (
    <div className={cs(["inputBarWrapper", inputHasFocus ? "hasFocusWithin" : null])}>
      <form className={s.addNewTaskContainer} onSubmit={handleSubmit}>
        <input
          className={s.inputFieldAddtask}
          type="text"
          placeholder='Add a new item...'
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          onFocus={() => setInputHasFocus(true)}
          onBlur={() => setInputHasFocus(false)}
        />
        <button
          disabled={inputContent === ''}
          className={s.buttonAddTask}
          type="submit"
        >
          Add
        </button>
      </form>
      <AnimatePresence initial={false}>
        {inputHasFocus && (
          <motion.div
            initial={{ translateY: "-100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "-100%" }}
            transition={{ duration: 0.25, ease: "easeIn" }}
            className={s.infoSectionContainer}
          >
            <div className={s.tipWrapper}>
              <span className={s.signWrapper}><span className={s.sign}>#</span></span>
              <p className={s.label}>To add a heading</p>
            </div>
            <div className={s.tipWrapper}>
              <span className={s.signWrapper}><span className={cs(["sign", "asterisk"])}>*</span></span>
              <p className={s.label}>To add priority</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
