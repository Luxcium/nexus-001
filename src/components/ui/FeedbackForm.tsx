'use client';

import { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { submitFeedback, type FeedbackData } from '@/app/actions/feedback';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'feature',
    subject: '',
    message: '',
    email: '',
    priority: 'medium'
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error'} | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setFeedbackId(null);
    
    try {
      const result = await submitFeedback(feedback);
      if (result.success) {
        setMessage({
          text: result.message,
          type: 'success'
        });
        
        if (result.id) {
          setFeedbackId(result.id);
        }
        
        // Reset form on success
        setFeedback({
          type: 'feature',
          subject: '',
          message: '',
          email: '',
          priority: 'medium'
        });
      } else {
        setMessage({
          text: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setMessage({
        text: 'Failed to submit feedback',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>Share your thoughts and suggestions</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Feedback Type
            </label>
            <select
              id="type"
              value={feedback.type}
              onChange={(e) => setFeedback({...feedback, type: e.target.value as FeedbackData['type']})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              value={feedback.priority}
              onChange={(e) => setFeedback({...feedback, priority: e.target.value as FeedbackData['priority']})}
              className="w-full p-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input
              id="subject"
              value={feedback.subject}
              onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
              placeholder="Brief description of your feedback"
              required
              minLength={5}
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              placeholder="Detailed explanation of your feedback"
              className="w-full p-2 min-h-[100px] border rounded-md resize-y"
              required
              minLength={10}
              maxLength={1000}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email (optional)
            </label>
            <Input
              id="email"
              type="email"
              value={feedback.email || ''}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
              placeholder="Your email for follow-up"
            />
          </div>
          
          {message && (
            <div className={`p-2 rounded ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.text}
              {feedbackId && (
                <p className="mt-1 font-medium">Reference ID: {feedbackId}</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}