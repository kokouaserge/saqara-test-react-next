import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchPokemon = (name: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(({ data }: any) => data);

export const usePokemon = (pokemonName: string) => {
  return useQuery(
    ['getPokemon', pokemonName],
    () => fetchPokemon(pokemonName),
    {
      enabled: pokemonName.length > 0,
      staleTime: Infinity
    }
  );
};
