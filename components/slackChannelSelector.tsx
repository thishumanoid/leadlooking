'use client';
import { useEffect, useState } from 'react';
import { getSlackChannels, saveSelectedChannel } from '@/app/actions/slack';
import { toast } from 'sonner';

export default function SlackChannelSelector() {
  const [channels, setChannels] = useState<{ id: string | undefined; name: string | undefined }[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getSlackChannels();
      console.log('channel data: ', data);
      setChannels(data);
      setLoading(false);
    }
    load()
  }, []);
  
  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    await saveSelectedChannel(selected);
    setSaving(false);
    toast.success('Okay! Notifications will now be sent here.');
  };
  
  if (loading) return <p className="text-sm text-muted-foreground">Loading channels...</p>;
  
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card shadow-sm max-w-md">
      <div>
        <label className="block text-sm font-medium text-foreground">Select Slack Channel (ignore if already selected)</label>
        <p className="text-xs text-muted-foreground mb-2">Where should we send your Reddit leads?</p>
        
        <select 
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:ring-ring focus:border-ring"
        >
          <option value="">-- Select a channel --</option>
          {channels.map((ch) => (
            <option key={ch.id} value={ch.id}>
              # {ch.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSave}
        disabled={saving || !selected}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {saving ? 'Saving...' : 'Save Configuration'}
      </button>
    </div>
  );
}