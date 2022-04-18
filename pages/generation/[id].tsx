import React, { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { useRouter } from 'next/router';
import { fetchGeneration, useGeneration } from 'hooks/useGeneration';
import SectionPokemonList from 'components/SectionPokemonList/SectionPokemonList';
import Head from 'next/head';
import Error from 'components/Error/Error';
import Loading from 'components/Loading/Loading';

export interface PageGenerationProps {
  className?: string;
}
interface GenerationItem {
  id: any;
  abilities?: any;
  main_region: any;
  name: string;
  pokemon_species: any;
  moves: any;
  types: any;
}

const Generation: FC<PageGenerationProps> = ({ className = '' }) => {
  const router = useRouter();
  const generationID =
    typeof router.query?.id === 'string' ? router.query.id : '';

  const {
    isSuccess,
    data: generation,
    isLoading,
    isError
  } = useGeneration(generationID);

  const renderSidebar = (generation: GenerationItem) => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2
            className="text-3xl font-semibold"
            style={{ textTransform: 'capitalize' }}
          >
            {generation.name}
          </h2>
        </div>

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {generation.moves.length} Mouvement
              {generation.moves.length > 0 && 's'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {generation.pokemon_species.length} Pokemon
              {generation.pokemon_species.length > 0 && 's'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {generation.types.length} type{generation.types.length > 0 && 's'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (isLoading) {
      return (
        <Loading
          message="Veuillez patienter nous récuperons les informations sur la génération"
          title="chargement des informations"
        />
      );
    }

    if (isError) {
      return (
        <Error
          message="Désolé la génération n'a pas été trouvée"
          title="Génération non trouvée"
        />
      );
    }

    if (isSuccess) {
      return (
        <>
          <Head>
            <title>Saqara | Détails sur la génération {generation.name} </title>
          </Head>
          <div className="block flex-grow mb-24 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              {renderSidebar(generation)}
            </div>
          </div>
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
            {/*  {renderSection(generation)} */}
            <SectionPokemonList pokemons={generation.pokemon_species} />
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={`nc-GenerationPage ${className}`}
      data-nc-id="GenerationPage"
    >
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        {renderSection()}
      </main>
    </div>
  );
};

export default Generation;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getGeneration', id], () =>
    fetchGeneration(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};
