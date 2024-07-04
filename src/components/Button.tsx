type ButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'class' | 'style'
> & { label: string; iconSrc?: string };

const Button = ({ label, iconSrc, ...rest }: ButtonProps) => (
  <button class="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700" {...rest}>
    {iconSrc && <img src={iconSrc} class="h-6" />}
    <span>{label}</span>
  </button>
);

export default Button;
