import React, { KeyboardEvent, RefObject, useRef, useState } from 'react';
import { Reorder, useDragControls, motion, AnimatePresence } from "framer-motion";
import s from './styles.module.scss';
import { useComposableStyles } from '../../hooks/useComposableStyles';
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
  listWrapperContraints: RefObject<HTMLElement>;
}

export function ToDoItem({ data, isFocused, isDragging, listWrapperContraints }: ToDoItemProps) {
  const {
    draggingItem,
    setDraggingItem,
    updateToDoItem,
    setFocusedItem,
    deleteToDoItem
  } = useToDoContent();
  const cs = useComposableStyles(s);
  const focusStyle = isFocused ? "isFocused" : null;
  const isHeading = data.type === "heading";
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
          setEditableItemTitle(data.title);
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
    <Reorder.Item
      initial={{ opacity: 0, scale: 0.95, height: 0 }}
      animate={{ opacity: 1, scale: 1, height: "auto" }}
      exit={{ opacity: 0, scale: 0.95, height: 0 }}
      value={data}
      id={data.id}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={listWrapperContraints}
      dragElastic={0.1}
      className={s.itemWrapper}
    >
      <div
        className={cs([
          "container",
          isHeading ? "isHeading" : null,
          focusStyle,
          draggingItem !== null ? "dragActive" : null,
          isDragging ? "isDragging" : null,
          data.isChecked ? "isChecked" : null
        ])}
        onKeyDown={handleKeyboardActions}
      >
        {isHeading && <span className={s.headingIcon}>#</span>}
        {!isHeading && (
          <div>
            <Checkbox.Root
              id={data.id}
              className={s.boxCheckbox}
              checked={data.isChecked as boolean}
              onCheckedChange={() => updateToDoItem(data.id, { isChecked: !data.isChecked })}
              tabIndex={0}
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
        )}
        {data.isPriority && <img className={s.priorityIndicator} src="/flag-fill.svg" alt="Priority" />}
        <InlineEditable
          isActive={isFocused}
          value={editableItemTitle}
          setValue={setEditableItemTitle}
          fieldName="To-do title"
          handleClick={activeItem}
          className={cs(isHeading ? "headingTitle" : "taskTitle")}
          ref={titleInput}
          placeholder={isHeading ? "Heading" : "To-do"}
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
                isHeading={isHeading}
                isPriority={data.isPriority as boolean}
                onDismiss={saveEdits}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reorder.Item>
  );
};
