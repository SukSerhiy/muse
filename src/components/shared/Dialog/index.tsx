'use client';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  trigger?: ReactNode;
  content?: ReactNode;
  open?: boolean;
  title?: string;
  description?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const CustomDialog: FC<Props> = ({
  trigger,
  content,
  title,
  description,
  open,
  setOpen,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => {
        setOpen?.(_open);
      }}
    >
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
