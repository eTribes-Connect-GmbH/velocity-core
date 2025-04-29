import TextArea, { TextAreaProps } from './TextArea.js';

const LabeledTextArea = ({ name, label, ...rest }: TextAreaProps) => (
  <div>
    <label for={name} class="mb-1 block text-sm">
      {label}
    </label>
    <TextArea name={name} label={label} {...rest} />
  </div>
);

export default LabeledTextArea;
