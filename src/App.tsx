import { useToDoContent } from './TodoContext';
import Confetti from 'react-confetti';
import './styles/main.scss';
import s from './styles/app.module.scss';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';
import { ToDoItem } from './components/ToDoItem';
import { EmptyState } from './components/EmptyState';

function App() {
  const { toDoItemsList, totalTasksCount, completeTasks, areAllTasksCompleted, confettiCleanUp, isConfettiRunning } = useToDoContent();
  const customMessage = {
    logoFace: areAllTasksCompleted ? 'coffee' : 'bolt',
    text: areAllTasksCompleted ? 'You did it!' : 'Ignido'
  };

  return (
    <div>
      {isConfettiRunning && (
        <Confetti
          style={{
            transform: "translate(-20px)"
          }}
          tweenDuration={2000}
          initialVelocityY={5}
          gravity={0.1}
          colors={["#67FF76", "#135319", "#F0FFF1"]}
          recycle={false}
          numberOfPieces={100}
          onConfettiComplete={() => confettiCleanUp()}
        />
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
          </div>
        </div>
      </header>
      <main>
        <h1 className={s.pageMainHeading}>Ignido - to-do app</h1>
        <div className={s.mainContentWrapper}>
          <div className={s.addNewTaskContainer}>
            <input className={s.inputFieldAddtask} type="text" placeholder='Add new task...' />
            <button className={s.buttonAddTask}>Add</button>
          </div>
          <div className={s.tasksListWrapper}>
            {toDoItemsList.length === 0
              ? <EmptyState />
              : toDoItemsList.map((item) => (
                <ToDoItem data={item} key={item.id} />
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
