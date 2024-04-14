import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import { RouterHead } from '~/components/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Marcellus&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <RouterHead />
      </head>
      <body
        lang="en"
        class="bg-neutral-50 text-base leading-6 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 md:text-lg md:leading-8"
      >
        <RouterOutlet />
        <ServiceWorkerRegister />

        <script
          dangerouslySetInnerHTML={`
            (function() {
              function setTheme(theme) {
                document.documentElement.className = theme;
                localStorage.setItem('theme', theme);
              }
              var theme = localStorage.getItem('theme');
              if (theme) {
                setTheme(theme);
              } else {
                setTheme('light');
              }
            })();
          `}
        ></script>
      </body>
    </QwikCityProvider>
  );
});
