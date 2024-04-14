import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import { LuSun, LuMoonStar } from '@qwikest/icons/lucide';

export const ThemeSwitch = component$(() => {
  const theme = useSignal<any>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    theme.value = document.documentElement.className;
  });

  return (
    <button
      id="theme-switch"
      aria-label="Toggle Theme Switcher"
      type="button"
      class="inline-flex items-center justify-center rounded-md p-2"
      onClick$={() => {
        if (theme.value === 'light') {
          document.documentElement.className = 'dark';
          theme.value = 'dark';
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.className = 'light';
          theme.value = 'light';
          localStorage.setItem('theme', 'light');
        }
      }}
    >
      {theme.value === 'dark' ? <LuSun /> : <LuMoonStar />}
    </button>
  );
});
