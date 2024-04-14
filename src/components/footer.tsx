import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { Gutter } from '~/components/gutter';

export const Footer = component$(() => {
  return (
    <footer class="bg-neutral-100 px-0 py-16 dark:bg-neutral-950">
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
          <a
            href="https://github.com/rendiriz/qwik-payload"
            target="_blank"
          >
            Github
          </a>
        </nav>
      </Gutter>
    </footer>
  );
});
