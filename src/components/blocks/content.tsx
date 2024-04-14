import { component$ } from '@builder.io/qwik';

import { Gutter } from '~/components/gutter';
import { RichText } from '~/components/rich-text/rich-text';
import { cn } from '~/utils/cn';

type Props = Extract<any, { blockType: 'content' }>;

export const ContentBlock = component$<Props>(({ columns }) => {
  return (
    <Gutter>
      <div class="grid grid-cols-6 gap-x-6 gap-y-3 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
        {columns &&
          columns.length > 0 &&
          columns.map((col: any, index: number) => {
            const { richText, size } = col;

            return (
              <div
                class={cn(
                  'col-end-[span_6] lg:col-end-[span_12]',
                  size === 'full' && 'col-end-[span_12]',
                  size === 'twoThirds' && 'col-end-[span_8]',
                  size === 'half' && 'col-end-[span_6]',
                  size === 'oneThird' && 'col-end-[span_4]',
                )}
                key={index}
              >
                <RichText content={richText} />
              </div>
            );
          })}
      </div>
    </Gutter>
  );
});
