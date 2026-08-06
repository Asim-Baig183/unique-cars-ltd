import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { generateAIResponse } from './aiService';
import {
  initializeConversationState,
  updateConversationStage,
  updateCustomerPreferences,
  updateBookingData,
  setSelectedVehicle,
  type ChatMessage,
  type ConversationState,
} from './chatHistoryManager';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'bot' | 'user';
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Unique Cars Ltd! 👋 What brings you here today? Looking to buy, rent, or just exploring?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      sender: 'bot',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  
  // Conversation state management
  const [conversationState, setConversationState] = useState<ConversationState>(
    initializeConversationState()
  );

  // Chat history for AI context
  const chatHistoryRef = useRef<ChatMessage[]>([]);

  // Auto-scroll on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getFormattedTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();

    // Add user message to UI
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMsgText,
      timestamp: getFormattedTime(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Update chat history
    chatHistoryRef.current.push({
      role: 'user',
      content: userMsgText,
    });

    try {
      // Get AI response with state management
      const result = await generateAIResponse(
        userMsgText,
        chatHistoryRef.current,
        conversationState
      );

      // Update state based on AI logic
      let newState = result.updatedState;

      // Simple state detection based on conversation flow
      if (conversationState.stage === 'QUALIFYING') {
        if (
          userMsgText.toLowerCase().includes('yes') ||
          userMsgText.toLowerCase().includes('interested') ||
          userMsgText.toLowerCase().includes('book')
        ) {
          newState = updateConversationStage(newState, 'BOOKING');
        }
      } else if (conversationState.stage === 'BOOKING') {
        if (!conversationState.bookingData?.name && !userMsgText.match(/^\d{1,10}$/)) {
          newState = updateBookingData(newState, { name: userMsgText });
        } else if (!conversationState.bookingData?.email && userMsgText.includes('@')) {
          newState = updateBookingData(newState, { email: userMsgText });
        } else if (!conversationState.bookingData?.phone && userMsgText.match(/[\d\-\+\s]/)) {
          newState = updateBookingData(newState, { phone: userMsgText });
        } else if (!conversationState.bookingData?.appointmentDate) {
          newState = updateBookingData(newState, { appointmentDate: userMsgText });
        } else if (!conversationState.bookingData?.appointmentTime) {
          newState = updateBookingData(newState, { appointmentTime: userMsgText });
        }

        if (
          newState.bookingData?.name &&
          newState.bookingData?.email &&
          newState.bookingData?.phone &&
          newState.bookingData?.appointmentDate &&
          newState.bookingData?.appointmentTime
        ) {
          newState = updateConversationStage(newState, 'COMPLETE');
        }
      }

      setConversationState(newState);

      // Add bot response to UI
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        timestamp: getFormattedTime(),
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMsg]);

      // Update chat history
      chatHistoryRef.current.push({
        role: 'assistant',
        content: result.response,
      });

      if (result.bookingData) {
        console.log('Appointment booked:', result.bookingData);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: getFormattedTime(),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[90vw] sm:w-95 h-130 max-h-[80vh] bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Header */}
          <header className="px-4 py-3 bg-[#222222] border-b border-gray-800 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors focus:outline-none"
              title="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <img
                src="https://image123.azureedge.net/uniquecarsltd/42866094474054073-cropped-colourLogo-1-1.png"
                alt="Unique Cars Ltd"
                className="h-7 w-auto object-contain"
              />
            </div>
          </header>

          {/* Chat Messages Body */}
          <section
            ref={chatScrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#121212] custom-scrollbar"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                      isUser
                        ? 'bg-[#e3ba73] text-black rounded-tr-none font-medium'
                        : 'bg-[#262626] text-gray-100 rounded-tl-none border border-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-word">{msg.text}</p>
                    <span
                      className={`text-[10px] block mt-1 text-right ${
                        isUser ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#262626] px-3 py-2 rounded-xl rounded-tl-none w-fit border border-gray-800">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e3ba73]" />
                Unique AI is thinking...
              </div>
            )}
          </section>

          {/* Footer Input Area */}
          <footer className="p-3 bg-[#1e1e1e] border-t border-gray-800 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 bg-[#121212] text-white text-sm px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-[#e3ba73] resize-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-[#e3ba73] text-black rounded-xl hover:bg-[#cdaf63] disabled:opacity-40 disabled:hover:bg-[#e3ba73] transition-all focus:outline-none"
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </form>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
