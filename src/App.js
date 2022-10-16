import logo from './logo.svg';
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton, getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { Chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { chain, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
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
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton/>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}