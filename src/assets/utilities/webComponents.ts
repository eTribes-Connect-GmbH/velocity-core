const defineComponent = <N extends string, C extends CustomElementConstructor>(name: N, component: C) => {
  if (!customElements.get(name)) {
    customElements.define(name, component);
  }
  return component;
};

type SFC<T> = (self: HTMLElement, props: T) => void | (() => void) | Promise<void | (() => void)>;
type A<T> = {
  [P in keyof T]: T[P] extends true | undefined
    ? true | undefined
    : Exclude<T[P], undefined> extends string
      ? T[P]
      : string;
};
export const component =
  <N extends string>(name: N) =>
  <T extends Record<string, any>>(c: SFC<A<T>>) => {
    const componentClass = class extends HTMLElement {
      static formAssociated = true;
      private disconnect: void | (() => void) = undefined;
      async connectedCallback() {
        const callback = await c(
          this,
          new Proxy({} as T, { get: (_, prop: string) => this.getAttribute(prop) ?? this.hasAttribute(prop) })
        );
        if (callback) {
          this.disconnect = callback;
        }
      }
      disconnectedCallback() {
        this.disconnect?.();
      }
    };
    return { [name]: defineComponent(name, componentClass) } as unknown as Record<N, CustomElement<HTMLElement, T>>;
  };

export const html = <T extends Element>(raw: TemplateStringsArray, ...exp: (string | number)[]): T =>
  (new DOMParser().parseFromString(raw[0] + exp.map((item, index) => item + raw[index + 1]).join(''), 'text/html').body
    .firstElementChild ?? new Element()) as T;
