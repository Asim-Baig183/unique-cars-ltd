import React from 'react';

export interface WelcomeSectionProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title = 'WELCOME TO Unique Cars Ltd',
  buttonText = 'Contact Us!',
  buttonHref = '/ContactUs',
}) => {
  return (
    <section 
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-125 flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-12"
      style={{
        backgroundImage: "url('https://image123.azureedge.net/uniquecarsltd/9135382178186326-welcome.webp')",
      }}
    >
      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold  text-[#e7e7e7] uppercase drop-shadow-md">
          {title}
        </h1>

        {/* Paragraph Description */}
        <div className="max-w-4xl space-y-4 text-white text-base sm:text-lg font-light leading-relaxed drop-shadow-md">
          <p>
            Our clients have tall desires for their vehicles, and similarly tall desires approximately the dealership experts who serve them. <strong className="font text-white">UNIQUE CARS LTD</strong> Engines is broadly recognized to be among the most excellent in quality, unwavering quality, esteem and client fulfillment in both deals and benefit.
          </p>
          <p className="pt-2">
            When you're prepared, come on by for a test drive
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <a
            href={buttonHref}
            className="inline-block px-8 py-3 bg-transparent border border-[#e3ba73] hover:bg-[#e3ba73] text-[#e3ba73] hover:text-black font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer"
          >
            {buttonText}
          </a>
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;