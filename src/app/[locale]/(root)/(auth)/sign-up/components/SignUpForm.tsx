'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { signUp } from '@/app/actions/auth.actions';
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
import { signUpSchema } from '@/lib/validation';

const formSchema = signUpSchema
  .extend({
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, setError } = form;

  const [state, action, isLoadingState] = useActionState(signUp, {
    success: false,
  });

  useEffect(() => {
    if (!isLoadingState) {
      if (state.errors instanceof Object) {
        Object.entries(state.errors).forEach(([field, message]) => {
          setError(field as keyof z.infer<typeof formSchema>, {
            type: 'server',
            message: message,
          });
        });
      }
    }
  }, [state, isLoadingState, setError]);

  const onSubmit = handleSubmit(async (values) => {
    // if (!isValid) return;
    const formData = new FormData();
    const { username, email, password } = values;
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    action(formData);
  });

  const notify = () => toast('Wow so easy !');

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            defaultValue={state.fields?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your nickname..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            defaultValue={state.fields?.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue={state.fields?.password}
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoadingState} className="mt-6 w-full" type="submit">
          {isLoadingState ? 'Sending...' : 'Sign up'}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <Button type="button" onClick={notify}>
        Click toast
      </Button>
    </Form>
  );
};

export default SignUpForm;
