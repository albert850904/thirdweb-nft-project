import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Card from '../components/common/Card';
import Header from '../components/header/Header';
import { sanityClient, urlFor } from '../sanity';
import { Collection } from '../typings';

import styles from './index.module.scss';

interface Props {
  collections: Collection[];
}

const Home = ({ collections }: Props) => {
  const [isEntered, setIsEntered] = useState<boolean>(false);

  return (
    <>
      {/* Header */}
      {isEntered && <Header />}

      <div className="relative grid min-h-screen  place-items-center ">
        {/* front */}
        <div
          className={`absolute z-10 flex h-full w-full items-center justify-center bg-gradient-to-b from-black to-slate-700 transition-all duration-700 preserve-3d perspective backface-hidden ${
            isEntered && 'z-0 opacity-0 card-rotate-x-180'
          }`}
        >
          <div className="text-center">
            <h1 className="pb-3 text-5xl font-bold text-amber-300">
              Isabel Yi Fan
            </h1>
            <h2 className="pb-10 text-2xl font-medium text-slate-500">
              NFT collections Designed by Isabel
            </h2>
            <button
              className="rounded bg-slate-700 px-8 py-3 text-xl text-white transition-all hover:scale-105 hover:shadow-md hover:shadow-amber-200"
              onClick={() => setIsEntered((prevState) => !prevState)}
            >
              Enter
            </button>
          </div>
        </div>

        {/* back */}
        <div
          className={`absolute z-0 mx-auto mt-40 grid min-h-screen max-w-7xl grid-cols-1 flex-col bg-gray-100 py-20 px-10 opacity-0 transition-transform duration-700 preserve-3d perspective backface-hidden lg:grid-cols-2 ${
            isEntered
              ? 'z-10 opacity-100 card-rotate-x-0'
              : 'max-h-screen card-rotate-x-180'
          }`}
        >
          <Head>
            <title>Isabel Yi Fan</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="flex items-center justify-center p-10">
            <h1 className="mb-10 text-4xl font-extralight">
              <p className="mb-3">
                <span className="font-bold">Isabel Yi Fan</span> Collection
              </p>
              <p className="text-sm font-normal line-clamp-2">
                Lorem ipsum dolor sit amet, erat lectus sed et arcu quam et,
                turpis nec pharetra duis aliquam sapien, nibh eget maecenas ut,
                dictumst est nunc nonummy, massa purus erat ultricies id odio.
              </p>
            </h1>
          </div>

          <main className="p-10 text-center">
            <div
              className={
                isEntered
                  ? styles.cards + ' grid grid-cols-3 gap-x-2 gap-y-5 space-x-3'
                  : 'grid grid-cols-3 gap-x-2 gap-y-5 space-x-3 '
              }
            >
              {collections.slice(0, 6).map((collection, index) => (
                <div
                  className={
                    styles.card +
                    ` relative ${index % 3 === 0 && 'top-10'} ${
                      index % 3 === 2 && 'bottom-10'
                    }`
                  }
                >
                  <Card
                    collection={collection}
                    index={index}
                    isShowDesc={false}
                  />
                </div>
              ))}
            </div>
            <p
              className={
                styles.explore +
                ' mt-20 cursor-pointer text-xl font-medium transition-all hover:drop-shadow-xl'
              }
            >
              Explore The Isabel Universe
              <FontAwesomeIcon
                icon={faArrowRight}
                width={16}
                height={16}
                className="ml-1 inline-block"
              />
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"] {
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage {
    asset
  },
  previewImage {
    asset
  },
  slug {
    current
  },
  creator -> {
    _id,
    name,
    address,
    slug {
    current
   },
  },
}`;

  const collections = await sanityClient.fetch(query);

  return {
    props: {
      collections: collections
        .concat(collections)
        .concat(collections)
        .concat(collections)
        .concat(collections)
        .concat(collections)
        .concat(collections),
    },
  };
};
