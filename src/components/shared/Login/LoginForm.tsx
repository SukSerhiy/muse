'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

  const t = useTranslations();

  const { handleSubmit } = form;

  const submitRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const { update } = useSession();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // if (!isValid) return;
    const { email, password } = values;

    startTransition(async () => {
      try {
        const response = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (response.error) {
          if (response.error === 'Configuration') {
            toast(t('Errors.invalid_credentials'));
          } else {
            toast(t('Errors.default'));
          }
          console.error(response.error);
        } else {
          update();
          router.push('/');
        }
      } catch (e: unknown) {
        toast(t('Errors.default'));
        if (e instanceof Error) {
          console.error(e.message);
        } else {
          console.error(e);
        }
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('SignIn.Form.Fields.Email.title')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('SignIn.Form.Fields.Email.placeholder')}
                      {...field}
                    />
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
                  <FormLabel>
                    {t('SignIn.Form.Fields.Password.title')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('SignIn.Form.Fields.Password.placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button
            ref={submitRef}
            type="submit"
            disabled={isPending}
            className="hidden"
          />
        </form>
        <div className="my-2 flex items-center justify-center">
          <SocialLogin />
        </div>
        <Button
          className="w-full"
          type="button"
          disabled={isPending}
          onClick={() => {
            submitRef.current?.click();
          }}
        >
          {t(`SignIn.Form.SubmitBtn.${isPending ? 'loading' : 'title'}`)}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
