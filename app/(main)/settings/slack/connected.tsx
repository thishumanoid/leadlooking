"use client";

import { useFormState } from "react-dom";
import { selectSlackChannel } from "@/app/actions/slack";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from 'sonner';

type ConnectedProps = {
  channels: {
    id: string;
    name: string;
  }[];
  defaultChannelId?: string;
};

const Connected = ({ channels, defaultChannelId }: ConnectedProps) => {
  const [state, action] = useFormState(selectSlackChannel, undefined);


  useEffect(() => {
    if (state?.errors) {
      console.log(state.errors.channelId?.join(", "))
    }
  }, [state?.errors]);

  useEffect(() => {
    if (state?.message) {
      toast(state.message);
    }
  }, [state?.message]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <Select defaultValue={defaultChannelId} name="channelId">
        <SelectTrigger>
          <SelectValue placeholder="Select a channel" />
        </SelectTrigger>
        <SelectContent>
          {channels.map((channel) => (
            <SelectItem key={channel.id} value={channel.id}>
              {channel.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Post Test Message</Button>
    </form>
  );
};

export default Connected;