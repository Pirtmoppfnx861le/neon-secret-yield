import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet, polygon, arbitrum } from 'wagmi/chains';

// Configure supported chains for FHE network
export const config = getDefaultConfig({
  appName: 'Neon Secret Yield',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [sepolia, mainnet, polygon, arbitrum],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  [mainnet.id]: import.meta.env.VITE_CONTRACT_ADDRESS_MAINNET || '0x...',
  [sepolia.id]: import.meta.env.VITE_CONTRACT_ADDRESS_SEPOLIA || '0x...',
  [polygon.id]: import.meta.env.VITE_CONTRACT_ADDRESS_POLYGON || '0x...',
  [arbitrum.id]: import.meta.env.VITE_CONTRACT_ADDRESS_ARBITRUM || '0x...',
} as const

// ABI for the smart contract
export const CONTRACT_ABI = [
  // Function signatures will be added when we create the contract
  {
    "inputs": [],
    "name": "getTotalValueLocked",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveFarmers",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const
