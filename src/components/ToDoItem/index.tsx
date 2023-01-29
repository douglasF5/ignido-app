import s from './styles.module.scss';
import { composeClassNames } from '../../utils';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useToDoContent } from '../../TodoContext';
import { ActionsBar } from '../ActionsBar';

interface ToDoItemProps {
  data: {
    id: string;
    type: "task" | "heading";
    title: string;
    isChecked: boolean | null;
    actions: string[] | null;
  };
  isFocused: boolean;
  handleClick: () => void;
}

export function ToDoItem({ data, handleClick, isFocused }: ToDoItemProps) {
  const { toggleToDoCheck } = useToDoContent();
  const focusStyle = isFocused ? s.isFocused : null;
  const headingStyles = composeClassNames([s.container, s.isHeading, focusStyle]);
  const taskStyles = composeClassNames([
    s.container,
    focusStyle,
    data.isChecked ? s.isChecked : null
  ]);

  return (
    data.type === "task"
      ? (
        <div className={taskStyles}>
          <div>
            <Checkbox.Root id={data.id} className={s.boxCheckbox} checked={data.isChecked as boolean} onCheckedChange={() => toggleToDoCheck(data.id)}>
              <Checkbox.Indicator className={s.checkBoxIndicator}>
                <img src="/check.svg" alt="Check" />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
          <p className={s.taskTitle} onClick={handleClick}>{data.title}</p>
          {isFocused && (
            <div className={s.actionsBarWrapper}>
              <ActionsBar itemId={data.id} />
            </div>
          )}
        </div>
      )
      : (
        <div className={headingStyles}>
          <span className={s.headingIcon}>#</span>
          <p className={s.headingTitle} onClick={handleClick}>{data.title}</p>
          {isFocused && (
            <div className={s.actionsBarWrapper}>
              <ActionsBar itemId={data.id} />
            </div>
          )}
        </div>
      )
  );
};
