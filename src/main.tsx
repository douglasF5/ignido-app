import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToDoContextProvider } from './TodoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToDoContextProvider>
      <App />
    </ToDoContextProvider>
  </React.StrictMode>,
);
