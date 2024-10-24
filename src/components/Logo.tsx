import React from 'react';

interface LogoProps {
  // Remove isExpanded prop since it's not used
}

const Logo: React.FC<LogoProps> = () => (
  <div className="flex items-center justify-center">
    <img 
      src="https://framerusercontent.com/images/jQnwFAM6VKuPboJmW3jCmZlfjA.png?scale-down-to=512" 
      alt="VEPANDO" 
      className="h-8 w-8"
    />
  </div>
);

export default Logo;
