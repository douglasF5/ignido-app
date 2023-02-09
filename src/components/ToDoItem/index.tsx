import React, { KeyboardEvent, useRef, useState } from 'react';
import { Reorder, useDragControls, motion, AnimatePresence } from "framer-motion";
import s from './styles.module.scss';
import { useComposableStyles } from '../../hooks/useComposableStyles';
import { ConditionalRender } from '../ConditionalRender';
import * as Checkbox from '@radix-ui/react-checkbox';
import { InlineEditable } from '../InlineEditable';
import { Tooltip } from '../Tooltip';
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
    setFocusedItem,
    deleteToDoItem
  } = useToDoContent();
  const cs = useComposableStyles(s);
  const focusStyle = isFocused ? "isFocused" : null;
  const dragControls = useDragControls();
  const [editableItemTitle, setEditableItemTitle] = useState(data.title);
  const titleInput = useRef(null);

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

  function activeItem() {
    if (!isFocused) {
      setFocusedItem(data.id);
    }
  }

  function handleDrag(e: React.PointerEvent<HTMLDivElement>) {
    dragControls.start(e);
    setDraggingItem(data.id);
  }

  function saveEdits() {
    if (data.title !== editableItemTitle) {
      updateToDoItem(data.id, {
        title: editableItemTitle
      });
    }
  }

  function handleKeyboardActions(e: KeyboardEvent) {
    const target = e.target as HTMLElement;

    if (isFocused) {
      switch (e.key) {
        case "Enter":
          saveEdits();
          setFocusedItem(null);
          target.blur();
          break;
        case "Escape":
          saveEdits();
          setFocusedItem(null);
          target.blur();
          break;
      }
    } else {
      switch (e.key) {
        case "Enter":
          setFocusedItem(data.id);
          break;
        case "Escape":
          target.blur();
          break;
        case "Backspace":
          deleteToDoItem(data.id);
          break;
      }
    }
  }

  return (
    <ConditionalRender.Provider condition={data.type === "task"}>
      <ConditionalRender.Slot>
        <Reorder.Item
          value={data}
          style={{ position: "relative", zIndex: 5 }}
          id={data.id}
          dragListener={false}
          dragControls={dragControls}
        >
          <div
            className={cs([
              "container",
              focusStyle,
              draggingItem !== null ? "dragActive" : null,
              isDragging ? "isDragging" : null,
              data.isChecked ? "isChecked" : null
            ])}
            onKeyDown={handleKeyboardActions}
          >
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
              <label className={s.checkboxLabel} htmlFor={data.id}>{data.title}</label>
            </div>
            {data.isPriority && <img className={s.priorityIndicator} src="/flag-fill.svg" alt="Priority" />}
            {/* <p className={s.taskTitle} onClick={() => setFocusedItem(data.id)}>{data.title}</p> */}
            <InlineEditable
              isActive={isFocused}
              value={editableItemTitle}
              setValue={setEditableItemTitle}
              fieldName="To-do title"
              handleClick={activeItem}
              className={s.taskTitle}
              ref={titleInput}
            />
            <Tooltip
              label='Drag to reorder'
              renderFlag={isDragging}
            >
              <div
                className={s.dragIndicator}
                onPointerDown={(e) => handleDrag(e)}
                onPointerUp={() => setDraggingItem(null)}
              >
                <img src="/drag-indicator.svg" alt="Drag indicator" />
              </div>
            </Tooltip>
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
                    onDismiss={saveEdits}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reorder.Item>
      </ConditionalRender.Slot>
      <ConditionalRender.Fallback>
        <Reorder.Item value={data} id={data.id}>
          <div
            className={cs([
              "container",
              "isHeading",
              isDragging ? "isDragging" : null,
              focusStyle
            ])}
            onKeyDown={handleKeyboardActions}
          >
            <span className={s.headingIcon}>#</span>
            <InlineEditable
              isActive={isFocused}
              value={editableItemTitle}
              setValue={setEditableItemTitle}
              fieldName="To-do title"
              handleClick={activeItem}
              className={s.headingTitle}
              ref={titleInput}
            />
            <Tooltip
              label='Drag to reorder'
              renderFlag={isDragging}
            >
              <div
                className={s.dragIndicator}
                onPointerDown={(e) => handleDrag(e)}
                onPointerUp={() => setDraggingItem(null)}
              >
                <img src="/drag-indicator.svg" alt="Drag indicator" />
              </div>
            </Tooltip>
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
                    onDismiss={saveEdits}
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
