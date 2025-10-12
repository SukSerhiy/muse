/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema as formSchema } from '@/lib/validation';

import SocialLogin from './SocialLogin';

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const router = useRouter();

  const [serverError, setServerError] = useState('');

  const { update } = useSession();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (response.error) {
        console.error(response.error);
        setServerError(response.error);
      } else {
        update();
        router.push('/');
      }
    } catch (e: unknown) {
      setServerError('Check your Credentials');
      console.error(e);
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    // if (!isValid) return;
    const formData = new FormData();
    const { email, password } = values;
    formData.append('email', email);
    formData.append('password', password);
    // action(formData);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
        <div className="my-2 flex items-center justify-center">
          <SocialLogin />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </Form>
      <div className="text-xl text-red-500">{serverError}</div>
    </>
  );
};

export default LoginForm;
