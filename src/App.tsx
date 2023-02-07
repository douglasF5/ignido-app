import { useToDoContent } from './TodoContext';
import { Reorder } from "framer-motion";
import './styles/main.scss';
import s from './styles/app.module.scss';
import Confetti from 'react-confetti';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';
import { ToDoItem } from './components/ToDoItem';
import { EmptyState } from './components/EmptyState';
import { InputBar } from './components/InputBar';
import { ConditionalRender } from './components/ConditionalRender';

function App() {
  const {
    toDoItemsList,
    statsData,
    areAllTasksCompleted,
    isConfettiRunning,
    focusedItem,
    draggingItem,
    confettiCleanUp,
    updateToDoItemsList
  } = useToDoContent();

  const customMessage = {
    logoFace: areAllTasksCompleted ? 'coffee' : 'bolt',
    text: areAllTasksCompleted ? 'You did it!' : 'Ignido'
  };

  return (
    <div>
      <ConditionalRender.Provider condition={isConfettiRunning}>
        <ConditionalRender.Slot>
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
        </ConditionalRender.Slot>
      </ConditionalRender.Provider>
      <header className={s.header}>
        <div className={s.headerContentContainer}>
          <div className={s.logoWrapper}>
            <LogoFace faceName={customMessage.logoFace} />
            <h2>{customMessage.text}</h2>
          </div>
          <div className={s.statsWrapper}>
            <Stat label='Done' data={statsData.completeTasks} />
            <Stat label='Tasks' data={statsData.totalTasksCount} />
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
      <main className={s.mainWrapper}>
        <h1 className={s.pageMainHeading}>Ignido - to-do app</h1>
        <div className={s.mainContentWrapper}>
          <InputBar />
          <ConditionalRender.Provider condition={toDoItemsList.length > 0}>
            <ConditionalRender.Slot>
              <div
                className={s.tasksListWrapper}
                data-focus-within={focusedItem ? "true" : "false"}
                data-dragging-within={draggingItem ? "true" : "false"}
              >
                <Reorder.Group initial={false} axis="y" values={toDoItemsList} onReorder={updateToDoItemsList}>
                  {
                    toDoItemsList.map((item) => (
                      <ToDoItem
                        key={item.id}
                        data={item}
                        isFocused={focusedItem === item.id}
                        isDragging={draggingItem === item.id}
                      />
                    ))
                  }
                </Reorder.Group>
              </div>
            </ConditionalRender.Slot>
            <ConditionalRender.Fallback>
              <div className={s.tasksEmptyListWrapper}>
                <EmptyState />
              </div>
            </ConditionalRender.Fallback>
          </ConditionalRender.Provider>
        </div>
      </main>
    </div>
  );
}

export default App;
