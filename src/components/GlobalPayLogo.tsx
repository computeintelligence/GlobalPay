import React from 'react';

interface GlobalPayLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  themeMode?: 'light' | 'dark' | 'auto';
  id?: string;
}

export const GlobalPayLogo: React.FC<GlobalPayLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  id = 'globalpay-brand-logo',
}) => {
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  return (
    <div id={id} className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <span className="globalpay-mark" aria-hidden="true" />
      {showText && <span className={`globalpay-wordmark ${textSize}`}>GlobalPay</span>}
    </div>
  );
};
