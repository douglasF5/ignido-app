import './styles/main.scss';
import s from './styles/app.module.scss';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';
import { ToDoItem } from './components/ToDoItem';

interface ToDoItemData {
  type: "task" | "heading";
  title: string;
}

function App() {
  const tasksList: ToDoItemData[] = [
    {
      type: "task",
      title: "Walk the dog"
    },
    {
      type: "task",
      title: "Dinner with mom"
    },
    {
      type: "heading",
      title: "This is a heading"
    },
    {
      type: "task",
      title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. This is the content."
    },
  ];

  return (
    <div>
      <header className={s.header}>
        <div className={s.headerContentContainer}>
          <div className={s.logoWrapper}>
            <LogoFace faceName='bolt' />
            <h2>Ignido</h2>
          </div>
          <div className={s.statsWrapper}>
            <Stat label='Done' data={1} />
            <Stat label='Tasks' data={4} />
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
            {tasksList.map(({ title, type }, idx) => (
              <ToDoItem data={{ type, title }} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
