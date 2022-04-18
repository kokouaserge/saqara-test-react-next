import axios from 'axios';
import { useQuery } from 'react-query';

export const fetchGeneration = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/generation/${id}/`)
    .then(({ data }: any) => data);

export const useGeneration = (generationID: string) => {
  return useQuery(['getGeneration', generationID], () =>
    fetchGeneration(generationID)
  );
};
