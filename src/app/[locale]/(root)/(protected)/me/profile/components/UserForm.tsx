'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { FC, useActionState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import countryList from 'react-select-country-list';
import { toast } from 'sonner';
import * as z from 'zod';

import { editProfile } from '@/app/actions/profile.actions';
import Select from '@/components/shared/Select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Gender } from '@/lib/types';
import { cn } from '@/lib/utils';
import { editProfileSchema as formSchema } from '@/lib/validation';

type UserFormProps = {
  user: User;
};

const UserForm: FC<UserFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? '',
      gender: (user.gender as Gender) ?? null,
      dob: user.dob ? new Date(user.dob) : null,
      country: user.country ?? null,
      bio: user.bio ?? '',
    },
  });

  const options = useMemo(() => countryList().getData(), []).map(
    ({ value, label }) => ({
      value,
      renderItem: label,
    })
  );

  const { handleSubmit, setError, reset, resetField } = form;

  const [state, action, isLoadingState] = useActionState(editProfile, {
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
        toast('Profile successfully edited');
      }
    }
  }, [state, isLoadingState, setError, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // if (!isValid) return;
    const formData = new FormData();
    const { name, dob, country, gender, bio } = values;
    if (name != null) formData.append('name', name);
    if (gender != null) formData.append('gender', gender);
    if (dob != null) formData.append('dob', dob.toISOString());
    if (country != null) formData.append('country', country);
    if (bio != null) formData.append('bio', bio);

    action(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            defaultValue={state.fields?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your nickname..."
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
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) =>
                      field.onChange(val === 'not_specified' ? null : val)
                    }
                    defaultValue={field.value ?? 'not_specified'}
                    className="flex flex-col"
                  >
                    <FormItem className="flex w-fit cursor-pointer items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="not_specified" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Not specified
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex w-fit cursor-pointer items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex w-fit cursor-pointer items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Female
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex w-fit cursor-pointer items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="other" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Other
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <div className="ml-auto flex items-center gap-1 opacity-50">
                              <CalendarIcon className="h-4 w-4" />
                            </div>
                          </Button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              resetField('dob');
                            }}
                          >
                            <X className="ml-auto h-4 w-4" />
                          </button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="country"
            defaultValue={state.fields?.country}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value ?? ''}
                    options={options}
                    placeholder="Enter your country..."
                    className="w-full"
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
                  <Textarea
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
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="mt-6 w-full flex-1"
            type="button"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoadingState}
            className="mt-6 w-full flex-1"
            type="submit"
          >
            {isLoadingState ? 'Sending...' : 'Sign up'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
