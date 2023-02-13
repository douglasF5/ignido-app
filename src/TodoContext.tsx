import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useQuickId } from './hooks/useQuickId';

// TYPE ANNOTATION
type ToDoType = "task" | "heading";

interface ToDoItemData {
  id: string;
  type: ToDoType;
  title: string;
  isPriority: boolean | null;
  isChecked: boolean | null;
}

interface ToDoItemRawData {
  title: string;
}

interface ToDoContextProviderProps {
  children: ReactNode;
};

interface IStatsData {
  completeTasks: Array<number>;
  totalTasksCount: Array<number>;
};

interface ToDoContextProvider {
  toDoItemsList: ToDoItemData[];
  statsData: IStatsData;
  isConfettiRunning: boolean;
  areAllTasksCompleted: boolean;
  focusedItem: string | null;
  draggingItem: string | null;
  setFocusedItem: (id: string | null) => void;
  setDraggingItem: (id: string | null) => void;
  updateToDoItem: (id: string, updateObject: Partial<ToDoItemData>) => void;
  confettiCleanUp: () => void;
  addNewToDoItem: (data: ToDoItemRawData) => void;
  duplicateToDoItem: (id: string) => void;
  deleteToDoItem: (id: string) => void;
  updateToDoItemsList: (newToDoItemsList: ToDoItemData[]) => void;
}

// TO DOS INITIAL DATA
const toDoItemsData: ToDoItemData[] = [
  {
    id: "1",
    type: "task",
    title: "Create a new task using the radioactive green input above",
    isChecked: false,
    isPriority: false
  },
  {
    id: "2",
    type: "task",
    title: "Create a heading by typing a # in front of the to-do's title",
    isChecked: false,
    isPriority: false
  },
  {
    id: "3",
    type: "heading",
    title: "This is a heading",
    isChecked: null,
    isPriority: null
  },
  {
    id: "4",
    type: "task",
    title: "Use the handles on every to-do item to drag and reorder the list",
    isChecked: false,
    isPriority: false
  },
  {
    id: "5",
    type: "task",
    title: "Complete all to-dos to make it rain confetti 🎉",
    isChecked: false,
    isPriority: false
  },
];

// CONTEXT CREATION
export const ToDoContext = createContext({} as ToDoContextProvider);

