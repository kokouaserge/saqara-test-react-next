import Logo from 'shared/Logo/Logo';
import SocialsList from 'shared/SocialsList/SocialsList';
import React from 'react';

interface Item {
  href: string;
  label: string;
}

interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: Item[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'AOS by Saqara',
    menus: [
      { href: '#', label: "Donneur d'ordres" },
      { href: '#', label: 'Entreprise du bâtiment' },
      { href: '#', label: 'Entreprise générale' }
    ]
  },
  {
    id: '2',
    title: 'Chantier Privé par Saqara',
    menus: [{ href: '#', label: 'Trouver un chantier' }]
  },
  {
    id: '3',
    title: 'Entreprise',
    menus: [
      { href: '#', label: 'Nous contacter' },
      { href: '#', label: 'Nous réjoindre' },
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Lexique' }
    ]
  },
  {
    id: '4',
    title: 'Légal',
    menus: [
      { href: '#', label: 'Confidentialité' },
      { href: '#', label: 'Mentions Légales' }
    ]
  }
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-24 lg:py-32 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
