import { useToDoContent } from '../../TodoContext';
import s from './styles.module.scss';
import { Tooltip } from '../Tooltip';

interface ActionsBarProps {
  itemId: string;
  isHeading: boolean;
  isPriority: boolean;
  onDismiss: () => void;
}

export function ActionsBar({ itemId, isHeading, isPriority, onDismiss }: ActionsBarProps) {
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

  function handleDismissActionsBar() {
    onDismiss();
    setFocusedItem(null);
  }

  return (
    <div className={s.container}>
      <Tooltip
        renderFlag="always"
        label='Save'
        description='Enter'
      >
        <button className={s.actionContainer} onClick={handleDismissActionsBar}>
          <img src="/check-green.svg" alt="Close" />
          <span className={s.actionLabel}>Close</span>
        </button>
      </Tooltip>
      {!isHeading && (
        <Tooltip
          renderFlag="always"
          label='Priority'
          description='Mark as priority'
        >
          <button className={s.actionContainer} onClick={() => updateToDoItem(itemId, { isPriority: !isPriority })}>
            <img src={isPriority ? "/flag-fill.svg" : "/flag-outline.svg"} alt="Priority" />
            <span className={s.actionLabel}>Priority</span>
          </button>
        </Tooltip>
      )}
      <Tooltip
        renderFlag="always"
        label='Duplicate'
        description='Duplicate item'
      >
        <button className={s.actionContainer} onClick={() => duplicateToDoItem(itemId)}>
          <img src="/content-copy.svg" alt="Duplicate" />
          <span className={s.actionLabel}>Duplicate</span>
        </button>
      </Tooltip>
      <Tooltip
        renderFlag="always"
        label='Delete'
        description='Delete item'
      >
        <button className={s.actionContainer} onClick={handleDeleteToDoItem}>
          <img src="/delete.svg" alt="Delete" />
          <span className={s.actionLabel}>Delete</span>
        </button>
      </Tooltip>
    </div>
  );
};
