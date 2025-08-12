'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from 'lucide-react';

const ModeToggle = () => {
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
      className="focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-4xl"
      onClick={handleClick}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ModeToggle;
