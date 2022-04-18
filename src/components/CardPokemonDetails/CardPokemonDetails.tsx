import React, { FC } from 'react';
import Image from 'next/image';

interface PokemonCardProps {
  name: string;
  image: string;
  weight: number;
  xp: number;
  abilities: string[];
  hp: number;
  attaque: number;
  defense: number;
  special: number;
}

const CardPokemonDetails: FC<PokemonCardProps> = ({
  name,
  image,
  weight,
  abilities,
  xp,
  hp,
  attaque,
  defense,
  special
}) => {
  return (
    <div
      className={`nc-CardPokemonDetails flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]`}
      data-nc-id="CardPokemonDetails"
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <div
            className={`flex aspect-w-7 aspect-h-full sm:aspect-h-6 w-full h-full`}
            style={{ margin: 'auto', width: '370px', height: '500px' }}
          >
            <Image
              src={image}
              className=" w-full h-full "
              alt={name}
              layout="fill"
            />
          </div>
        </div>
      </div>

      <div className="-mt-4 m-8 text-center">
        <div className="mt-10">
          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              HP
            </p>
            <div className=" text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {hp}
            </div>
          </div>
          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              XP
            </p>
            <div className=" text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {xp}
            </div>
          </div>
          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              Weight
            </p>
            <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {weight / 10} kg
            </div>
          </div>

          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              Attaque
            </p>
            <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {attaque} K
            </div>
          </div>

          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              Attaque Special
            </p>
            <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {special} K
            </div>
          </div>

          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              Defense
            </p>
            <div className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white">
              {defense} K
            </div>
          </div>

          <div className="card-section dark:bg-neutral-900">
            <p className="card-section-title dark:text-neutral-300 hover:text-black dark:hover:text-white">
              Abilities
            </p>
            <ul>
              {abilities.map((ability) => (
                <li
                  key={ability}
                  className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  {ability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPokemonDetails;
