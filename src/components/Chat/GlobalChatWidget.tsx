import React, { useState } from 'react';
import OnlineChatButton from './Toggle';
import ChatModal from './ChatModal';

export const GlobalChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OnlineChatButton onClick={() => setIsOpen((prev) => !prev)} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default GlobalChatWidget;