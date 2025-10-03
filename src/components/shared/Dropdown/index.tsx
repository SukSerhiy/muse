import { Dispatch, ReactNode, SetStateAction } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type DropdownProps = {
  trigger?: ReactNode;
  renderItems: {
    key: number | string;
    el: ReactNode;
  }[];
  open?: boolean;
  title?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export function Dropdown({
  trigger,
  title,
  open,
  setOpen,
  renderItems,
}: DropdownProps) {
  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {renderItems?.map((item) => (
            <DropdownMenuItem key={item.key}>{item.el}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
