const PRESET_RESPONSES: { [key: string]: string } = {
  "hello": "Hello! How can I help you today?",
  "hi": "Hi there! How can I assist you?",
  "hours": "We're open Monday to Friday, 9 AM to 6 PM.",
  "location": "We're located at 123 Business Street, Downtown.",
  "contact": "You can reach us at contact@business.com or call (555) 123-4567.",
  "price": "Our pricing varies depending on the service. Could you specify which service you're interested in?",
  "help": "I'm here to help! What can I assist you with?",
};

export const getChatResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      
      // Check for preset responses
      for (const [key, response] of Object.entries(PRESET_RESPONSES)) {
        if (lowerMessage.includes(key)) {
          resolve(response);
          return;
        }
      }
      
      // Default response
      resolve("I understand you're asking about " + message + ". Let me connect you with a human representative who can better assist you.");
    }, 1000);
  });
};