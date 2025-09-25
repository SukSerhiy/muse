'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const ModeToggle: FC<Props> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    setTheme((prev) => {
      if (prev === 'dark') {
        return 'light';
      }
      return 'dark';
    });
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        'cursor-pointer text-4xl focus-visible:ring-0 focus-visible:ring-offset-0',
        className
      )}
      onClick={handleClick}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ModeToggle;
