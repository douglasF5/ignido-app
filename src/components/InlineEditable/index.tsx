import s from './styles.module.scss';
import TextareaAutosize from '@mui/base/TextareaAutosize';
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
}: InlineEditableProps, ref: ForwardedRef<HTMLTextAreaElement>) => {

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  return (
    <TextareaAutosize
      autoCapitalize='false'
      autoComplete='false'
      autoCorrect='false'
      ref={ref}
      readOnly={!isActive}
      className={[s.input, className].join(" ")}
      aria-label={fieldName}
      name={fieldName}
      value={value}
      onChange={handleChange}
      onClick={handleClick}
      placeholder={`New ${placeholder}`}
    />
  );
});
