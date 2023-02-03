import { useToDoContent } from '../../TodoContext';
import s from './styles.module.scss';

interface ActionsBarProps {
  itemId: string;
  isHeading: boolean;
  isPriority: boolean;
}

export function ActionsBar({ itemId, isHeading, isPriority }: ActionsBarProps) {
  const {
    setFocusedItem,
    duplicateToDoItem,
    deleteToDoItem,
    updateToDoItem
  } = useToDoContent();

  function handleDeleteToDoItem() {
    deleteToDoItem(itemId);
    setFocusedItem(null);
  }

  return (
    <div className={s.container}>
      <button className={s.actionContainer} onClick={() => setFocusedItem(null)}>
        <img src="/check-green.svg" alt="Close" />
        <span className={s.actionLabel}>Close</span>
      </button>
      {!isHeading && (
        <button className={s.actionContainer} onClick={() => updateToDoItem(itemId, { isPriority: !isPriority })}>
          <img src={isPriority ? "/flag-fill.svg" : "/flag-outline.svg"} alt="Priority" />
          <span className={s.actionLabel}>Priority</span>
        </button>
      )}
      <button className={s.actionContainer} onClick={() => duplicateToDoItem(itemId)}>
        <img src="/content-copy.svg" alt="Duplicate" />
        <span className={s.actionLabel}>Duplicate</span>
      </button>
      <button className={s.actionContainer} onClick={handleDeleteToDoItem}>
        <img src="/delete.svg" alt="Delete" />
        <span className={s.actionLabel}>Delete</span>
      </button>
    </div>
  );
};
