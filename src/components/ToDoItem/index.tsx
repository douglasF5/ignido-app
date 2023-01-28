import s from './styles.module.scss';
import { composeClassNames } from '../../utils';
import * as Checkbox from '@radix-ui/react-checkbox';

interface ToDoItemProps {
  data: {
    type: "task" | "heading";
    title: string;
  };
}

export function ToDoItem({ data }: ToDoItemProps) {
  const headingStyles = composeClassNames([s.container, s.isHeading]);

  return (
    data.type === "task"
      ? (
        <div className={s.container}>
          <div>
            <Checkbox.Root className={s.boxCheckbox}>
              <Checkbox.Indicator />
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
