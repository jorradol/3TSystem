import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
         {/* Internal SVG Logo representing 3T (Tech Touch Trans) - Abstract Shape */}
         <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db2777" /> {/* Pink */}
                    <stop offset="50%" stopColor="#ea580c" /> {/* Orange */}
                    <stop offset="100%" stopColor="#059669" /> {/* Green */}
                </linearGradient>
            </defs>
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" stroke="url(#logoGradient)" strokeWidth="8" fill="white" />
            <path d="M50 20 V80 M25 35 L75 35" stroke="url(#logoGradient)" strokeWidth="6" strokeLinecap="round" />
         </svg>
      </div>
    </div>
  );
};

export default Logo;