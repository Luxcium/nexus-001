'use server';

import { revalidatePath } from 'next/cache';

/**
 * Retrieves the current system status
 * @returns System status information including version and environment
 */
export async function getSystemStatus(): Promise<{
  status: string;
  version: string;
  environment: string;
  timestamp: string;
}> {
  return {
    status: 'operational',
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Updates system status information and revalidates the relevant paths
 * @param status - The new system status to set
 * @returns Result with success status and message
 */
export async function updateSystemStatus(
  status: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the status
    if (!['operational', 'maintenance', 'degraded', 'outage'].includes(status)) {
      throw new Error('Invalid status value');
    }

    // In a real application, this would update a database or configuration
    console.log(`System status updated to: ${status}`);
    
    // Revalidate the paths that display system status
    revalidatePath('/');
    revalidatePath('/system');
    
    return {
      success: true,
      message: `System status successfully updated to ${status}`,
    };
  } catch (error) {
    console.error('Failed to update system status:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}