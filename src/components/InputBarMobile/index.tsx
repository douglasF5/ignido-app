import { useToDoContent } from '../../TodoContext';
import { FormEvent, useState } from 'react';
import { useComposableStyles } from '../../hooks/useComposableStyles';
import s from './styles.module.scss';

export function InputBarMobile() {
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
    <div
      className={cs(["inputBarWrapper", inputHasFocus ? "hasFocusWithin" : null])}
    >
      <form
        className={s.addNewTaskContainer}
        onSubmit={handleSubmit}
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
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};
