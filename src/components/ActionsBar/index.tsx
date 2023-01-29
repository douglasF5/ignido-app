import { useToDoContent } from '../../TodoContext';
import s from './styles.module.scss';

interface ActionsBarProps {
  itemId: string;
}

export function ActionsBar({ itemId }: ActionsBarProps) {
  const { blurToDoItem, duplicateToDoItem, deleteToDoItem } = useToDoContent();

  function handleDeleteToDoItem() {
    deleteToDoItem(itemId);
    blurToDoItem();
  }

  return (
    <div className={s.container}>
      <button className={s.actionContainer} onClick={() => blurToDoItem()}>
        <img src="/check-green.svg" alt="Close" />
        <span>Close</span>
      </button>
      <button className={s.actionContainer} onClick={() => duplicateToDoItem(itemId)}>
        <img src="/content-copy.svg" alt="Duplicate" />
        <span>Duplicate</span>
      </button>
      <button className={s.actionContainer} onClick={handleDeleteToDoItem}>
        <img src="/delete.svg" alt="Delete" />
        <span>Delete</span>
      </button>
    </div>
  );
};
