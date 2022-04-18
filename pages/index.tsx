import React, { FC } from 'react';
import type { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { fetchGenerations, useGenerations } from 'hooks/useGenerations';
import SectionGridGenerationBox from 'components/SectionGridGenerationBox/SectionGridGenerationBox';
import Head from 'next/head';
import Error from 'components/Error/Error';
import Loading from 'components/Loading/Loading';

export interface PageHomeProps {
  className?: string;
}

const Home: FC<PageHomeProps> = ({ className = '' }) => {
  const { isSuccess, data, isLoading, isError } = useGenerations();

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
          message="Nous n'avons pas pu récupérer la liste des générations des pokemons
          vérifié votre réseau"
          title="Générations non trouvées"
        />
      );
    }

    if (isSuccess) {
      return (
        <>
          <Head>
            <title>
              Saqara | Bienvenue sur la page d'accueil avec toutes les
              générations{' '}
            </title>
          </Head>
          <SectionGridGenerationBox generations={data.results} />
        </>
      );
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
  await queryClient.prefetchQuery(['getGenerations'], () => fetchGenerations());

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
