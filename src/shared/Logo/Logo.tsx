import React from 'react';
import LogoSvg from './saqara.svg';
import Image from 'next/image';
import Link from 'next/link';

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ img = LogoSvg, className = '' }) => {
  return (
    <Link href="/">
      <a className={`ttnc-logo inline-block text-primary-6000 ${className}`}>
        <Image src={img} alt="" width="250" height="50" />
      </a>
    </Link>
  );
};

export default Logo;
