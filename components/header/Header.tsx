import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';

function Header(props) {
  // Auth
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b-2 border-gray-300 bg-white py-3 px-10 transition-colors">
      <Link href={'/'}>
        <h1 className="w-40 cursor-pointer text-2xl font-extralight sm:w-80">
          Isabel Yi Fan
        </h1>
      </Link>
      <button
        className="rounded-full border-2 border-slate-400 px-4 py-2 text-xs font-bold hover:bg-slate-400 hover:text-white lg:px-5 lg:py-3 lg:text-base"
        onClick={() => (address ? disconnect() : connectWithMetamask())}
      >
        {address ? 'Sign Out' : 'Sign In'}
      </button>
    </header>
  );
}

Header.propTypes = {};

export default Header;
