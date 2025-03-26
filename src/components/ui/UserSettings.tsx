'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { getUserSettings, saveUserSettings, type UserSettings as UserSettingsType } from '@/app/actions/settings';

export default function UserSettings() {
  const [settings, setSettings] = useState<UserSettingsType>({
    theme: 'system',
    notifications: true,
    displayName: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  // Fetch current settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const result = await getUserSettings();
        setSettings(result);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setMessage('Failed to retrieve settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Handle settings form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      const result = await saveUserSettings(settings);
      if (result.success) {
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
        <CardDescription>Customize your application preferences</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {loading ? (
            <p>Loading settings...</p>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="displayName" className="text-sm font-medium">
                  Display Name
                </label>
                <Input 
                  id="displayName"
                  value={settings.displayName || ''}
                  onChange={(e) => setSettings({...settings, displayName: e.target.value})}
                  placeholder="Your display name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="flex flex-wrap gap-3">
                  {(['light', 'dark', 'system'] as const).map((theme) => (
                    <label key={theme} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="theme"
                        checked={settings.theme === theme}
                        onChange={() => setSettings({...settings, theme})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="notifications" className="text-sm font-medium">
                  Enable notifications
                </label>
              </div>
            </>
          )}
          
          {message && (
            <div className={`p-2 rounded ${
              message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading || saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}