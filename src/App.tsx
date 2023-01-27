import './styles/main.scss';
import s from './styles/app.module.scss';
import { Stat } from './components/Stat';
import { LogoFace } from './components/LogoFace';

function App() {
  return (
    <div>
      <header className={s.header}>
        <div className={s.headerContentContainer}>
          <div className={s.infoWrapper}>
            <div className={s.logoWrapper}>
              <LogoFace faceName='bolt' />
              <h2>Ignido</h2>
            </div>
            <div className={s.statsWrapper}>
              <Stat label='Done' data={1} />
              <Stat label='Tasks' data={4} />
            </div>
          </div>
          <div className={s.addNewTaskContainer}>
            Add new task...
          </div>
        </div>
      </header>
      <main>
        <h1>Ignido - to-do app</h1>
      </main>
    </div>
  );
}

export default App;
