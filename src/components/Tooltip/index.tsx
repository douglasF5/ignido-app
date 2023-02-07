import { ReactNode } from 'react';
import s from './styles.module.scss';
import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TooltipProps {
  label: string;
  description?: string;
  children: ReactNode;
  renderFlag: boolean | "always";
}

export function Tooltip({ label, children, renderFlag, description }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          {(!renderFlag || renderFlag === "always") && (
            <RadixTooltip.Content className={s.tooltipContent} sideOffset={10}>
              <div className={s.containerTooltip}>
                <p className={s.labelTooltip}>{label}</p>
                {description && (<p className={s.descriptionTooltip}>{description}</p>)}
              </div>
            </RadixTooltip.Content>
          )}
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
