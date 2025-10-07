'use client';
import { useRef, useState } from 'react';

import Dialog from '@/components/shared/Dialog';
import ImageCropper from '@/components/shared/ImageCropper';
import { Button } from '@/components/ui/button';

const Avatar = () => {
  const [open, setOpen] = useState(false);
  const avatarUrl = useRef(
    'https://avatarfiles.alphacoders.com/161/161002.jpg'
  );

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div>
      Avatar
      <img
        src={avatarUrl.current}
        alt="Avatar"
        className="h-[150px] w-[150px] rounded-full border-2 border-gray-400"
      />
      <Button onClick={() => setOpen(true)}>Select Image</Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        content={<ImageCropper updateAvatar={updateAvatar} />}
      />
    </div>
  );
};

export default Avatar;
