import { component$ } from '@builder.io/qwik';

import { VerticalPadding } from '~/components/vertical-padding';
import { toKebabCase } from '~/utils/toKebabCase';
import type { VerticalPaddingOptions } from './vertical-padding';
import { ContentBlock } from './blocks/content';
import { ContentMediaBlock } from './blocks/content-media';

const blockComponents: any = {
  archive: 'ArchiveBlock',
  comments: 'CommentsBlock',
  content: ContentBlock,
  contentMedia: ContentMediaBlock,
  cta: 'CallToActionBlock',
  mediaBlock: 'MediaBlock',
  relatedPosts: 'RelatedPosts',
};

type Props = {
  blocks?: any;
  disableTopPadding?: boolean;
};

export const Blocks = component$<Props>(({ blocks, disableTopPadding }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta'
                ? block.invertBackground
                : false;
            const prevBlock = blocks[index - 1];

            const prevBlockInverted =
              prevBlock &&
              'invertBackground' in prevBlock &&
              prevBlock?.invertBackground;

            const isPrevSame =
              Boolean(blockIsInverted) === Boolean(prevBlockInverted);

            let paddingTop: VerticalPaddingOptions = 'large';
            let paddingBottom: VerticalPaddingOptions = 'large';

            if (prevBlock && isPrevSame) {
              paddingTop = 'none';
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large';
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none';
            }

            if (Block) {
              return (
                <VerticalPadding
                  key={index}
                  bottom={paddingBottom}
                  top={paddingTop}
                >
                  <Block
                    id={toKebabCase(blockName)}
                    {...block}
                  />
                </VerticalPadding>
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
});
