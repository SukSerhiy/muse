'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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
import { signUpSchema } from '@/lib/validation';

const formSchema = signUpSchema
  .extend({
    confirmPassword: z.string().min(1, 'Validation.confirm_password_required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Validation.passwords_do_not_match',
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const t = useTranslations();

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
        toast(t('SignUp.success'));
      }
    }
  }, [state, isLoadingState, setError, reset, t]);

  const onSubmit = handleSubmit(async (values) => {
    // if (!isValid) return;
    const formData = new FormData();
    const { email, password } = values;
    formData.append('email', email);
    formData.append('password', password);
    action(formData);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            defaultValue={state.fields?.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('SignUp.Form.Fields.Email.title')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('SignUp.Form.Fields.Email.placeholder')}
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
            defaultValue={state.fields?.password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('SignUp.Form.Fields.Password.title')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('SignUp.Form.Fields.Password.placeholder')}
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
                <FormLabel>
                  {t('SignUp.Form.Fields.ConfirmPassword.title')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(
                      'SignUp.Form.Fields.ConfirmPassword.placeholder'
                    )}
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
          {t(`SignUp.Form.SubmitBtn.${isLoadingState ? 'loading' : 'title'}`)}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        {t('SignUp.or')}
      </div>
      <p className="text-muted-foreground mt-2 text-center text-sm">
        {t('SignUp.if_you_have_account')}{' '}
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          {t('SignUp.sign_in')}
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
