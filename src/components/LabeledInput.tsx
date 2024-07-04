import Input, { InputProps } from './Input';

const LabeledInput = ({ name, label, ...rest }: InputProps) => (
  <div>
    <label for={name} class="mb-1 block text-sm">
      {label}
    </label>
    <Input name={name} label={label} {...rest} />
  </div>
);

export default LabeledInput;
