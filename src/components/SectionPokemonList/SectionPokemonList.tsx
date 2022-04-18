import React, { FC, useState, useMemo } from 'react';
import SectionGridPokemonBox from 'components/SectionGridPokemonBox/SectionGridPokemonBox';
import { Default } from 'hooks/type';
import Pagination from 'shared/Pagination/Pagination';
import Image from 'next/image';

interface SectionPokemonListProps {
  className?: string;
  pokemons: Default[];
}

const SectionPokemonList: FC<SectionPokemonListProps> = ({
  className = '',
  pokemons
}) => {
  const PageSize = 10; //nombre de pokemon par page
  const [searchValue, setSearchValue] = useState('');
  const [pokemonsAll, setPokemonsAll] = useState(pokemons);

  const [currentPage, setCurrentPage] = useState(1);

  //Liste de pokemon pour le paginate
  const currentTableData = useMemo(() => {
    let newPokemonArr = [...pokemonsAll];
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return newPokemonArr.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pokemonsAll]);

  //Recherche avec input nom du pokemon
  const filterPockemonData = (query: string) => {
    setSearchValue(query);
    if (query.length > 0) {
      let newPokemonsArr = [...pokemons];
      const matchingPokemons = newPokemonsArr.filter(({ name }) =>
        name.includes(query.toLowerCase())
      );
      setCurrentPage(1);
      return setPokemonsAll(matchingPokemons);
    }

    return setPokemonsAll(pokemons);
  };

  return (
    <div className={`listingSection__wrap ${className}`}>
      <div>
        <h2 className="text-2xl font-semibold">Liste de tous les pokemons</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Vous pouvez rechercher par nom
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className=" flex items-center rounded-lg ">
        <input
          placeholder="Pokemon"
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          type="text"
          onChange={({ target: { value } }) => filterPockemonData(value)}
          value={searchValue}
        />
        <div className="p-2 md:p-4">
          <button className="rounded-full focus:outline-none w-10 h-12 md:w-10 md:h-12 flex items-center justify-center">
            <Image
              src="https://github.com/ahampriyanshu/gokemon/raw/master/assets/img/pokeball.png"
              className="pokeball"
              alt="pokeball"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
      <div>
        {currentTableData.length > 0 ? (
          <>
            <SectionGridPokemonBox pokemons={currentTableData} />

            <div className="flex mt-4 justify-center items-center">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={pokemonsAll.length}
                pageSize={PageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          </>
        ) : (
          <div className="flex mt-4 justify-center items-center">
            <h2>Pas de résultat trouvé</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionPokemonList;
