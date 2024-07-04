export type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name' | 'id' | 'placeholder' | 'class' | 'style'
> & { name: string; label: string };

const Input = ({ name, label, ...rest }: InputProps) => (
  <input
    name={name}
    id={name}
    placeholder={label}
    class="w-full rounded-md border border-slate-200 px-3 py-2 placeholder-slate-300"
    {...rest}
  />
);

export default Input;
