import React, { FC } from 'react';
import type { GetStaticProps } from 'next';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import { fetchPokemonGenerations } from 'hooks/index';
import SectionGridGenerationBox from 'components/SectionGridGenerationBox/SectionGridGenerationBox';

export interface PageHomeProps {
  className?: string;
}

const Home: FC<PageHomeProps> = ({ className = '' }) => {
  const { isSuccess, data, isLoading, isError } = useQuery(
    ['getPokemonGenerations'],
    () => fetchPokemonGenerations()
  );

  const renderSection = () => {
    if (isLoading) {
      return <div style={{ margin: 'auto' }}>Chargement...</div>;
    }

    if (isError) {
      return (
        <div style={{ margin: 'auto' }}>
          Nous n'avons pas pu récupérer la liste des générations des pokemons
          vérifié votre réseau
          <span role="img" aria-label="sad">
            😢
          </span>
        </div>
      );
    }

    if (isSuccess) {
      return <SectionGridGenerationBox generations={data.results} />;
    }
  };

  return (
    <div
      className={`nc-PageHome overflow-hidden ${className}`}
      data-nc-id="PageHome"
    >
      {/* SECTION */}
      <div className="container relative overflow-hidden ">
        <div className="relative py-16 mb-24 lg:mb-32">{renderSection()}</div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['getPokemonGenerations'], () =>
    fetchPokemonGenerations()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
