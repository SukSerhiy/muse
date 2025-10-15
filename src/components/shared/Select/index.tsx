import * as SelectPrimitive from '@radix-ui/react-select';
import { FC, ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as ShadSelect,
} from '@/components/ui/select';

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  ControllerRenderProps & {
    trigger?: ReactNode;
    placeholder?: string;
    label?: string;
    className?: string;
    options: {
      value: string;
      renderItem: ReactNode | string;
    }[];
  };

const Select: FC<SelectProps> = ({
  trigger,
  placeholder = '',
  label,
  options,
  className = '',
  onChange,
  ...rest
}) => {
  return (
    <ShadSelect
      {...rest}
      onValueChange={(value: string) => {
        onChange(value);
      }}
    >
      {trigger || (
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map(({ value, renderItem }) => (
            <SelectItem
              key={value}
              value={value}
              onSelect={() => {
                console.log('Select---');
              }}
            >
              {renderItem}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;
