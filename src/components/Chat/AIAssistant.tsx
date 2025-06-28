import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Zap, Search, Upload, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types';
import { apiService } from '../../utils/api';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your PanPath Guardian AI assistant. I can help you with platform navigation, data interpretation, and outbreak analysis. How can I assist you today?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Search, label: 'Show hotspots', action: 'show-hotspots' },
    { icon: Upload, label: 'Upload guide', action: 'upload-guide' },
    { icon: AlertTriangle, label: 'Trigger anomaly', action: 'trigger-anomaly' },
    { icon: Zap, label: 'System status', action: 'system-status' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get current page context
      const context = window.location.pathname;
      
      // Send to n8n webhook for AI processing
      const response = await apiService.sendChatMessage(messageToSend, context);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message || getDefaultResponse(messageToSend),
        timestamp: new Date().toISOString(),
        context,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getDefaultResponse(messageToSend),
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hotspot') || lowerMessage.includes('outbreak')) {
      return 'Based on current data, we\'re monitoring elevated signals in Mumbai, São Paulo, and Mexico City. Mexico City shows the highest risk level with multiple signal convergence. Would you like detailed analysis of any specific location?';
    }
    
    if (lowerMessage.includes('upload') || lowerMessage.includes('data')) {
      return 'To upload signal data, navigate to the Admin panel and select your data format (CSV or JSON). Make sure to specify the signal type (wastewater, pharmacy, wearable, etc.). Need help with data formatting?';
    }
    
    if (lowerMessage.includes('anomaly') || lowerMessage.includes('test')) {
      return 'You can trigger synthetic anomalies from the Admin panel for testing purposes. Specify the location, intensity (10-100%), and affected signal types. This is useful for validating response protocols.';
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('system')) {
      return 'All systems are operational! We\'re monitoring 2,847 active sites across 89 countries with 156K+ live signals. Current alert level: Normal with 2 active warnings. Need specific system metrics?';
    }
    
    return 'I\'m here to help with PanPath Guardian! I can assist with navigation, data interpretation, outbreak analysis, and system operations. What would you like to know more about?';
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      'show-hotspots': 'Show me current global hotspots',
      'upload-guide': 'How do I upload signal data?',
      'trigger-anomaly': 'How do I trigger a synthetic anomaly?',
      'system-status': 'What\'s the current system status?',
    };
    
    handleSendMessage(actionMessages[action as keyof typeof actionMessages]);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-card hover:shadow-card-hover transition-all duration-200 flex items-center justify-center z-40 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -4, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-card-white rounded-lg shadow-modal border border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">PanPath AI</h3>
                  <p className="text-xs text-text-secondary">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 p-2 text-xs bg-background hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
                  >
                    <action.icon className="h-3 w-3" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-background text-text-primary'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-white opacity-75' : 'text-text-secondary'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-background text-text-primary p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;