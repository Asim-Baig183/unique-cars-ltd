import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Paperclip, Send, Smile, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../../supabaseClient'; // Adjust path if needed

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

// Initialize Free Gemini SDK using Environment Variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Welcome to Unique Cars Ltd. How can I help you today? Ask me about our live car inventory, pricing, or financing!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getFormattedTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  // 🧠 AI Engine Function
  const generateAIReply = async (userQuery: string): Promise<string> => {
    try {
      // 1. Fetch Live DB Inventory
      const { data: cars } = await supabase
        .from('cars')
        .select('year, make, model, price, mileage, body_style, condition_tag')
        .limit(10);

      const inventoryText = cars && cars.length > 0 
        ? cars.map(c => `- ${c.year} ${c.make} ${c.model}: $${c.price?.toLocaleString()} (${c.mileage?.toLocaleString()} KM, Tag: ${c.condition_tag || 'Clean'})`).join('\n')
        : 'Currently no vehicles listed in DB.';

      // 2. System Context Instructions
      const systemInstruction = `
        You are an intelligent, friendly AI Sales Assistant for "Unique Cars Ltd" (uniquecars.ca).
        You understand Roman Urdu, Urdu, and English seamlessly.

        Live Inventory Context:
        ${inventoryText}

        Dealership Information:
        - Name: Unique Cars Ltd
        - Services: Pre-Owned Certified Cars, Online Financing Approval, Trade-In Valuations, Test Drive Appointments.
        
        Rules:
        - Respond in the language used by the user (Roman Urdu, English, or Urdu).
        - Keep answers concise, natural, and helpful.
        - If a user asks for budget options (e.g. "car under 15000"), match items from the Live Inventory Context.
        - Encourage them to visit the showroom or apply for financing on the website.
      `;

      // 3. Call Gemini 1.5 Flash Model
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemInstruction,
      });

      const result = await model.generateContent(userQuery);
      return result.response.text();
    } catch (err) {
      console.error("Gemini AI Error:", err);
      return "Thank you for reaching out! Our sales representative will be with you shortly. Feel free to browse our Inventory page.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMsgText,
      timestamp: getFormattedTime(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call AI Backend
    const aiResponseText = await generateAIReply(userMsgText);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      timestamp: getFormattedTime(),
      sender: 'bot',
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
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
                    <p className="whitespace-pre-wrap wrap-break">{msg.text}</p>
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
                Unique AI Assistant is thinking...
              </div>
            )}
          </section>

          {/* Footer Input Area */}
          <footer className="p-3 bg-[#1e1e1e] border-t border-gray-800 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                className="p-1.5 text-gray-400 hover:text-[#e3ba73] transition-colors focus:outline-none"
                title="Emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Ask AI about cars, price, financing..."
                rows={1}
                className="flex-1 bg-[#121212] text-white text-sm px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-[#e3ba73] resize-none transition-colors"
              />

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*, application/pdf"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none"
                title="Attach File"
              >
                <Paperclip className="w-5 h-5" />
              </button>

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