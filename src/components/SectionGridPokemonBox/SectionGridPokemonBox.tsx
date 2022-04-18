import CardPokemonBox from 'components/CardPokemonBox/CardPokemonBox';
import React from 'react';
import { Default } from 'hooks/type';
import { v4 as uuidv4 } from 'uuid';

interface SectionGridPokemonBoxProps {
  pokemons?: Default[];
  headingCenter?: boolean;
  className?: string;
  gridClassName?: string;
}

const SectionGridPokemonBox: React.FC<SectionGridPokemonBoxProps> = ({
  pokemons = [],
  className = '',
  gridClassName = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2'
}) => {
  return (
    <div className={`nc-SectionGridPokemonBox relative mt-5 ${className}`}>
      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
        {pokemons.map((item, i) => (
          <CardPokemonBox key={uuidv4()} index={i + 1} pokemon={item} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridPokemonBox;
