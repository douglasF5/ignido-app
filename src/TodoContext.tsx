import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// TYPE ANNOTATION
interface ToDoItemData {
  id: string;
  type: "task" | "heading";
  title: string;
  isChecked: boolean | null;
  actions: string[] | null;
}

interface ToDoContextProviderProps {
  children: ReactNode;
};

interface ToDoContextProvider {
  toDoItemsList: ToDoItemData[];
  completeTasks: number;
  totalTasksCount: number;
  isConfettiRunning: boolean;
  areAllTasksCompleted: boolean;
  toggleToDoCheck: (id: string) => void;
  confettiCleanUp: () => void;
}

// TO DOS INITIAL DATA
const toDoItemsData: ToDoItemData[] = [
  {
    id: "1",
    type: "task",
    title: "Walk the dog",
    isChecked: false,
    actions: null
  },
  {
    id: "2",
    type: "task",
    title: "Dinner with mom",
    isChecked: false,
    actions: null
  },
  {
    id: "3",
    type: "heading",
    title: "This is a heading",
    isChecked: null,
    actions: null
  },
  {
    id: "4",
    type: "task",
    title: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. This is the content.",
    isChecked: false,
    actions: null
  },
];

// CONTEXT CREATION
export const ToDoContext = createContext({} as ToDoContextProvider);

// CONTEXT PROVIDING
export function ToDoContextProvider({ children }: ToDoContextProviderProps) {
  const [toDoItemsList, setToDoItemsList] = useState(toDoItemsData);
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);
  const completeTasks = toDoItemsList.reduce((count, task) => {
    if (task.isChecked) count++;
    return count;
  }, 0);

  const totalTasksCount = toDoItemsList.reduce((count, task) => {
    if (task.type === "task") count++;
    return count;
  }, 0);

  const areAllTasksCompleted = totalTasksCount === completeTasks && [totalTasksCount, completeTasks].every(variable => variable > 0);

  function toggleToDoCheck(id: string) {
    const newTodosList = toDoItemsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      } else {
        return item;
      }
    });

    setToDoItemsList(newTodosList);
  }

  function confettiCleanUp() {
    setIsConfettiRunning(false);
  }

  useEffect(() => {
    if (areAllTasksCompleted) {
      setIsConfettiRunning(true);
    }
  }, [areAllTasksCompleted]);

  return (
    <ToDoContext.Provider value={{
      toDoItemsList,
      completeTasks,
      totalTasksCount,
      isConfettiRunning,
      areAllTasksCompleted,
      toggleToDoCheck,
      confettiCleanUp
    }}>
      {children}
    </ToDoContext.Provider>
  );
}

//EXPORTING CUSTOM HOOK
export const useToDoContent = () => {
  const context = useContext(ToDoContext);
  return context;
};
