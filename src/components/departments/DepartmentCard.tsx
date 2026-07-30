import React from 'react';
import type { DepartmentCardProps } from './types';

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  title,
  hoverTitle,
  href,
  imageSrc,
  isExternal,
}) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group h-75  w-full perspective-1000 block"
    >
      <div className="relative h-full w-full rounded-sm transition-transform duration-700 transform-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 h-full w-full backface-hidden">
          <img src={imageSrc} alt={title} className="h-full w-full object-cover rounded-sm" />
          <div className="absolute inset-0  flex items-start justify-center ">
            <span className="text-white text-lg font-bold tracking-widest text-center uppercase bg-black/60 px-4 py-2 w-full backdrop-blur-xs">
              {title}
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 h-full w-full rounded-sm bg-black rotate-y-180 backface-hidden">
          <img src={imageSrc} alt={hoverTitle} className="h-full w-full object-cover opacity-30 rounded-sm" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="text-white text-lg font-bold text-center uppercase bg-black px-4 py-2 w-full ">
              {hoverTitle}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};