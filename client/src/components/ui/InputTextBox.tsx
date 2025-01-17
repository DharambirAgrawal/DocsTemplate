interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'; // Specify allowed input types
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon component passed as a prop
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
disabled = false,
  icon: Icon,
  className = '',
}) => {
  return (
    <div className={`mb-5 ${className}`}>
      <label
        htmlFor={name}
        className="mb-2.5 block font-medium text-dark dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {Icon && (
          <span className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer">
            <Icon />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
