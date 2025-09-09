# Vercel Environment Variables Setup

## Required Environment Variables

Please set the following environment variables in your Vercel project settings:

### 1. WalletConnect Project ID
```
Name: VITE_WALLETCONNECT_PROJECT_ID
Value: [Get from https://cloud.walletconnect.com]
Environment: Production, Preview, Development
```

### 2. Contract Addresses (Set after deployment)
```
Name: VITE_CONTRACT_ADDRESS_SEPOLIA
Value: 0x... (Deploy contract first)
Environment: Production, Preview, Development

Name: VITE_CONTRACT_ADDRESS_MAINNET
Value: 0x... (Deploy contract first)
Environment: Production, Preview, Development

Name: VITE_CONTRACT_ADDRESS_POLYGON
Value: 0x... (Deploy contract first)
Environment: Production, Preview, Development

Name: VITE_CONTRACT_ADDRESS_ARBITRUM
Value: 0x... (Deploy contract first)
Environment: Production, Preview, Development
```

### 3. Verifier and Treasury Addresses
```
Name: VITE_VERIFIER_ADDRESS
Value: 0x... (Your verifier wallet address)
Environment: Production, Preview, Development

Name: VITE_TREASURY_ADDRESS
Value: 0x... (Your treasury wallet address)
Environment: Production, Preview, Development
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel Dashboard
2. Select your `neon-secret-yield` project
3. Click on "Settings" tab
4. Click on "Environment Variables" in the left sidebar
5. Click "Add New" for each variable above
6. Make sure to select all environments (Production, Preview, Development)
7. Click "Save" after adding each variable

## Getting WalletConnect Project ID

1. Visit [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up or log in
3. Click "Create Project"
4. Fill in project details:
   - Project Name: Neon Secret Yield
   - Project Description: Privacy-preserving yield farming with FHE
   - Project URL: https://your-vercel-domain.vercel.app
5. Copy the Project ID (32-character string)
6. Use this ID as the value for `VITE_WALLETCONNECT_PROJECT_ID`

## After Setting Environment Variables

1. Go to "Deployments" tab in Vercel
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

## Troubleshooting

- If deployment still fails, check the build logs in Vercel
- Ensure all environment variables are set for all environments
- Make sure there are no extra spaces in the variable values
- Verify that the WalletConnect Project ID is correct
