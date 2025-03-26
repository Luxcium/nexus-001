'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Define schema for feedback validation
const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'question', 'other']),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
  email: z.string().email().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

/**
 * Submits user feedback to the system
 * @param data - The feedback data to submit
 * @returns Result with success status and message
 */
export async function submitFeedback(
  data: FeedbackData
): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Validate the incoming data
    const validatedData = feedbackSchema.parse(data);
    
    // Generate a unique ID for the feedback (in a real app, this would come from DB)
    const feedbackId = `FB-${Date.now().toString(36).toUpperCase()}`;
    
    // In a real application, this would save to a database
    console.log(`Saving feedback ${feedbackId}:`, validatedData);
    
    // Revalidate any relevant paths
    revalidatePath('/feedback');
    
    return {
      success: true,
      message: 'Feedback submitted successfully',
      id: feedbackId
    };
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error: ' + error.errors.map(e => e.message).join(', ')
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit feedback'
    };
  }
}