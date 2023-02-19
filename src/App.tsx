import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useToDoContent } from './TodoContext';
import './styles/main.scss';
import s from './styles/app.module.scss';
import { AnimatePresence, Reorder } from "framer-motion";
import Confetti from 'react-confetti';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';
import { ToDoItem } from './components/ToDoItem';
import { EmptyState } from './components/EmptyState';
import { InputBar } from './components/InputBar';
import { InputBarMobile } from './components/InputBarMobile';
import { ConditionalRender } from './components/ConditionalRender';

function App() {
  const todoItemsListWrapper = useRef(null);
  const isW450 = useMediaQuery({
    query: '(max-width: 450px)'
  });
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
              <img className={s.profilePic} src="./douglas-ferreira-profile-pic.png" alt="@douglasF5" />
              <div className={s.profileLabelWrapper}>
                <h3 className={s.profileLabel}>Me</h3>
                <img src="./arrow-outward.svg" alt="@douglasF5" />
              </div>
            </a>
          </div>
        </div>
      </header>
      <main className={s.mainWrapper}>
        <h1 className={s.pageMainHeading}>Ignido - to-do app</h1>
        <div className={s.mainContentWrapper}>
          {!isW450
            ? <InputBar />
            : createPortal(<InputBarMobile />, document.body)
          }
          <ConditionalRender.Provider condition={toDoItemsList.length > 0}>
            <ConditionalRender.Slot>
              <div
                className={s.tasksListWrapper}
                data-focus-within={focusedItem ? "true" : "false"}
                data-dragging-within={draggingItem ? "true" : "false"}
                ref={todoItemsListWrapper}
              >
                {focusedItem && <div className={s.tasksListWrapperOverlay} />}
                <Reorder.Group
                  initial={false} axis="y"
                  values={toDoItemsList}
                  onReorder={updateToDoItemsList}
                >
                  <AnimatePresence initial={false}>
                    {
                      toDoItemsList.map((item) => (
                        <ToDoItem
                          key={item.id}
                          data={item}
                          isFocused={focusedItem === item.id}
                          isDragging={draggingItem === item.id}
                          listWrapperContraints={todoItemsListWrapper}
                        />
                      ))
                    }
                  </AnimatePresence>
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
