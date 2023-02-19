import { FormEvent, MouseEvent, useState } from 'react';
import { useToDoContent } from '../../TodoContext';
import { motion, AnimatePresence } from 'framer-motion';
import s from './styles.module.scss';
import { useComposableStyles } from '../../hooks/useComposableStyles';

export function InputBarMobile() {
  const [inputContent, setInputContent] = useState('');
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { addNewToDoItem } = useToDoContent();
  const cs = useComposableStyles(s);

  function onFormSubmit(e: FormEvent<EventTarget>) {
    e.preventDefault();
  }

  function handleSubmit() {

    if (inputContent === "") {
      setIsInputVisible(false);
    } else {
      addNewToDoItem({ title: inputContent });
      setInputContent('');
    }
  }

  const ANIMATION_DURATION = 0.2;

  return (
    <div
      className={cs(["inputBarWrapper", inputHasFocus ? "hasFocusWithin" : null])}
    >
      <AnimatePresence initial={false}>
        {!isInputVisible && (
          <motion.button
            className={s.buttonToggleInput}
            type="button"
            aria-label="Toggle input"
            onClick={() => setIsInputVisible(prevState => !prevState)}
            initial={{ backgroundColor: "#20241" }}
            animate={{ backgroundColor: "#67FF76" }}
            exit={{ backgroundColor: "#20241" }}
          >
            <img src="./add.svg" alt="Toggle input" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isInputVisible && (
          <motion.form
            className={s.addNewTaskContainer}
            onSubmit={onFormSubmit}
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            transition={{ duration: ANIMATION_DURATION }}
          >
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
              className={s.buttonAddTask}
              type={inputContent === "" ? "button" : "submit"}
              aria-label="Submit"
              onClick={handleSubmit}
            >
              <motion.img
                src="./arrow-upward.svg"
                alt="Submit input"
                initial={{
                  rotateZ: "180deg"
                }}
                animate={{
                  rotateZ: inputContent ? 0 : "180deg"
                }}
                transition={{ duration: 0.15 }}
              />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
