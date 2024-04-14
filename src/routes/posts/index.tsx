import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import qs from 'qs';
import { Gutter } from '~/components/gutter';
import { VerticalPadding } from '~/components/vertical-padding';
import { Card } from '~/components/card';

export const usePosts = routeLoader$(async () => {
  const stringifiedQuery = qs.stringify(
    {
      sort: '-updatedAt',
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/posts?${stringifiedQuery}`,
    {
      headers: { Accept: 'application/json' },
    },
  );
  return await response.json();
});

export default component$(() => {
  const posts = usePosts();

  return (
    <>
      <VerticalPadding>
        <Gutter class="relative overflow-hidden">
          <div class="relative">
            <h1 class="mt-0">All Posts</h1>
            <p class="my-8 md:my-6">
              Appropriately initiate focused innovation before adaptive markets.
              Phosfluorescently restore cost effective networks with backend
              communities.
            </p>
          </div>
        </Gutter>
      </VerticalPadding>

      <VerticalPadding
        top="none"
        bottom="large"
      >
        <Gutter>
          <div class="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-6">
            {posts.value.docs.map((post: any) => (
              <div key={post.id}>
                <Card
                  doc={post}
                  relationTo="posts"
                  showCategories
                />
              </div>
            ))}
          </div>
        </Gutter>
      </VerticalPadding>
    </>
  );
});

export const head: DocumentHead = {
  title: 'All Posts',
  meta: [
    {
      name: 'description',
      content: 'All Posts description',
    },
  ],
};
