import React from 'react';
import { ImgBanner } from '../components/ContactUs/img-banner';
import  {ContactUsSection}  from '../components/ContactUs/contact-form';

export const TextUs: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <ImgBanner />
      <ContactUsSection />
    </div>
  );
};

export default TextUs;