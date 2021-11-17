import { ChainId } from '@sushiswap/sdk';

export const NETWORK_LABEL = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Matic',
  [ChainId.MATIC_TESTNET]: 'Matic Testnet',
  [ChainId.XDAI]: 'xDai',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBASE]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
};

export const Contracts = {
  [ChainId.FANTOM]: {
    auction: '0x951Cc69504d39b3eDb155CA99f555E47E044c2F1',
    sales: '0xa06aecbb8CD9328667f8E05f288e5b3ac1CFf852',
    bundleSales: '0x56aD389A02Ea9d63f13106cB0c161342f537a92e',
    factory: '0xCC7A2eC7A8A0564518fD3D2ca0Df8B2137626144', //FantomNFTFactory
    privateFactory: '0xe5841838Dd7e522f217DfFBCEaef82F04EC649Cd', //FantomNFTFactoryPrivate
    artFactory: '0x520DaB621f93F59d3557174280AB1B6d4FB8c956', //FantomArtFactory
    privateArtFactory: '0x736Eae40AdFf88570b92378c97a0D11b44E1C953', //FantomArtFactoryPrivate
  },
  [ChainId.FANTOM_TESTNET]: {
    // auction: '0x19dC382b09Bb7f733a633aDa70af89f7C16F4f68',
    // sales: '0xc6a29aFa00B668De4a11897b627F3011842A8948',
    // bundleSales: '0x9C3682631Cf77aD54461e434819c444D427Ce429',
    // factory: '0xA7dacD023F5d5e827cEC42255EA859A1544269Af', //FantomNFTFactory
    // privateFactory: '0xC3d390628D8d7080197cA6a79a7ABa0430229C37', //FantomNFTFactoryPrivate
    // artFactory: '0x864Acb6d06E24486730138245da3A612b74c1Ddf', //FantomArtFactory
    // privateArtFactory: '0x8637DBB197768e8Ad0E5cc98f738B64C10452F72', //FantomArtFactoryPrivate
    auction: '0xaE404fAf67E75479EB2afF3908D1277Ac608Ef96',
    sales: '0xA8086941a6154B12760244D0BEea60A961Ace003',
    bundleSales: '0x7523f5FBE540FAb456eB1712cfdA949894f0DEe4',
    factory: '0xc2BF7E379A22468d981D824D6EADED80E30377ef', //FantomNFTFactory
    privateFactory: '0x7faFca7587E1D288e8Ea72131B3e4348bb27154b', //FantomNFTFactoryPrivate
    artFactory: '0x56Dd3039FBbc3f84F7Ca17AD2A41B004816B5436', //FantomArtFactory
    privateArtFactory: '0x1FcBE8523806e2AB02703C5CA7Aa503046E054Bc', //FantomArtFactoryPrivate
  },
  [ChainId.KOVAN]:{
    auction: '0x7523f5FBE540FAb456eB1712cfdA949894f0DEe4',
    sales: '0x5cFFEa91d0e19E36a6756FDa4D3173742cBa207b',
    bundleSales: '0xA8086941a6154B12760244D0BEea60A961Ace003',
    factory: '0x2D9fABDA8e7f6aDF40a7cb6fA1Fb49B64f4AD89C', //FantomNFTFactory
    privateFactory: '0xaE404fAf67E75479EB2afF3908D1277Ac608Ef96', //FantomNFTFactoryPrivate
    artFactory: '0x448e7412946E2A71f611032B33ce90F40ACe1622', //FantomArtFactory
    privateArtFactory: '0xb21242f9d8096eA014aE2F975e02341ce981cE7d', //FantomArtFactoryPrivate
  },
};
