import React, { FC } from 'react';
import Head from 'next/head';

export interface LoadingProps {
  className?: string;
  message: string;
  title: string;
}

const Loading: FC<LoadingProps> = ({ className = '', message, title }) => {
  return (
    <>
      <Head>
        <title>Saqara | {title} </title>
      </Head>
      <div style={{ margin: 'auto' }}>{message}</div>
    </>
  );
};

export default Loading;
