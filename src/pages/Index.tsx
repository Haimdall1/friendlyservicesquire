import React from 'react';
import ChatBubble from '@/components/ChatBubble';
import ChatWindow from '@/components/ChatWindow';
import { getChatResponse } from '@/services/chatService';

const Index = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hi! How can I help you today?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get bot response
      const response = await getChatResponse(message);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { text: "I'm sorry, I'm having trouble responding right now. Please try again later.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Our Business</h1>
        <p className="text-xl text-gray-600 text-center">How can we help you today?</p>
      </div>
      
      <ChatBubble onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
      />
    </div>
  );
};

export default Index;