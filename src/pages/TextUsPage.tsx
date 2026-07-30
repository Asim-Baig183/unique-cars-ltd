import React from 'react';
import { ImgBanner } from '../components/TextUs/img-banner';
import { TextForm } from '../components/TextUs/text-form';

export const TextUs: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <ImgBanner />
      <TextForm />
    </div>
  );
};

export default TextUs;