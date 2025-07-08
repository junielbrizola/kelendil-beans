import { ZodSchema } from 'zod';
import type { ActionResult } from './types';

/**
 * Normalize and validate FormData against a Zod schema.
 * Returns either { data } or { errors }.
 */
export async function normalizeForm<T>(
  schema: ZodSchema<T>,
  formData: FormData
): Promise<{ data?: T; errors?: Record<string, string> }> {
  const raw = Object.fromEntries(formData.entries());
  // Parse and validate
  const result = schema.safeParse(raw as unknown);
  if (result.success) {
    return { data: result.data };
  }
  const fieldErrors: Record<string, string> = {};
  result.error.errors.forEach(err => {
    const key = err.path[0] as string;
    fieldErrors[key] = err.message;
  });
  return { errors: fieldErrors };
}
