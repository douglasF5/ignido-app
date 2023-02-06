import React from 'react';
import { Reorder, useDragControls, motion, AnimatePresence } from "framer-motion";
import s from './styles.module.scss';
import { useComposableStyles } from '../../hooks/useComposableStyles';
import { ConditionalRender } from '../ConditionalRender';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useToDoContent } from '../../TodoContext';
import { ActionsBar } from '../ActionsBar';

interface ToDoItemProps {
  data: {
    id: string;
    type: "task" | "heading";
    title: string;
    isChecked: boolean | null;
    isPriority: boolean | null;
  };
  isFocused: boolean;
  isDragging: boolean;
}

export function ToDoItem({ data, isFocused, isDragging }: ToDoItemProps) {
  const {
    draggingItem,
    setDraggingItem,
    updateToDoItem,
    setFocusedItem
  } = useToDoContent();
  const cs = useComposableStyles(s);
  const focusStyle = isFocused ? "isFocused" : null;
  const dragControls = useDragControls();

  const actionsBarAnimationVariants = {
    enter: {
      opacity: 0,
      translateY: "-98%"
    },
    present: {
      opacity: 1,
      translateY: "-105%"
    },
    exit: {
      opacity: 0,
      translateY: "-98%"
    }
  };

  function handleDrag(e: React.PointerEvent<HTMLDivElement>) {
    dragControls.start(e);
    setDraggingItem(data.id);
  }

  return (
    <ConditionalRender.Provider condition={data.type === "task"}>
      <ConditionalRender.Slot>
        <Reorder.Item value={data} id={data.id} dragListener={false} dragControls={dragControls}>
          <div className={cs([
            "container",
            focusStyle,
            draggingItem !== null ? "dragActive" : null,
            isDragging ? "isDragging" : null,
            data.isChecked ? "isChecked" : null
          ])}>
            <div>
              <Checkbox.Root
                id={data.id}
                className={s.boxCheckbox}
                checked={data.isChecked as boolean}
                onCheckedChange={() => updateToDoItem(data.id, { isChecked: !data.isChecked })}
              >
                <Checkbox.Indicator className={s.checkBoxIndicator}>
                  <img
                    src="/check.svg"
                    alt="Check"
                  />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
            {data.isPriority && <img className={s.priorityIndicator} src="/flag-fill.svg" alt="Priority" />}
            <p className={s.taskTitle} onClick={() => setFocusedItem(data.id)}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setDraggingItem(null)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            <AnimatePresence initial={false}>
              {isFocused && (
                <motion.div
                  initial="enter"
                  animate="present"
                  exit="exit"
                  transition={{
                    duration: 0.1
                  }}
                  variants={actionsBarAnimationVariants}
                  className={s.actionsBarWrapper}
                >
                  <ActionsBar
                    itemId={data.id}
                    isHeading={false}
                    isPriority={data.isPriority as boolean}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reorder.Item>
      </ConditionalRender.Slot>
      <ConditionalRender.Fallback>
        <Reorder.Item value={data} id={data.id}>
          <div className={cs([
            "container",
            "isHeading",
            isDragging ? "isDragging" : null,
            focusStyle
          ])}>
            <span className={s.headingIcon}>#</span>
            <p className={s.headingTitle} onClick={() => setFocusedItem(data.id)}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setDraggingItem(null)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            <AnimatePresence initial={false}>
              {isFocused && (
                <motion.div
                  initial="enter"
                  animate="present"
                  exit="exit"
                  transition={{
                    duration: 0.1
                  }}
                  variants={actionsBarAnimationVariants}
                  className={s.actionsBarWrapper}
                >
                  <ActionsBar
                    itemId={data.id}
                    isHeading={true}
                    isPriority={data.isPriority as boolean}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reorder.Item>
      </ConditionalRender.Fallback>
    </ConditionalRender.Provider>
  );
};
