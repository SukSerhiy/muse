'use client';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

import withAuth from '@/components/hoc/withAuth';
import { Button } from '@/components/ui/button';

import { LikeButtonProps } from './types';

const LikeButton: FC<LikeButtonProps> = ({ isActive, isDislike, onClick }) => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorFill = theme === 'light' ? '#708090' : 'white';

  const fill = isActive ? colorFill : 'none';

  return (
    <Button
      variant="ghost"
      className="active:bg-accent dark:active:bg-accent/50 h-10 w-10 rounded-full hover:bg-transparent"
      onClick={onClick}
    >
      {isDislike ? (
        <ThumbsDown className="!size-6" fill={mounted ? fill : 'none'} />
      ) : (
        <ThumbsUp className="!size-6" fill={mounted ? fill : 'none'} />
      )}
    </Button>
  );
};

export default withAuth(LikeButton);