// CONTEXT PROVIDING
export function ToDoContextProvider({ children }: ToDoContextProviderProps) {
  const [toDoItemsList, setToDoItemsList] = useState(
    getDataFromLocalStorage() || toDoItemsData);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);

  function getDataFromLocalStorage() {
    const rawData = localStorage.getItem('ignido.appData');
    const data = rawData ? JSON.parse(rawData) as ToDoItemData[] : "";
    return data;
  }

  function calculateTasksCount(array: ToDoItemData[], property: keyof ToDoItemData, value: string | boolean) {
    return array.reduce((count, item) => {
      if (item[property] === value) count++;
      return count;
    }, 0);
  }

  const [statsData, setStatsData] = useState<IStatsData>({
    completeTasks: [
      0,
      calculateTasksCount(toDoItemsList, "isChecked", true)
    ],
    totalTasksCount: [
      0,
      calculateTasksCount(toDoItemsList, "type", "task")
    ]
  });

  const areAllTasksCompleted = statsData.totalTasksCount[1] === statsData.completeTasks[1] && [statsData.totalTasksCount[1], statsData.completeTasks[1]].every(variable => variable as number > 0);

  function updateToDoItemsList(newToDoItemsList: ToDoItemData[]) {
    setToDoItemsList(newToDoItemsList);
  }

  function addNewToDoItem({ title }: ToDoItemRawData) {
    const isHeading = title[0] === "#";
    const hasPriority = title[0] === "*";
    const trimmedTitle = isHeading || hasPriority ? title.slice(1).trim() : title.trim();

    const newToDoItem = {
      id: useQuickId(),
      type: isHeading ? "heading" : "task" as ToDoType,
      title: trimmedTitle,
      isChecked: isHeading ? null : false,
      isPriority: isHeading ? null : hasPriority,
      actions: null
    };

    if (!isHeading) {
      setStatsData(prev => {
        return {
          ...prev,
          totalTasksCount: [prev.totalTasksCount[1], prev.totalTasksCount[1] + 1]
        };
      });
    }

    const newToDosList = [newToDoItem, ...toDoItemsList];
    setToDoItemsList(newToDosList);
  }

  function duplicateToDoItem(id: string) {
    const toDoIndex = toDoItemsList.findIndex(toDo => toDo.id === id);
    const elementsBefore = toDoIndex > 0 ? toDoItemsList.slice(0, toDoIndex + 1) : [toDoItemsList[toDoIndex]];
    const elementsAfter = toDoIndex < toDoItemsList.length - 1 ? toDoItemsList.slice(toDoIndex + 1, toDoItemsList.length) : [];

    const newToDoItem = {
      ...toDoItemsList[toDoIndex],
      id: useQuickId()
    };

    const newToDosList = [
      ...elementsBefore,
      newToDoItem,
      ...elementsAfter
    ];

    if (newToDoItem.type === "task") {
      const tasksCompleteIncrement = newToDoItem.isChecked ? 1 : 0;

      setStatsData(prev => {
        return {
          completeTasks: [prev.completeTasks[1], prev.completeTasks[1] + tasksCompleteIncrement],
          totalTasksCount: [prev.totalTasksCount[1], prev.totalTasksCount[1] + 1]
        };
      });
    }

    setToDoItemsList(newToDosList);
  }

  function deleteToDoItem(id: string) {
    let tasksCompleteDecrement = 0;
    let shouldUpdateTasksCount = false;

    const newToDosList = toDoItemsList.filter(toDo => {
      if (toDo.id === id) {
        shouldUpdateTasksCount = toDo.type === "task";
        tasksCompleteDecrement = toDo.isChecked ? -1 : 0;
      }
      return toDo.id !== id;
    });

    if (shouldUpdateTasksCount) {
      setStatsData(prev => {
        return {
          completeTasks: [prev.completeTasks[1], prev.completeTasks[1] + tasksCompleteDecrement],
          totalTasksCount: [prev.totalTasksCount[1], prev.totalTasksCount[1] - 1]
        };
      });
    }

    setToDoItemsList(newToDosList);
  }

  function updateToDoItem(id: string, updateObject: Partial<ToDoItemData>) {
    let tasksCountIncrement = 0;
    const shouldUpdateTasksCount = "isChecked" in updateObject;

    const newToDosList = toDoItemsList.map(item => {
      if (item.id === id) {
        if (item.type === "task" && shouldUpdateTasksCount) {
          tasksCountIncrement = updateObject.isChecked ? 1 : -1;
        }

        if ("title" in updateObject) {
          const title = updateObject.title as string;
          const isHeading = title[0] === "#";
          const hasPriority = title[0] === "*";
          const trimmedTitle = isHeading || hasPriority ? title.trim().slice(1) : title.trim();
          const newType: ToDoType = isHeading ? "heading" : item.type;

          return {
            ...item,
            ...updateObject,
            title: trimmedTitle,
            type: newType
          };
        }

        return {
          ...item,
          ...updateObject
        };
      } else {
        return item;
      }
    });

    if (shouldUpdateTasksCount) {
      setStatsData(prev => {
        return {
          ...prev,
          completeTasks: [prev.completeTasks[1], prev.completeTasks[1] + tasksCountIncrement]
        };
      });
    }

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

  useEffect(() => {
    localStorage.setItem('ignido.appData', JSON.stringify(toDoItemsList));
  }, [toDoItemsList]);

  return (
    <ToDoContext.Provider value={{
      toDoItemsList,
      statsData,
      isConfettiRunning,
      areAllTasksCompleted,
      focusedItem,
      draggingItem,
      setFocusedItem,
      setDraggingItem,
      updateToDoItem,
      confettiCleanUp,
      addNewToDoItem,
      duplicateToDoItem,
      deleteToDoItem,
      updateToDoItemsList
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