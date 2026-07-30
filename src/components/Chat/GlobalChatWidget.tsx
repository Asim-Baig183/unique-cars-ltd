import React, { useState } from 'react';
import OnlineChatButton from './Toggle';
import ChatModal from './ChatModal';

interface GlobalChatWidgetProps {
  onClick?: () => void;
}

export const GlobalChatWidget: React.FC<GlobalChatWidgetProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    if (onClick) onClick();
  };

  return (
    <>
      <OnlineChatButton onClick={handleClick} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default GlobalChatWidget;