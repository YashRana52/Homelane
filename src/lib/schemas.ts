import { z } from 'zod';

/**
 * Zod validation schemas for lead capture and calculator funnels.
 *
 * Validation rules match Indian interior design industry requirements:
 * - 10-digit mobile numbers starting with 6, 7, 8, or 9
 * - Standard email regex
 * - Required consent checkbox
 */

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name')
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your mobile number')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 10, 'Enter a 10-digit mobile number')
    .refine((val) => /^[6-9]/.test(val), 'Indian mobile numbers start with 6, 7, 8 or 9'),
  email: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Enter a valid email address',
    ),
  city: z.string().trim().min(1, 'Please choose your city'),
  property: z.string().optional().default(''),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept to continue' }),
  }),
  source: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const estimateQuickSchema = z.object({
  floorplan: z.enum(['1bhk', '2bhk', '3bhk', '3plus'], {
    errorMap: () => ({ message: 'Please select a floorplan' }),
  }),
  purpose: z.enum(['move-in', 'rent-out', 'renovate'], {
    errorMap: () => ({ message: 'Please select a purpose' }),
  }),
});

export type EstimateQuickValues = z.infer<typeof estimateQuickSchema>;

export const wizardDimensionsSchema = z.object({
  primary: z.number().positive('Primary dimension must be greater than 0'),
  secondary: z.number().positive('Secondary dimension must be greater than 0'),
});

/**
 * Helper to validate form values against a Zod schema and format errors
 * into field-level error strings suitable for UI inputs.
 */
export function validateWithSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field && typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}
