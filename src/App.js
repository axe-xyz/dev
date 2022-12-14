import logo from './logo.svg';
import React, { useState } from 'react'
import ReactScrollableList from 'react'
import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton, getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { Chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { chain, createClient, WagmiConfig } from "wagmi";
// import SignMessage from './hopScripts/bridge';
import EthArbBridge from './hopScripts/bridge';
import { publicProvider } from "wagmi/providers/public";

const arbitrum_testnet: Chain = {
  id: 421613,
  name: 'Arbitrum Testnet',
  network: 'Arbitrum Nitro Rollup Testnet',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Arbitrum Goerli',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://goerli-rollup.arbitrum.io/rpc',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli-rollup-explorer.arbitrum.io/' },
    etherscan: { name: 'Etherscan', url: 'https://goerli-rollup-explorer.arbitrum.io/' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon,arbitrum_testnet],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

export default function App() {
  return (
    <div>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton/>
        <button onClick={()=> {EthArbBridge(provider,wagmiClient)}}> Swap ETH into Arbitrum </button>
      </RainbowKitProvider>
    </WagmiConfig>

    <div>
      <h3>Supported Chains:</h3>
      Arbitrum Testnet, Ethereum, polygon
          </div>
    </div>

  );
}