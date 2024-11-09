import { render, unsafe } from '@nanoweb/jsx';
import { FormatXMLElementFn } from 'intl-messageformat';

type RichTextElementRenderer = FormatXMLElementFn<string, string>;

export const getRichTextElementRenderer = (fn: (chunk: string) => JSX.Element) =>
  (async (chunk: string) => unsafe((await render(fn(chunk))).substring(15))) as unknown as RichTextElementRenderer;

export const defaultRichTextElements = Object.fromEntries(
  Object.entries({
    b: (chunk: string) => <span class="font-bold">{chunk}</span>
  }).map(([key, value]) => [key, getRichTextElementRenderer(value)])
);
