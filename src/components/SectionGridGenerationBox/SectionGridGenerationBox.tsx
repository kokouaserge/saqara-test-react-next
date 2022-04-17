import CardGenerationBox from 'components/CardGenerationBox/CardGenerationBox';
import Heading from 'components/Heading/Heading';
import React, { FC } from 'react';
import { Default } from 'hooks/type';

interface SectionGridGenerationBoxProps {
  className?: string;
  generations?: Default[];
}

const SectionGridGenerationBox: FC<SectionGridGenerationBoxProps> = ({
  className = '',
  generations = []
}) => {
  return (
    <div
      className={`nc-SectionGridGenerationBox relative ${className}`}
      data-nc-id="SectionGridGenerationBox"
    >
      <Heading desc="Cliquer sur une génération pour plus de détails" isCenter>
        Toutes les générations
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
        {generations.map((generation, index) => (
          <CardGenerationBox
            index={index + 1}
            key={generation.name + '-' + index}
            generation={generation}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionGridGenerationBox;
