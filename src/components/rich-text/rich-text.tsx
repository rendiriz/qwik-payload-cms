import { component$ } from '@builder.io/qwik';

import { SerializeLexical } from '~/components/rich-text/serialize/serialize-lexical';
import { cn } from '~/utils/cn';

type Props = {
  class?: string;
  content: any;
};

export const RichText = component$<Props>(({ class: className, content }) => {
  if (!content) {
    return null;
  }

  return (
    <div class={cn('first:mt-0 last:mb-0', className)}>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content && (
          <SerializeLexical nodes={content?.root?.children} />
        )}
    </div>
  );
});
