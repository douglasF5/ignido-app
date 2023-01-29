import s from './styles.module.scss';
import { composeClassNames } from '../../utils';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useToDoContent } from '../../TodoContext';

interface ToDoItemProps {
  data: {
    id: string;
    type: "task" | "heading";
    title: string;
    isChecked: boolean | null;
    actions: string[] | null;
  };
}

export function ToDoItem({ data }: ToDoItemProps) {
  const { toggleToDoCheck } = useToDoContent();
  const headingStyles = composeClassNames([s.container, s.isHeading]);
  const taskStyles = composeClassNames([
    s.container,
    data.isChecked ? s.isChecked : null
  ]);

  return (
    data.type === "task"
      ? (
        <div className={taskStyles}>
          <div>
            <Checkbox.Root className={s.boxCheckbox} checked={data.isChecked as boolean} onCheckedChange={() => toggleToDoCheck(data.id)}>
              <Checkbox.Indicator className={s.checkBoxIndicator}>
                <img src="/check.svg" alt="Check" />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
          <p>{data.title}</p>
        </div>
      )
      : (
        <div className={headingStyles}>
          <span className={s.headingIcon}>#</span>
          <p className={s.headingTitle}>{data.title}</p>
        </div>
      )
  );
};
