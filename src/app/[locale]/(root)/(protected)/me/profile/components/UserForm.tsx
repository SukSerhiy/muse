/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { editProfileSchema as formSchema } from '@/lib/validation';

const UserForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: null,
      dateOfBirth: null,
      country: null,
      bio: null,
    },
  });

  const { handleSubmit, setError, reset } = form;

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
      if (state.success) {
        reset();
        toast('Sign Up Successfully Completed!');
      }
    }
  }, [state, isLoadingState, setError, reset]);

  const onSubmit = handleSubmit(async (values) => {
    // if (!isValid) return;
    // const formData = new FormData();
    // const { name, email, password } = values;
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('password', password);
    // action(formData);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            defaultValue={state.fields?.name}
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
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) =>
                      field.onChange(val === 'not_specified' ? null : val)
                    }
                    defaultValue={field.value ?? 'not_specified'}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="not_specified" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Not specified
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            defaultValue={state.fields?.country}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your country..."
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            defaultValue={state.fields?.country}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter something about yourself..."
                    {...field}
                    value={field.value ?? ''}
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
    </Form>
  );
};

export default UserForm;
