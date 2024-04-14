import { component$, Slot } from '@builder.io/qwik';

export const Label = component$(() => {
  return (
    <p class="text-sm uppercase xl:text-base">
      <Slot />
    </p>
  );
});
