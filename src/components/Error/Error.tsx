import React, { FC } from 'react';
import Head from 'next/head';

export interface ErrorProps {
  className?: string;
  message: string;
  title: string;
}

const Error: FC<ErrorProps> = ({ className = '', message, title }) => {
  return (
    <>
      <Head>
        <title>Saqara | {title} </title>
      </Head>
      <div style={{ margin: 'auto' }}>
        {message}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    </>
  );
};

export default Error;
