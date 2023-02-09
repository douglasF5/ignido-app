import s from './styles.module.scss';
import { FormEvent, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface InlineEditableProps {
  value: string;
  fieldName: string;
  isActive: boolean;
  setValue: (value: string) => void;
  className: string | undefined;
  handleClick: () => void;
}

export const InlineEditable = forwardRef(({
  value,
  fieldName,
  isActive,
  setValue,
  className,
  handleClick
}: InlineEditableProps, ref: ForwardedRef<HTMLInputElement>) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <input
      ref={ref}
      autoFocus
      readOnly={!isActive}
      className={[s.input, className].join(" ")}
      type="text"
      aria-label={fieldName}
      name={fieldName}
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
});
