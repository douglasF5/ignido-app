import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { generateQuickId } from './utils';

// TYPE ANNOTATION
type ToDoType = "task" | "heading";

interface ToDoItemData {
  id: string;
  type: ToDoType;
  title: string;
  isChecked: boolean | null;
  actions: string[] | null;
}

interface ToDoItemRawData {
  title: string;
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
  focusedItem: string | null;
  toggleToDoCheck: (id: string) => void;
  confettiCleanUp: () => void;
  addNewToDoItem: (data: ToDoItemRawData) => void;
  focusToDoItem: (id: string) => void;
  blurToDoItem: () => void;
  duplicateToDoItem: (id: string) => void;
  deleteToDoItem: (id: string) => void;
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
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
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

  function focusToDoItem(id: string) {
    setFocusedItem(id);
  }

  function blurToDoItem() {
    setFocusedItem(null);
  }

  function toggleToDoCheck(id: string) {
    const newToDosList = toDoItemsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      } else {
        return item;
      }
    });

    setToDoItemsList(newToDosList);
  }

  function addNewToDoItem({ title }: ToDoItemRawData) {
    const isHeading = title[0] === "#";

    const newToDoItem = {
      id: generateQuickId(),
      type: isHeading ? "heading" : "task" as ToDoType,
      title: isHeading ? title.slice(1).trim() : title.trim(),
      isChecked: false,
      actions: null
    };

    const newToDosList = [...toDoItemsList, newToDoItem];
    setToDoItemsList(newToDosList);
  }

  function duplicateToDoItem(id: string) {
    const toDoIndex = toDoItemsList.findIndex(toDo => toDo.id === id);
    const elementsBefore = toDoIndex > 0 ? toDoItemsList.slice(0, toDoIndex + 1) : [toDoItemsList[toDoIndex]];
    const elementsAfter = toDoIndex < toDoItemsList.length - 1 ? toDoItemsList.slice(toDoIndex + 1, toDoItemsList.length) : [];

    const newToDoItem = {
      ...toDoItemsList[toDoIndex],
      id: generateQuickId()
    };

    const newToDosList = [
      ...elementsBefore,
      newToDoItem,
      ...elementsAfter
    ];

    setToDoItemsList(newToDosList);
  }

  function deleteToDoItem(id: string) {
    const newToDosList = toDoItemsList.filter(toDo => toDo.id !== id);
    setToDoItemsList(newToDosList);

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
      focusedItem,
      toggleToDoCheck,
      confettiCleanUp,
      addNewToDoItem,
      focusToDoItem,
      blurToDoItem,
      duplicateToDoItem,
      deleteToDoItem
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
