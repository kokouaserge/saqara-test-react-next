import React, { FC } from 'react';
import { Default } from 'hooks/type';
import Badge from 'shared/Badge/Badge';
import Link from 'next/link';

export interface CardPokemonBoxProps {
  className?: string;
  pokemon: Default;
  index: number;
}

const CardPokemonBox: FC<CardPokemonBoxProps> = ({
  className = '',
  pokemon,
  index
}) => {
  const { name } = pokemon;
  return (
    <Link href={'/pokemon/' + name}>
      <a
        className={`nc-CardPokemonBox relative flex items-center p-3 sm:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
        data-nc-id="CardPokemonBox"
      >
        <Badge className="absolute right-2 top-2" color="gray" name={index} />
        <div className="ml-4 flex-grow overflow-hidden">
          <h2 className="text-base font-medium">
            <span className="line-clamp-1">{name}</span>
          </h2>
        </div>
      </a>
    </Link>
  );
};

export default CardPokemonBox;
