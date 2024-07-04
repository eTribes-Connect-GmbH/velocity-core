type CustomElement<T, P = unknown> = Partial<
  Omit<T, keyof P> & DOMAttributes<Omit<T, keyof P>> & { class: string | false } & { children: any }
> &
  P;

type Id<T> = T;

declare namespace JSX {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface IntrinsicElements {
    ['turbo-frame']: CustomElement<
      HTMLElement,
      Partial<{ target: string; id?: string; src?: string; loading?: 'eager' | 'lazy' }>
    >;
    ['turbo-stream']: CustomElement<HTMLElement, Partial<{ target: string; action: string }>>;
  }
}

declare module '*.svg';
declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
declare module '*.ico';
declare module '*.txt';
declare module '*.html' {
  const content: string;
  export default content;
}
declare module 'bundle:*.entry.js' {
  const content: string;
  export default content;
}
declare module 'bundle:*.entry.css' {
  const content: string;
  export default content;
}

declare const testInceptor: object;

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
