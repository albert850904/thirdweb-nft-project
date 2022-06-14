import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '../../sanity';
import { Collection } from '../../typings';

interface Props {
  collection: Collection;
  index: number;
  isShowDesc: boolean;
}

function Card(props: Props) {
  const { collection, index, isShowDesc } = props;

  return (
    <Link href={`/nft/${collection.slug.current}`} key={collection.id + index}>
      <div className="hover:-t relative flex cursor-pointer flex-col items-center rounded-2xl transition-all duration-200 hover:translate-x-0.5 hover:-translate-y-1 hover:shadow-md">
        <img
          className="h-40 w-40 rounded-2xl object-cover"
          src={urlFor(collection.mainImage).url()}
          alt=""
        />
        {isShowDesc && (
          <div className="mt-5">
            <h2 className="text-3xl">{collection.title}</h2>
            <p className="text-xm mt-2 text-gray-400">
              {collection.description}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

Card.propTypes = {};

export default Card;
