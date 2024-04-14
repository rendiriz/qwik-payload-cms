import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { Gutter } from '~/components/gutter';
import { ThemeSwitch } from '~/components/theme-switch';

export const Header = component$(() => {
  return (
    <header class="px-0 py-6">
      <Gutter class="flex flex-wrap justify-between gap-x-6 gap-y-3">
        <Link href="/">
          <img
            alt="Payload Logo"
            class="w-[150px] invert dark:invert-0"
            src="https://raw.githubusercontent.com/payloadcms/payload/master/src/admin/assets/images/payload-logo-light.svg"
            width="150"
            height="38"
          />
        </Link>

        <nav class="visible flex flex-wrap items-center gap-x-6 gap-y-3 opacity-100 transition-opacity duration-100 ease-linear">
          <Link href="/posts">Posts</Link>
          <ThemeSwitch />
        </nav>
      </Gutter>
    </header>
  );
});
