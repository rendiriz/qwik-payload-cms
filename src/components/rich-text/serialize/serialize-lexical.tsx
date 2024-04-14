/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import type { SerializedListItemNode, SerializedListNode } from '@lexical/list';
import type { SerializedHeadingNode } from '@lexical/rich-text';
import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical';

import escapeHTML from 'escape-html';

import { Label } from '../../label';
import { LargeBody } from '../../large-body';
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat';

interface Props {
  nodes: SerializedLexicalNode[];
}

export const SerializeLexical = component$<Props>(({ nodes }) => {
  return (
    <>
      {nodes?.map((_node, index): any | null => {
        if (_node.type === 'text') {
          const node = _node as SerializedTextNode;
          let text = <span dangerouslySetInnerHTML={escapeHTML(node.text)} />;
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span
                key={index}
                style={{ textDecoration: 'line-through' }}
              >
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span
                key={index}
                style={{ textDecoration: 'underline' }}
              >
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        if (_node == null) {
          return null;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedElementNode,
        ): any | null => {
          if (node.children == null) {
            return null;
          } else {
            if (
              node?.type === 'list' &&
              (node as SerializedListNode)?.listType === 'check'
            ) {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return <SerializeLexical nodes={node.children} />;
            } else {
              return <SerializeLexical nodes={node.children} />;
            }
          }
        };

        const serializedChildren =
          'children' in _node
            ? serializedChildrenFn(_node as SerializedElementNode)
            : '';

        switch (_node.type) {
          case 'linebreak': {
            return <br key={index} />;
          }
          case 'paragraph': {
            return <p key={index}>{serializedChildren}</p>;
          }
          case 'heading': {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<any, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;
            const Tag = node?.tag as Heading;
            return <Tag key={index}>{serializedChildren}</Tag>;
          }
          case 'label':
            return <Label key={index}>{serializedChildren}</Label>;

          case 'largeBody': {
            return <LargeBody key={index}>{serializedChildren}</LargeBody>;
          }
          case 'list': {
            const node = _node as SerializedListNode;

            type List = Extract<any, 'ol' | 'ul'>;
            const Tag = node?.tag as List;
            return (
              <Tag
                class={node?.listType}
                key={index}
              >
                {serializedChildren}
              </Tag>
            );
          }
          case 'listitem': {
            const node = _node as SerializedListItemNode;

            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  class={`component--list-item-checkbox ${
                    node.checked
                      ? 'component--list-item-checkbox-checked'
                      : 'component--list-item-checked-unchecked'
                  }`}
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            }
          }
          case 'quote': {
            // const node = _node as SerializedQuoteNode

            return <blockquote key={index}>{serializedChildren}</blockquote>;
          }
          case 'link': {
            const node = _node as any;

            const fields: any = node.fields;

            if (fields.linkType === 'custom') {
              // const rel = fields.newTab ? 'noopener noreferrer' : undefined

              return (
                <Link
                  href={escapeHTML(fields.url)}
                  key={index}
                  {...(fields?.newTab
                    ? {
                        rel: 'noopener noreferrer',
                        target: '_blank',
                      }
                    : {})}
                >
                  {serializedChildren}
                </Link>
              );
            } else {
              return <span key={index}>Internal link coming soon</span>;
            }
          }

          default:
            return null;
        }
      })}
    </>
  );
});
