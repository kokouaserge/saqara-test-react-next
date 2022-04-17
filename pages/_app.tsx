// STYLE
import '../src/styles/index.scss';
import '../index.css';
import '../src/fonts/line-awesome-1.3.0/css/line-awesome.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
