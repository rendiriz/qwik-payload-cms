import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

import { Gutter } from '~/components/gutter';
import { RichText } from '~/components/rich-text/rich-text';
import { cn } from '~/utils/cn';

type Props = Extract<any, { blockType: 'contentMedia' }>;

export const ContentMediaBlock = component$<Props>(
  ({ media, mediaPosition = 'left', richText }) => {
    let caption;
    if (media && typeof media === 'object') caption = media.caption;

    return (
      <Gutter>
        <div
          class={cn(
            'relative flex w-full flex-col items-center gap-8 lg:gap-12 xl:flex-row xl:gap-16',
            mediaPosition === 'left' && 'flex-col-reverse xl:flex-row-reverse',
          )}
        >
          <div class="w-[unset] xl:w-1/2">
            <RichText content={richText} />
          </div>
          <div class="w-[unset] xl:w-1/2">
            <Image
              src={media.url}
              layout="constrained"
              aspectRatio={5 / 4}
              width={media.width}
              height={media.height}
              alt={media.alt}
            />
            {caption && (
              <RichText
                class="mt-2"
                content={caption}
              />
            )}
          </div>
        </div>
      </Gutter>
    );
  },
);
