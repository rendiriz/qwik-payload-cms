import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { Gutter } from '~/components/gutter';
import { VerticalPadding } from '~/components/vertical-padding';
import Image from '~/media/voicu-apostol-Cy1F3H1X3WI-unsplash.jpg?jsx';

export default component$(() => {
  return (
    <>
      <VerticalPadding>
        <Gutter class="relative overflow-hidden">
          <div class="relative">
            <h1 class="mt-0">Seamlessly revolutionize maintainable.</h1>
            <p class="my-8 md:my-6">
              Appropriately initiate focused innovation before adaptive markets.
              Phosfluorescently restore cost effective networks with backend
              communities.
            </p>
          </div>
          <div>
            <Image />
          </div>
        </Gutter>
      </VerticalPadding>

      <VerticalPadding
        top="none"
        bottom="large"
      >
        <Gutter class="relative overflow-hidden">
          Dynamically facilitate scalable materials and process-centric
          information. Synergistically pursue go forward benefits rather than
          top-line markets. Professionally pursue diverse e-business with
          magnetic interfaces. Phosfluorescently monetize cross-platform ideas
          vis-a-vis multifunctional niches. Rapidiously pursue state of the art
          users after world-class vortals. Compellingly cultivate superior
          communities with state of the art total linkage. Authoritatively
          syndicate empowered technologies and future-proof customer service.
          Efficiently facilitate fully researched users via customized
          outsourcing. Continually innovate go forward intellectual capital
          through functionalized e-services. Globally optimize functional
          customer service vis-a-vis ethical catalysts for change. Assertively
          maintain long-term high-impact e-markets rather than proactive web
          services. Efficiently evolve bricks-and-clicks methodologies and
          premium e-tailers. Enthusiastically synthesize long-term high-impact
          quality vectors through enterprise web-readiness. Interactively engage
          long-term high-impact total linkage for sticky methodologies.
          Efficiently create corporate infomediaries rather than technically
          sound initiatives. Competently target clicks-and-mortar markets for
          sustainable expertise. Credibly.
        </Gutter>
      </VerticalPadding>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Payload CMS',
  meta: [
    {
      name: 'description',
      content: 'Qwik Payload CMS description',
    },
  ],
};
