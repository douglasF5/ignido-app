import React, { useState } from 'react';
import s from './styles.module.scss';
import { Reorder, useDragControls } from "framer-motion";
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
    setDraggingItem,
    updateToDoItem,
    setFocusedItem
  } = useToDoContent();
  const cs = useComposableStyles(s);
  const focusStyle = isFocused ? "isFocused" : null;
  const dragControls = useDragControls();

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
            isDragging !== undefined ? "dragActive" : null,
            isDragging ? "isDragging" : null,
            data.isChecked ? "isChecked" : null
          ])}>
            <div>
              <Checkbox.Root id={data.id} className={s.boxCheckbox} checked={data.isChecked as boolean} onCheckedChange={() => updateToDoItem(data.id, { isChecked: !data.isChecked })}>
                <Checkbox.Indicator className={s.checkBoxIndicator}>
                  <img src="/check.svg" alt="Check" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
            {data.isPriority && <img className={s.priorityIndicator} src="/flag-fill.svg" alt="Priority" />}
            <p className={s.taskTitle} onClick={() => setFocusedItem(data.id)}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setDraggingItem(null)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            {isFocused && (
              <div className={s.actionsBarWrapper}>
                <ActionsBar
                  itemId={data.id}
                  isHeading={false}
                  isPriority={data.isPriority as boolean}
                />
              </div>
            )}
          </div>
        </Reorder.Item>
      </ConditionalRender.Slot>
      <ConditionalRender.Fallback>
        <Reorder.Item value={data} id={data.id}>
          <div className={cs([
            "container",
            "isHeading",
            isDragging !== undefined ? "dragActive" : null,
            isDragging ? "isDragging" : null,
            focusStyle
          ])}>
            <span className={s.headingIcon}>#</span>
            <p className={s.headingTitle} onClick={() => setFocusedItem(data.id)}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setDraggingItem(null)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            {isFocused && (
              <div className={s.actionsBarWrapper}>
                <ActionsBar
                  itemId={data.id}
                  isHeading={true}
                  isPriority={data.isPriority as boolean}
                />
              </div>
            )}
          </div>
        </Reorder.Item>
      </ConditionalRender.Fallback>
    </ConditionalRender.Provider>
  );
};
