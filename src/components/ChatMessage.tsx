import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage = ({ message, isBot }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2",
        isBot ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
      )}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;