import { render, unsafe } from '@nanoweb/jsx';

export const getRichTextElementRenderer = (fn: (chunk: string) => JSX.Element) => async (chunk: string) =>
  unsafe((await render(fn(chunk))).substring(15));

export const defaultRichTextElements = Object.fromEntries(
  Object.entries({
    b: (chunk: string) => <span class="font-bold">{chunk}</span>
  }).map(([key, value]) => [key, getRichTextElementRenderer(value) as any])
);
