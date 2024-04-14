import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { Image } from '@unpic/qwik';
import { cn } from '~/utils/cn';

type Props = {
  class?: string;
  doc?: any;
  relationTo?: 'posts';
  alignItems?: 'center';
  hideImagesOnMobile?: boolean;
  orientation?: 'horizontal' | 'vertical';
  showCategories?: boolean;
  title?: string;
};

export const Card = component$<Props>(
  ({
    class: className,
    doc,
    relationTo,
    // alignItems = 'center',
    // hideImagesOnMobile = false,
    orientation = 'vertical',
    showCategories = false,
    title: titleFromProps,
  }) => {
    const { categories, meta, slug, title } = doc || {};
    const { description, image: metaImage } = meta || {};

    const hasCategories =
      categories && Array.isArray(categories) && categories.length > 0;
    const titleToUse = titleFromProps || title;
    const sanitizedDescription = description?.replace(/\s/g, ' '); // replace non-breaking space with white space
    const href = `/${relationTo}/${slug}`;

    return (
      <div
        class={cn(
          'flex h-full flex-col rounded border border-neutral-300 dark:border-neutral-800',
          orientation === 'horizontal' && 'flex-row',
          orientation === 'vertical' && 'flex-col',
          className,
        )}
      >
        <Link
          class="relative block aspect-[1.5/1] no-underline"
          href={href}
        >
          {!metaImage && (
            <div class="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-950">
              No image
            </div>
          )}
          {metaImage && typeof metaImage !== 'string' && (
            <Image
              src={metaImage.url}
              layout="constrained"
              width={metaImage.width}
              height={metaImage.height}
              alt={metaImage.alt}
            />
          )}
        </Link>

        <div class="flex flex-grow flex-col gap-1.5 p-3 md:gap-3 md:p-6">
          {showCategories && hasCategories && (
            <div class="flex gap-6 text-sm uppercase md:text-base">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    const { title: titleFromCategory } = category;

                    const categoryTitle =
                      titleFromCategory || 'Untitled category';

                    const isLast = index === categories.length - 1;

                    return (
                      <span key={index}>
                        {categoryTitle}
                        {!isLast && ', &nbsp;'}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {titleToUse && (
            <h4 class="m-0">
              <Link
                class="no-underline"
                href={href}
              >
                {titleToUse}
              </Link>
            </h4>
          )}
          {description && (
            <div class="flex-grow">
              {description && <p class="m-0">{sanitizedDescription}</p>}
            </div>
          )}
        </div>
      </div>
    );
  },
);
