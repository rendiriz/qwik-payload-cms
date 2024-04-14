import { component$, Slot } from '@builder.io/qwik';

import { cn } from '~/utils/cn';

type Props = {
  class?: string;
  left?: boolean;
  right?: boolean;
};

export const Gutter = component$<Props>(
  ({ class: className, left = true, right = true }) => {
    return (
      <div
        class={cn(
          'mx-auto max-w-screen-2xl',
          left && 'pl-6 lg:pl-24 xl:pl-48',
          right && 'pr-6 lg:pr-24 xl:pr-48',
          className,
        )}
      >
        <Slot />
      </div>
    );
  },
);
