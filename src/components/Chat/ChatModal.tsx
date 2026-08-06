import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Paperclip, Send, Smile, Loader2 } from 'lucide-react';
import { supabase } from '../../supabaseClient';

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
      text: 'Welcome to Unique Cars Ltd! 👋 We specialize in premium vehicle sales and rentals. Are you looking to buy a car, rent one, or just exploring options today?',
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

  // 🧠 Fixed Groq AI Engine Function (Correct Memory Stack & DB Fetch)
  const generateAIReply = async (userQuery: string, currentHistory: Message[]): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        console.error("VITE_GROQ_API_KEY missing in environment variables.");
        return "Groq API Key is missing in .env file.";
      }

      // 1. Fetch Live DB Inventory from Supabase
      let inventoryText = 'Currently no vehicles listed in DB.';
      try {
        const { data: cars, error: dbError } = await supabase
          .from('cars')
          .select('year, make, model, price, mileage, transmission, engine')
          .order('year', { ascending: false });

        if (!dbError && cars && cars.length > 0) {
          inventoryText = cars
            .map((c) => `- ${c.year} ${c.make} ${c.model}: $${c.price} (${c.mileage} KM)`)
            .join('\n');
        }
      } catch (dbErr) {
        console.warn("Supabase fetch warning, proceeding without DB context:", dbErr);
      }

      // 2. Build conversation history dynamically using passed state snapshot
      const conversationHistory = currentHistory.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      // 3. Direct REST Call to Groq Cloud API
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a professional, friendly customer service chatbot for Unique Cars Ltd (https://uniquecarsltd.ca/). Your PRIMARY GOAL is to encourage visitors to schedule a consultation call or book an appointment.

=== CRITICAL LANGUAGE RULE ===
**RESPOND ONLY IN THE LANGUAGE THE CUSTOMER USES. DO NOT TRANSLATE. DO NOT MIX LANGUAGES.**
- If customer writes in English → respond ONLY in English
- If customer writes in French → respond ONLY in French
- If customer writes in Urdu → respond ONLY in Urdu
- If customer writes in Roman Urdu → respond ONLY in Roman Urdu
- If customer writes in Arabic → respond ONLY in Arabic
- Do NOT append translations in other languages
- Do NOT provide bilingual responses
- Keep the conversation in ONE language only throughout

=== LEAD CAPTURE REQUIREMENTS ===
You MUST collect these three pieces of information (in this order):
1. Customer Name
2. Customer Email
3. Customer Phone Number

Ask for this information naturally within the conversation. Do NOT ask all three at once. Example flow:
- First, understand their car need
- Then ask: "To better assist you, may I have your name?"
- After they respond: "What's the best email to reach you?"
- After they respond: "And your phone number?"

=== CONVERSATION FLOW ===
1. Welcome & Understand Need: Identify if they want to buy, rent, or get information
2. Build Rapport: Show enthusiasm about helping them find the right vehicle
3. Collect Contact Info: Gather Name, Email, Phone progressively
4. Schedule Appointment: Direct them to the Contact Us page (https://uniquecarsltd.ca/contact-us/) to book a consultation

=== LIVE INVENTORY CONTEXT ===
${inventoryText}

=== DEALERSHIP INFORMATION ===
- Location: Canada
- Services: Premium Certified Pre-owned Cars, Financing Options, Trade-ins, Test Drives, Vehicle Rentals
- Specialties: Quality vehicles, flexible financing, fast approval process
- Contact Page: https://uniquecarsltd.ca/contact-us/

=== TONE & VOICE ===
- Professional yet approachable
- Enthusiastic about helping customers
- Persistent but not pushy about scheduling
- Natural and conversational (not robotic)
- Confident in the value Unique Cars offers

=== WHAT NOT TO DO ===
- Do NOT translate responses into other languages
- Do NOT provide extensive product catalogs (keep answers brief, drive scheduling)
- Do NOT accept incomplete contact information (need all three: name, email, phone)
- Do NOT let conversations drift away from appointment scheduling
- Do NOT respond with robotic or overly formal language
- Do NOT use emojis excessively (1-2 max per message)`,
            },
            ...conversationHistory,
            {
              role: 'user',
              content: userQuery,
            },
          ],
          temperature: 0.4,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Groq API Error:", data.error);
        return `API Error: ${data.error.message || 'Unable to generate response'}`;
      }

      const replyText = data.choices?.[0]?.message?.content;
      return replyText || "Thank you for contacting Unique Cars Ltd! Visit our Contact Us page to schedule your consultation call.";
    } catch (err: any) {
      console.error("Chat Execution Error:", err);
      return "Unable to connect to AI assistant right now. Please check browser console for details.";
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

    // Keep active snapshot of history
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    // Call AI Backend with updated history snapshot
    const aiResponseText = await generateAIReply(userMsgText, updatedMessages);

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
                    <p className="whitespace-pre-wrap wrap-break-word">{msg.text}</p>
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