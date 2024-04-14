import { component$ } from '@builder.io/qwik';

import { Image } from '@unpic/qwik';
import { Gutter } from '~/components/gutter';
import { formatDateTime } from '~/utils/formatDateTime';

type Props = {
  post?: any;
};

export const PostHero = component$<Props>(({ post }) => {
  const { categories, meta = {}, populatedAuthors, publishedOn, title } = post;

  const { description, image: metaImage } = meta;

  return (
    <Gutter class="flex flex-col gap-6 md:gap-12 xl:flex-row">
      <div class="flex w-full flex-col items-start justify-center gap-3 xl:w-1/2 xl:gap-6">
        <div class="flex gap-6 text-sm uppercase md:text-base">
          <div>
            {categories?.map((category: { title: string }, index: number) => {
              const { title: titleFromCategory } = category;

              const categoryTitle = titleFromCategory || 'Untitled category';

              const isLast = index === categories.length - 1;

              return (
                <span key={index}>
                  {categoryTitle}
                  {!isLast && ', &nbsp;'}
                </span>
              );
            })}
          </div>
        </div>
        <h1>{title}</h1>
        <p class="m-0">
          {populatedAuthors && (
            <>
              {'By '}
              {populatedAuthors.map(
                (author: { name: string }, index: number) => {
                  const { name } = author;

                  const isLast = index === populatedAuthors.length - 1;
                  const secondToLast = index === populatedAuthors.length - 2;

                  return (
                    <span key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && ', '}
                      {secondToLast && populatedAuthors.length === 2 && ' '}
                      {!isLast && populatedAuthors.length > 1 && 'and '}
                    </span>
                  );
                },
              )}
            </>
          )}
          {publishedOn && (
            <>
              {' on '}
              {formatDateTime(publishedOn)}
            </>
          )}
        </p>

        <div>
          <p class="m-0">{`${description ? `${description} ` : ''}`}</p>
        </div>
      </div>

      <div class="w-full xl:w-1/2">
        <div class="relative -ml-[1.5rem] block aspect-[5/4] w-[calc(100%+3rem)] no-underline xl:ml-0 xl:w-full">
          {!metaImage && (
            <div class="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
              No image
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Image
              src={metaImage.url}
              layout="constrained"
              aspectRatio={5 / 4}
              width={metaImage.width}
              height={metaImage.height}
              alt={metaImage.alt}
            />
          )}
        </div>
      </div>
    </Gutter>
  );
});
