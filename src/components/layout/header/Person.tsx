'use client';
import { ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Dropdown } from '@/components/shared/Dropdown';
import { Separator } from '@/components/ui/separator';

const imagePlug = '/images/boy.png';

const Person = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  const { update, data } = session;

  const { image } = data?.user || {};

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      update();
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <Dropdown
      trigger={
        <div className="hover:bg-accent group flex cursor-pointer items-center gap-1 rounded-xl p-1">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <div className="absolute inset-1 overflow-hidden rounded-full">
              <Image
                src={image || imagePlug}
                alt="person"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="ml-2 h-10">
            <Separator
              orientation="vertical"
              className="w-0 opacity-0 transition-all duration-300 group-hover:w-px group-hover:opacity-100"
            />
          </div>
          <ChevronDown
            height={20}
            className={`${open ? 'rotate-180' : ''} transform transition-all duration-300`}
          />
        </div>
      }
      open={open}
      setOpen={setOpen}
      title="My account"
      renderItems={[
        {
          key: 1,
          el: (
            <Link className="w-full" href="/me/profile">
              Profile
            </Link>
          ),
        },
        {
          key: 2,
          el: (
            <Link className="w-full" href="/me/likes">
              Likes
            </Link>
          ),
        },
        {
          key: 3,
          el: (
            <button
              onClick={handleLogout}
              className="w-full text-left"
              type="button"
            >
              Log out
            </button>
          ),
        },
      ]}
    />
  );
};

export default Person;
