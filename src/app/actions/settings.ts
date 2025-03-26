'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Define schema for settings validation
const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.boolean().optional(),
  displayName: z.string().min(2).max(50).optional(),
  language: z.enum(['en', 'fr', 'es', 'de']).optional(),
});

export type UserSettings = z.infer<typeof settingsSchema>;

/**
 * Retrieves the current user settings
 * @returns Current user settings
 */
export async function getUserSettings(): Promise<UserSettings> {
  // In a real application, this would fetch from a database or session
  return {
    theme: 'system',
    notifications: true,
    displayName: 'User',
    language: 'en',
  };
}

/**
 * Saves user settings to the database
 * @param settings - The settings data to save
 * @returns Result with success status and message
 */
export async function saveUserSettings(
  settings: UserSettings
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the incoming data
    const validatedData = settingsSchema.parse(settings);
    
    // In a real application, this would save to a database
    console.log('Saving user settings:', validatedData);
    
    // Revalidate any path that might display user settings
    revalidatePath('/');
    revalidatePath('/settings');
    revalidatePath('/profile');
    
    return {
      success: true,
      message: 'Settings updated successfully'
    };
  } catch (error) {
    console.error('Failed to save user settings:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error: ' + (error instanceof z.ZodError ? error.errors.map(e => e.message).join(', ') : '')
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update settings'
    };
  }
}