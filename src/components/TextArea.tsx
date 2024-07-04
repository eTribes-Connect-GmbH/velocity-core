export type TextAreaProps = Omit<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  'name' | 'id' | 'placeholder' | 'class' | 'style'
> & { name: string; label: string };

const TextArea = ({ name, label, ...rest }: TextAreaProps) => (
  <textarea
    name={name}
    id={name}
    placeholder={label}
    class="h-28 w-full rounded-md border border-slate-200 px-3 py-2 placeholder-slate-300"
    {...rest}
  />
);

export default TextArea;
