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
    actions: string[] | null;
  };
  isFocused: boolean;
  handleClick: () => void;
}

export function ToDoItem({ data, handleClick, isFocused }: ToDoItemProps) {
  const { toggleToDoCheck } = useToDoContent();
  const cs = useComposableStyles(s);
  // const [inputToDoItemTitle, setInputToDoItemTitle] = useState(data.title);
  const focusStyle = isFocused ? "isFocused" : null;
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  function handleDrag(e: React.PointerEvent<HTMLDivElement>) {
    dragControls.start(e);
    setIsDragging(true);
  }

  return (
    <ConditionalRender.Provider condition={data.type === "task"}>
      <ConditionalRender.Slot>
        <Reorder.Item value={data} id={data.id} dragListener={false} dragControls={dragControls}>
          <div className={cs([
            "container",
            focusStyle,
            isDragging ? "isDragging" : null,
            data.isChecked ? "isChecked" : null
          ])}>
            <div>
              <Checkbox.Root id={data.id} className={s.boxCheckbox} checked={data.isChecked as boolean} onCheckedChange={() => toggleToDoCheck(data.id)}>
                <Checkbox.Indicator className={s.checkBoxIndicator}>
                  <img src="/check.svg" alt="Check" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
            {data.isPriority && <img className={s.priorityIndicator} src="/flag-fill.svg" alt="Priority" />}
            <p className={s.taskTitle} onClick={handleClick}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setIsDragging(false)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            {isFocused && (
              <div className={s.actionsBarWrapper}>
                <ActionsBar itemId={data.id} />
              </div>
            )}
          </div>
        </Reorder.Item>
      </ConditionalRender.Slot>
      <ConditionalRender.Fallback>
        <Reorder.Item value={data} id={data.id}>
          <div className={cs(["container", "isHeading", focusStyle])}>
            <span className={s.headingIcon}>#</span>
            <p className={s.headingTitle} onClick={handleClick}>{data.title}</p>
            <div className={s.dragIndicator} onPointerDown={(e) => handleDrag(e)} onPointerUp={() => setIsDragging(false)}>
              <img src="/drag-indicator.svg" alt="Drag indicator" />
            </div>
            {isFocused && (
              <div className={s.actionsBarWrapper}>
                <ActionsBar itemId={data.id} />
              </div>
            )}
          </div>
        </Reorder.Item>
      </ConditionalRender.Fallback>
    </ConditionalRender.Provider>
  );
};
