import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchGenerations = () =>
  axios
    .get(`https://pokeapi.co/api/v2/generation/`)
    .then(({ data }: any) => data);

export const useGenerations = () => {
  return useQuery(['getGenerations'], () => fetchGenerations());
};
