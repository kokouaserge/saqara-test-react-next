import React, { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { useRouter } from 'next/router';
import { usePokemon, fetchPokemon } from 'hooks/usePokemon';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import CardPokemonDetails from 'components/CardPokemonDetails/CardPokemonDetails';
import Head from 'next/head';
import Error from 'components/Error/Error';
import Loading from 'components/Loading/Loading';

export interface PagePokemonProps {
  className?: string;
}

const Pokemon: FC<PagePokemonProps> = ({ className = '' }) => {
  const router = useRouter();
  const pokemonName =
    typeof router.query?.name === 'string' ? router.query.name : '';
  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError
  } = usePokemon(pokemonName);

  const renderSection = () => {
    if (isLoading) {
      return (
        <Loading
          message="Veuillez patienter nous récuperons les informations sur le pokemon"
          title="chargement des informations"
        />
      );
    }

    if (isError) {
      return (
        <Error
          message="Désolé le pokemon n'a pas été trouvé"
          title="Pokemon non trouvé"
        />
      );
    }

    if (isSuccess) {
      return (
        <>
          <Head>
            <title>Saqara | Détails sur le pokemon {pokemon.name} </title>
          </Head>
          <div className="space-y-11">
            <div>
              <span className="text-4xl font-semibold">
                Détails du Pokemon {pokemon.name}
              </span>
            </div>

            {/* --------------------- */}
            <CardPokemonDetails
              name={pokemon.name}
              image={
                pokemon.sprites?.other?.['official-artwork']?.front_default
              }
              weight={pokemon.weight}
              xp={pokemon.base_experience}
              abilities={pokemon.abilities?.map(
                (item: any) => item.ability.name
              )}
              hp={pokemon.stats[0].base_stat}
              attaque={pokemon.stats[1].base_stat}
              defense={pokemon.stats[2].base_stat}
              special={pokemon.stats[3].base_stat}
            />
            {/* --------------------- */}
            <div className="flex justify-end space-x-5">
              <ButtonSecondary onClick={() => router.back()}>
                Retour
              </ButtonSecondary>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div
      className={`nc-PokemonPage px-4 max-w-2xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PokemonPage"
    >
      {renderSection()}
    </div>
  );
};

export default Pokemon;

export const getStaticProps: GetStaticProps = async (context) => {
  const name = context.params?.name as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['getPokemon', name], () =>
    fetchPokemon(name)
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
