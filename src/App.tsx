import { useToDoContent } from './TodoContext';
import { useState, FormEvent } from 'react';
import { composeClassNames } from './utils';
import Confetti from 'react-confetti';
import './styles/main.scss';
import s from './styles/app.module.scss';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';
import { ToDoItem } from './components/ToDoItem';
import { EmptyState } from './components/EmptyState';

function App() {
  const {
    toDoItemsList,
    totalTasksCount,
    completeTasks,
    areAllTasksCompleted,
    confettiCleanUp,
    isConfettiRunning,
    focusedItem,
    addNewToDoItem,
    focusToDoItem
  } = useToDoContent();

  const [inputContent, setInputContent] = useState('');

  const customMessage = {
    logoFace: areAllTasksCompleted ? 'coffee' : 'bolt',
    text: areAllTasksCompleted ? 'You did it!' : 'Ignido'
  };

  const toDoItemsContainerStyles = composeClassNames([
    s.tasksListWrapper,
    focusedItem !== null ? s.hasFocusWithin : null
  ]);

  function handleSubmit(e: FormEvent<EventTarget>) {
    e.preventDefault();
    addNewToDoItem({ title: inputContent });
    setInputContent('');
  }

  return (
    <div>
      {isConfettiRunning && (
        <div className={s.confettiWrapper}>
          <Confetti
            tweenDuration={2000}
            initialVelocityY={5}
            gravity={0.1}
            colors={["#67FF76", "#135319", "#F0FFF1"]}
            recycle={false}
            numberOfPieces={100}
            onConfettiComplete={() => confettiCleanUp()}
          />
        </div>
      )}
      <header className={s.header}>
        <div className={s.headerContentContainer}>
          <div className={s.logoWrapper}>
            <LogoFace faceName={customMessage.logoFace} />
            <h2>{customMessage.text}</h2>
          </div>
          <div className={s.statsWrapper}>
            <Stat label='Done' data={completeTasks} />
            <Stat label='Tasks' data={totalTasksCount} />
            <a className={s.profileContainer} href="https://github.com/douglasF5" title="@douglasF5 on GitHub" target="_blank" rel="noreferrer">
              <img className={s.profilePic} src="/douglas-ferreira-profile-pic.png" alt="@douglasF5" />
              <div className={s.profileLabelWrapper}>
                <h3 className={s.profileLabel}>Me</h3>
                <img src="/arrow-outward.svg" alt="@douglasF5" />
              </div>
            </a>
          </div>
        </div>
      </header>
      <main>
        <h1 className={s.pageMainHeading}>Ignido - to-do app</h1>
        <div className={s.mainContentWrapper}>
          <form className={s.addNewTaskContainer} onSubmit={handleSubmit}>
            <input
              className={s.inputFieldAddtask}
              type="text"
              placeholder='Add new task...'
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            />
            <button
              disabled={inputContent === ''}
              className={s.buttonAddTask}
              type="submit"
            >
              Add
            </button>
          </form>
          <div className={toDoItemsContainerStyles}>
            {toDoItemsList.length === 0
              ? <EmptyState />
              : toDoItemsList.map((item) => (
                <ToDoItem
                  data={item}
                  key={item.id}
                  isFocused={focusedItem === item.id}
                  handleClick={() => focusToDoItem(item.id)}
                />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
