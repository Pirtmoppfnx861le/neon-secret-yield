# Deployment Guide

This guide covers deploying the Neon Secret Yield application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Prepare all required environment variables

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Addresses (fill after deployment)
VITE_CONTRACT_ADDRESS_SEPOLIA=0x...
VITE_CONTRACT_ADDRESS_MAINNET=0x...
VITE_CONTRACT_ADDRESS_POLYGON=0x...
VITE_CONTRACT_ADDRESS_ARBITRUM=0x...

# Verifier and Treasury Addresses
VITE_VERIFIER_ADDRESS=0x...
VITE_TREASURY_ADDRESS=0x...
```

## Smart Contract Deployment

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-verify
```

### 2. Configure Environment

Copy `env.example` to `.env` and fill in your values:

```bash
cp env.example .env
```

### 3. Deploy Contract

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

### 4. Verify Contract

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <VERIFIER_ADDRESS> <TREASURY_ADDRESS>
```

## Vercel Deployment

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the project folder

### 2. Configure Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In the Vercel dashboard, go to Settings > Environment Variables and add:

```
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_CONTRACT_ADDRESS_SEPOLIA=0x...
VITE_CONTRACT_ADDRESS_MAINNET=0x...
VITE_CONTRACT_ADDRESS_POLYGON=0x...
VITE_CONTRACT_ADDRESS_ARBITRUM=0x...
VITE_VERIFIER_ADDRESS=0x...
VITE_TREASURY_ADDRESS=0x...
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Post-Deployment

### 1. Update Contract Addresses

After deploying the smart contract, update the environment variables in Vercel with the actual contract addresses.

### 2. Test the Application

1. Visit your deployed URL
2. Connect a wallet
3. Test the staking functionality
4. Verify FHE encryption is working

### 3. Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are installed
2. **Wallet Connection Issues**: Verify WalletConnect Project ID
3. **Contract Interaction Issues**: Check contract addresses and network
4. **FHE Errors**: Ensure FHE library is properly configured

### Support

For issues related to:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Smart Contracts**: Check [Hardhat Documentation](https://hardhat.org/docs)
- **FHE**: Check [FHEVM Documentation](https://docs.fhevm.org)

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Environment Variables**: Use Vercel's environment variable system
3. **Contract Verification**: Always verify contracts on block explorers
4. **Access Control**: Implement proper access controls in smart contracts

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider adding Sentry or similar
3. **Performance**: Monitor Core Web Vitals
4. **Smart Contract**: Monitor contract events and transactions
