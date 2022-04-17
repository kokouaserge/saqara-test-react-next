import React, { FC } from 'react';
import Link from 'next/link';
import Badge from 'shared/Badge/Badge';
import { Default } from 'hooks/type';

interface CardGenerationBoxProps {
  className?: string;
  generation: Default;
  index?: number;
}

const CardGenerationBox: FC<CardGenerationBoxProps> = ({
  className = '',
  generation,
  index
}) => {
  const { name } = generation;
  return (
    <Link href={'/generation/' + index}>
      <a
        className={`nc-CardGenerationBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
        data-nc-id="CardGenerationBox"
      >
        {index && (
          <Badge
            className="absolute left-3 top-3"
            color={index === 1 ? 'red' : index === 2 ? 'blue' : 'green'}
            name={`#${index}`}
          />
        )}

        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span
              className="line-clamp-1"
              style={{ textTransform: 'capitalize' }}
            >
              {name}
            </span>
          </h2>
        </div>
      </a>
    </Link>
  );
};

export default CardGenerationBox;
