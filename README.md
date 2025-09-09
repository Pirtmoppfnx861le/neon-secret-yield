# Neon Secret Yield

A privacy-preserving yield farming protocol built with Fully Homomorphic Encryption (FHE) technology. Stake your assets with complete privacy while earning rewards through encrypted farming positions.

## Features

- **FHE-Encrypted Staking**: All positions and rewards are encrypted using FHE technology
- **Privacy-First Design**: Zero-knowledge farming with anonymous positions
- **High APY Pools**: Access to multiple high-yield farming pools
- **Auto-Compounding**: Automated reward distribution and compounding
- **Layer 2 Optimized**: Gas-efficient transactions on Layer 2 networks

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: FHE-enabled smart contracts
- **Encryption**: Fully Homomorphic Encryption (FHE-256)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pirtmoppfnx861le/neon-secret-yield.git
cd neon-secret-yield
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main header component
│   ├── FarmPlot.tsx    # Farm pool display component
│   └── StatsCard.tsx   # Statistics display component
├── pages/              # Page components
│   ├── Index.tsx       # Main dashboard page
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Smart Contract Integration

The frontend integrates with FHE-enabled smart contracts for:
- Encrypted staking positions
- Private reward calculations
- Anonymous yield farming
- Secure fund management

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

## Security

- All sensitive data is encrypted using FHE technology
- Private keys are managed securely through wallet integration
- Smart contracts are audited for security vulnerabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.