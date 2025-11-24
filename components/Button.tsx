import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-2 font-bold transition-all duration-200 transform border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-airi-base border-white text-white hover:bg-airi-accent shadow-[4px_4px_0px_0px_rgba(239,175,187,1)] active:translate-y-1 active:shadow-none text-shadow-sm",
    secondary: "bg-white border-airi-base text-airi-shadow2 hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(255,170,204,0.5)] active:translate-y-1 active:shadow-none",
    danger: "bg-airi-shadow2 border-white text-white hover:bg-red-500 shadow-[4px_4px_0px_0px_rgba(239,175,187,1)] active:translate-y-1 active:shadow-none"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};