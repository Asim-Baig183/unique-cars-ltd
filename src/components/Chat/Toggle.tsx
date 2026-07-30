import React from 'react';

interface OnlineChatButtonProps {
  onClick?: () => void; 
}


export const OnlineChatButton: React.FC<OnlineChatButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick} 
      className="fixed bottom-6 right-6 z-50 bg-[#e3ba73] hover:bg-[#cdaf63] text-black p-3.5 rounded-full shadow-2xl transition-colors"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        className="w-6 h-6 text-black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    </button>
  );
};

export default OnlineChatButton;