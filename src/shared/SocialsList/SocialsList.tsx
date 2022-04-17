import React, { FC } from "react";

export interface SocialType {
  name: string;
  icon: string;
  href: string;
}

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/saqara.france",
  },
  {
    name: "Twitter",
    icon: "lab la-twitter",
    href: "https://www.twitter.com/saqara_france",
  },
  {
    name: "Youtube",
    icon: "lab la-youtube",
    href: "https://www.youtube.com/channel/UC2l7U4q2Km9SSN4gMykWo1Q",
  },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "https://www.instagram.com/saqara_france/",
  },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "space-y-2.5",
  itemClass = "",
  socials = socialsDemo,
}) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <i className={item.icon}></i>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList;
