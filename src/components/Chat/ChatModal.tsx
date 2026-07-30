import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Paperclip, Send, Smile } from 'lucide-react';

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
      text: 'Hi, Welcome to our website. How can we help you?',
      timestamp: '20:50 PM',
      sender: 'bot',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      timestamp: currentTime,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
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
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                      isUser
                        ? 'bg-[#e3ba73] text-black rounded-tr-none font-medium'
                        : 'bg-[#262626] text-gray-100 rounded-tl-none border border-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap wrap-break-words">{msg.text}</p>
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
                placeholder="Type..."
                rows={1}
                className="flex-1 bg-[#121212] text-white text-sm px-3 py-2 rounded-xl border border-gray-700 focus:outline-none focus:border-[#e3ba73] resize-none transition-colors"
              />

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*, application/pdf"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleFileClick}
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