import s from './styles.module.scss';
import { FormEvent, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface InlineEditableProps {
  value: string;
  fieldName: string;
  isActive: boolean;
  className: string | undefined;
  placeholder: string;
  setValue: (value: string) => void;
  handleClick: () => void;
}

export const InlineEditable = forwardRef(({
  value,
  fieldName,
  isActive,
  className,
  placeholder,
  setValue,
  handleClick
}: InlineEditableProps, ref: ForwardedRef<HTMLInputElement>) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <input
      autoCapitalize='false'
      autoComplete='false'
      autoCorrect='false'
      ref={ref}
      readOnly={!isActive}
      className={[s.input, className].join(" ")}
      type="text"
      aria-label={fieldName}
      name={fieldName}
      value={value}
      onChange={handleChange}
      onClick={handleClick}
      placeholder={`New ${placeholder}`}
    />
  );
});
