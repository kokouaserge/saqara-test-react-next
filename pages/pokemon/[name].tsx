import React, { FC } from 'react';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import { useRouter } from 'next/router';
import { fetchPokemon } from 'hooks/index';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import CardPokemonDetails from 'components/CardPokemonDetails/CardPokemonDetails';

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
  } = useQuery(['getPokemon', pokemonName], () => fetchPokemon(pokemonName), {
    enabled: pokemonName.length > 0,
    staleTime: Infinity
  });

  const renderSection = () => {
    if (isLoading) {
      return <div style={{ margin: 'auto' }}>Chargement...</div>;
    }

    if (isError) {
      return (
        <div style={{ margin: 'auto' }}>
          Désolé le pokemon n'a pas été trouvé{' '}
          <span role="img" aria-label="sad">
            😢
          </span>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="space-y-11">
          <div>
            <span className="text-4xl font-semibold">
              Détails du Pokemon {pokemon.name}
            </span>
          </div>

          {/* --------------------- */}
          <CardPokemonDetails
            name={pokemon.name}
            image={pokemon.sprites?.other?.['official-artwork']?.front_default}
            weight={pokemon.weight}
            xp={pokemon.base_experience}
            abilities={pokemon.abilities?.map((item: any) => item.ability.name)}
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
