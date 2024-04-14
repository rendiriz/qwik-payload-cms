import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import qs from 'qs';
import { PostHero } from '~/components/post-hero';
import { Blocks } from '~/components/blocks';

export const usePost = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;

  const stringifiedQuery = qs.stringify(
    {
      limit: 1,
      where: { slug: { equals: slug } },
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(
    `${import.meta.env.PUBLIC_API_URL}/posts?${stringifiedQuery}`,
    {
      headers: { Accept: 'application/json' },
    },
  );
  const data = await response.json();
  return data.docs[0];
});

export default component$(() => {
  const post = usePost();

  return (
    <>
      <PostHero post={post.value} />
      <Blocks blocks={post.value.layout} />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);

  return {
    title: post.title,
    meta: [
      {
        name: 'description',
        content: post.meta.description,
      },
    ],
  };
};
