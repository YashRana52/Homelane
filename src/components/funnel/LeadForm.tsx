import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

import { brand } from '@/config/brand';
import { cities } from '@/config/nav';
import { leadFormSchema, validateWithSchema, type LeadFormValues } from '@/lib/schemas';
import { slugify } from '@/lib/slugify';
import { Button, Checkbox, Heading, Input, Select } from '@/ui';

export type LeadValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  property: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof LeadValues, string>>;

const propertyOptions = [
  { value: '1bhk', label: '1 BHK' },
  { value: '2bhk', label: '2 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: '4bhk', label: '4 BHK or larger' },
  { value: 'villa', label: 'Villa or duplex' },
];

const cityOptions = cities.map((city) => ({ value: slugify(city), label: city }));

function validate(values: LeadValues): Errors {
  const result = validateWithSchema(leadFormSchema, values);
  if (result.success) return {};
  return result.errors as Errors;
}

type LeadFormProps = {
  /** Where the form was opened from, kept for attribution. */
  source: string;
  submitLabel?: string;
  onSuccess?: (values: LeadFormValues) => void;
  renderSuccess?: (values: LeadFormValues) => ReactNode;
  compact?: boolean;
};

export function LeadForm({
  source,
  submitLabel = 'Book my free session',
  onSuccess,
  renderSuccess,
  compact,
}: LeadFormProps) {
  const [values, setValues] = useState<LeadValues>({
    name: '',
    phone: '',
    email: '',
    city: '',
    property: '',
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const update = (patch: Partial<LeadValues>) => {
    const nextValues = { ...values, ...patch };
    setValues(nextValues);
    if (touched) setErrors(validate(nextValues));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so a keyboard user is not hunting.
      const firstKey = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus();
      return;
    }

    setStatus('sending');
    // No backend in this project; the delay stands in for the request so the
    // loading and success states are real rather than theoretical.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('done');
    onSuccess?.(values as LeadFormValues);
  };

  if (status === 'done') {
    if (renderSuccess) {
      return <div className="py-2">{renderSuccess(values as LeadFormValues)}</div>;
    }

    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="text-success mx-auto size-12" aria-hidden="true" />
        <Heading as="h3" level="h3" className="mt-4">
          Thanks, {values.name.split(' ')[0]}.
        </Heading>
        <p className="text-body text-surface-600 mx-auto mt-2 max-w-prose">
          A designer will call you on {values.phone} within one working day to
          agree a slot. No one else will call you, and we do not pass your
          number on.
        </p>
        <p className="text-caption text-surface-600 mt-4">
          In a hurry? Call us on{' '}
          <a href={brand.phoneHref} className="text-primary-600 underline underline-offset-4">
            {brand.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-1">
      <Input
        label="Full name"
        data-field="name"
        placeholder="Priya Sharma"
        autoComplete="name"
        required
        value={values.name}
        onChange={(e) => update({ name: e.target.value })}
        error={errors.name}
      />

      <Input
        label="Mobile number"
        data-field="phone"
        prefix="+91"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="98765 43210"
        required
        value={values.phone}
        onChange={(e) => update({ phone: e.target.value })}
        error={errors.phone}
        helper="We call once to agree a slot."
      />

      {!compact && (
        <Input
          label="Email"
          data-field="email"
          type="email"
          autoComplete="email"
          placeholder="priya@example.com"
          value={values.email}
          onChange={(e) => update({ email: e.target.value })}
          error={errors.email}
          helper="Optional — for the designs and the quote."
        />
      )}

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Select
          label="City"
          data-field="city"
          options={cityOptions}
          placeholder="Select your city"
          required
          value={values.city}
          onChange={(e) => update({ city: e.target.value })}
          error={errors.city}
        />
        <Select
          label="Property type"
          options={propertyOptions}
          placeholder="Select"
          value={values.property}
          onChange={(e) => update({ property: e.target.value })}
        />
      </div>

      <Checkbox
        label="I agree to be contacted about this enquiry."
        data-field="consent"
        checked={values.consent}
        onChange={(e) => update({ consent: e.target.checked })}
        error={errors.consent}
        className="pt-1"
      />

      <input type="hidden" name="source" value={source} />

      <Button type="submit" fullWidth size="lg" loading={status === 'sending'} className="mt-4">
        {submitLabel}
      </Button>

      <p className="text-caption text-surface-600 pt-2">
        By continuing you agree to our terms. We never sell or share your number.
      </p>
    </form>
  );
}
