import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAddress, useNFTDrop, useMetamask } from '@thirdweb-dev/react';
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

import styles from './nftpage.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Loader from '../../components/common/Loader';

interface Props {
  collection: Collection;
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [loading, setLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>();

  // router
  const router = useRouter();

  // Auth
  const address = useAddress();

  // NFT
  const nftDrop = useNFTDrop(collection.address); // point to address
  const connectWithMetaMask = useMetamask();

  const mintNft = async () => {
    if (!address) {
      connectWithMetaMask();
      return;
    }

    if (!nftDrop) return;

    setLoading(true);

    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    });

    const quantity = 1; // how many nfts you wanted to claim

    try {
      const claimRes = await nftDrop.claimTo(address, quantity);

      toast('Horrrrrray, You successfully minted', {
        duration: 8000,
        style: {
          background: 'white',
          color: 'green',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        },
      });

      const data = await claimRes[0].data();
      console.log('rres', data);
    } catch (error) {
      console.log(error);

      toast('Oooops, something went wrong...', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '20px',
        },
      });
    } finally {
      setLoading(false);
      toast.dismiss(notification);
    }
  };

  useEffect(() => {
    if (!nftDrop) return;

    const fetchNFTDropData = async () => {
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();

      setClaimedSupply(claimed.length);
      setTotalSupply(total);

      setLoading(false);
    };

    fetchNFTDropData();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;
    (async () => {
      const claimedConditions = await nftDrop.claimConditions.getActive();
      setPriceInEth(claimedConditions?.currencyMetadata?.displayValue);
    })();
  }, [nftDrop]);

  return (
    <div className="flex flex-col bg-[#FAF0E6] p-10">
      <div
        className="absolute top-5 left-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 p-3 text-white opacity-60 transition-opacity hover:opacity-100"
        onClick={() => router.back()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>

      {/* Toaster */}
      <Toaster position="bottom-center" />

      {/* Address */}
      {address && (
        <div
          className={
            styles.wallet +
            ' absolute top-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#9FC088] p-3 shadow-lg'
          }
        >
          <p className="text-center text-sm text-white">
            You're logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        </div>
      )}

      {/* container */}
      <div className="min-h-[calc(100vh_-_5rem)]  shadow-lg lg:grid lg:grid-cols-10">
        {/* Left side */}
        <div className="relative min-h-[50vh] md:min-h-[calc(100vh_-_5rem)] lg:col-span-5">
          <div
            className=" min-h-[50vh] rounded-l-lg bg-cover bg-center bg-no-repeat bg-origin-border blur-[1px] md:min-h-[calc(100vh_-_5rem)] lg:h-full lg:blur-[2px]"
            style={{
              backgroundImage:
                'url(' + urlFor(collection.mainImage).url() + ')',
            }}
          ></div>
          <div
            className={
              styles['left-tag'] +
              ' absolute bottom-1/2 left-5 flex h-32 flex-col items-center justify-center bg-[#F9EBC8] p-5 py-2 md:left-0 md:bottom-3 lg:bottom-0'
            }
          >
            <div className="space-y-2">
              <h1
                className={
                  styles['left-tag__title'] +
                  ' text-4xl font-bold text-white drop-shadow-lg'
                }
              >
                {collection.nftCollectionName}
              </h1>
              <h2
                className={
                  styles['left-tag__desc'] +
                  ' text-xl font-semibold text-[#603601] line-clamp-2'
                }
              >
                {collection.description}
              </h2>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-1 flex-col rounded-r-lg bg-gradient-to-br from-[#BE8C63] to-[#DAB88B] bg-cover p-12  lg:col-span-5">
          {/* body */}
          <div className="flex flex-1 flex-col items-center justify-center space-y-6 text-center lg:space-y-2">
            <div className="mb-2 rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
              <img
                className="w-96 rounded-xl object-cover lg:h-72 lg:w-72"
                src={urlFor(collection.previewImage).url()}
                alt=""
              />
            </div>
            <h1 className="text-2xl font-bold lg:text-3xl lg:font-extrabold">
              {collection.title}
            </h1>
            {!loading && (
              <p className="pt-2 text-xl text-[#603601]">
                {claimedSupply} / {totalSupply?.toString()} NFT's claimed
              </p>
            )}

            {loading && <Loader />}
          </div>

          {/* mint button */}
          <button
            className="mt-10 h-16 w-full rounded-full bg-[#7E370C] text-white disabled:bg-gray-300"
            onClick={mintNft}
            disabled={loading || claimedSupply === totalSupply?.toNumber()}
          >
            {loading ? (
              <>Loading</>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>Sold Out</>
            ) : !address ? (
              <>Sign in to Mint</>
            ) : (
              <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

NFTDropPage.propTypes = {};

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0] {
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
  // $id 是用第二個參數傳入
  const collection = await sanityClient.fetch(query, { id: params?.id });

  // 404 page
  if (!collection) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      collection,
    },
  };
};
