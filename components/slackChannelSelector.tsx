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

  if (loading) return <p className="text-sm text-gray-500">Loading channels...</p>;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow-sm max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Slack Channel</label>
        <p className="text-xs text-gray-500 mb-2">Where should we send your Reddit leads?</p>
        
        <select 
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
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
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition"
      >
        {saving ? 'Saving...' : 'Save Configuration'}
      </button>
    </div>
  );
}