import { ChainId } from '@sushiswap/sdk';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { NetworkConnector } from './NetworkConnector';

import ARTION_LOGO_URL from '../assets/svgs/logo_blue.svg';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

const RPC = isMainnet
  ? {
      [ChainId.FANTOM]: 'https://rpc.ftm.tools',
    }
  : {
      // [ChainId.KOVAN]: 'https://rpc.testnet.fantom.network',
      [ChainId.KOVAN]:
        'https://kovan.infura.io/v3/22d470f315a24a399611a4dc05301973',
    };

export const network = new NetworkConnector({
  defaultChainId: ChainId.FANTOM,
  urls: RPC,
});

export const injected = new InjectedConnector({
  supportedChainIds: isMainnet
    ? [
        250, // fantom
      ]
    : [
        // 4002, // fantom testnet
        42,
      ],
});

export const walletlink = new WalletLinkConnector({
  url: 'https://rpc.ftm.tools',
  appName: 'Artion',
  appLogoUrl: ARTION_LOGO_URL,
});
