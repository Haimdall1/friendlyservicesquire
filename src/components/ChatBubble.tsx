import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatBubble = ({ onClick, isOpen }: ChatBubbleProps) => {
  if (isOpen) return null;
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 chat-bubble-animation"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default ChatBubble;