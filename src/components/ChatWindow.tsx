import React from 'react';
import { X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
  messages: Array<{ text: string; isBot: boolean }>;
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatWindow = ({ onClose, isOpen, messages, onSendMessage, isTyping }: ChatWindowProps) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const logoPath = '/heimdall-logo.png';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    console.log('Attempting to load logo from:', logoPath);
    // Create a test image to check if the logo loads
    const testImage = new Image();
    testImage.onload = () => console.log('Logo loaded successfully');
    testImage.onerror = (e) => console.error('Error loading logo:', e);
    testImage.src = logoPath;
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[350px] h-[500px] bg-background border rounded-lg shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={logoPath} 
              alt="Business Logo" 
              onError={(e) => {
                console.error('Avatar image failed to load');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <AvatarFallback>BIZ</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">Customer Service</h2>
        </div>
        <button onClick={onClose} className="hover:opacity-75">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;