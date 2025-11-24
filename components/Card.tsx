import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white border-2 border-airi-shadow1 rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {title && (
        <div className="bg-gradient-to-r from-airi-base to-airi-accent px-4 py-2 border-b-2 border-airi-shadow1 flex items-center">
          <div className="w-3 h-3 rounded-full bg-white mr-2"></div>
          <h3 className="text-white font-bold tracking-wide drop-shadow-md">{title}</h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};