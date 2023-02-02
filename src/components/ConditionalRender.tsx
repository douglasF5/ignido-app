import { ReactNode } from 'react';

interface ConditionalRenderElementsProps {
  children: ReactNode;
}

interface ConditionalRenderProps {
  condition: boolean;
  children: ReactNode;
}

export function ConditionalRenderProvider({ condition, children }: ConditionalRenderProps) {
  const childrenAsArray = children as Array<ReactNode>;
  return (<>
    {childrenAsArray[1]
      ? condition ? childrenAsArray[0] : childrenAsArray[1]
      : condition && childrenAsArray}
  </>
  );
}

export function ConditionalRenderSlot({ children }: ConditionalRenderElementsProps) {
  return <>{children}</>;
}

export function ConditionalRenderFallback({ children }: ConditionalRenderElementsProps) {
  return <>{children}</>;
}

export const ConditionalRender = {
  Provider: ConditionalRenderProvider,
  Slot: ConditionalRenderSlot,
  Fallback: ConditionalRenderFallback,
};