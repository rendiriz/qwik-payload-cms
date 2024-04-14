import { component$, Slot } from '@builder.io/qwik';

export const LargeBody = component$(() => {
  return (
    <p class="text-xl xl:text-2xl">
      <Slot />
    </p>
  );
});
