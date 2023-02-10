import { useToDoContent } from '../../TodoContext';
import s from './styles.module.scss';
import { Tooltip } from '../Tooltip';
import * as Menubar from '@radix-ui/react-menubar';

interface ActionsBarProps {
  itemId: string;
  isHeading: boolean;
  isPriority: boolean;
  onDismiss: () => void;
}

type Actions = "save" | "prioritize" | "duplicate" | "delete";

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

  function onPressingEnter(action: Actions) {
    switch (action) {
      case "save":
        handleDismissActionsBar();
        break;
      case "prioritize":
        updateToDoItem(itemId, { isPriority: !isPriority });
        break;
      case "duplicate":
        duplicateToDoItem(itemId);
        break;
      case "delete":
        handleDeleteToDoItem();
        break;
      default:
        handleDismissActionsBar();
    }
  }

  return (
    <>
      <Menubar.Root className={s.container} loop>
        <Menubar.Menu>
          <Menubar.Trigger
            className={s.actionContainer}
            onClick={handleDismissActionsBar}
            onKeyDown={(e) => e.key === "Enter" && onPressingEnter("save")}
          >
            <Tooltip
              renderFlag="always"
              label='Save'
              description='Enter'
            >
              <div>
                <img src="/check-green.svg" alt="Close" />
                <span className={s.actionLabel}>Close</span>
              </div>
            </Tooltip>
          </Menubar.Trigger>
        </Menubar.Menu>
        {!isHeading && (
          <Menubar.Menu>
            <Menubar.Trigger
              className={s.actionContainer}
              onClick={() => updateToDoItem(itemId, { isPriority: !isPriority })}
              onKeyDown={(e) => e.key === "Enter" && onPressingEnter("prioritize")}
            >
              <Tooltip
                renderFlag="always"
                label='Priority'
                description='Mark as priority'
              >
                <div>
                  <img src={isPriority ? "/flag-fill.svg" : "/flag-outline.svg"} alt="Priority" />
                  <span className={s.actionLabel}>Priority</span>
                </div>
              </Tooltip>
            </Menubar.Trigger>
          </Menubar.Menu>
        )}
        <Menubar.Menu>
          <Menubar.Trigger
            className={s.actionContainer}
            onClick={() => duplicateToDoItem(itemId)}
            onKeyDown={(e) => e.key === "Enter" && onPressingEnter("duplicate")}
          >
            <Tooltip
              renderFlag="always"
              label='Duplicate'
              description='Duplicate item'
            >
              <div>
                <img src="/content-copy.svg" alt="Duplicate" />
                <span className={s.actionLabel}>Duplicate</span>
              </div>
            </Tooltip>
          </Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger
            className={s.actionContainer}
            onClick={handleDeleteToDoItem}
            onKeyDown={(e) => e.key === "Enter" && onPressingEnter("delete")}
          >
            <Tooltip
              renderFlag="always"
              label='Delete'
              description='Delete item'
            >
              <div>
                <img src="/delete.svg" alt="Delete" />
                <span className={s.actionLabel}>Delete</span>
              </div>
            </Tooltip>
          </Menubar.Trigger>
        </Menubar.Menu>
      </Menubar.Root>
    </>
  );
};
