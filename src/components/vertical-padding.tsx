import { component$, Slot } from '@builder.io/qwik';

import { cn } from '~/utils/cn';

export type VerticalPaddingOptions = 'large' | 'medium' | 'none';

type Props = {
  class?: string;
  top?: VerticalPaddingOptions;
  bottom?: VerticalPaddingOptions;
};

export const VerticalPadding = component$<Props>(
  ({ class: className, top = 'medium', bottom = 'medium' }) => {
    return (
      <div
        class={cn(
          top === 'large' && 'pt-16 md:pt-24 xl:pt-32',
          top === 'medium' && 'pt-8 md:pt-12 xl:pt-16',
          bottom === 'large' && 'pb-16 md:pb-24 xl:pb-32',
          bottom === 'medium' && 'pb-8 md:pb-12 xl:pb-16',
          className,
        )}
      >
        <Slot />
      </div>
    );
  },
);
