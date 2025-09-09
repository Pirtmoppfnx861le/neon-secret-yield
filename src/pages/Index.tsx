import { Header } from "@/components/Header";
import { FarmPlot } from "@/components/FarmPlot";
import { StatsCard } from "@/components/StatsCard";
import { DollarSign, Users, Zap, TrendingUp, Shield, Coins } from "lucide-react";

const Index = () => {
  const farmPools = [
    {
      name: "Neon ETH",
      token: "nETH/USDC",
      apy: 127.5,
      tvl: "12.4M",
      userStaked: "2,450.75 nETH",
      rewards: "18.234 nETH"
    },
    {
      name: "Shadow BTC",
      token: "sBTC/USDT", 
      apy: 89.3,
      tvl: "8.7M",
      userStaked: "1.234 sBTC",
      rewards: "0.045 sBTC"
    },
    {
      name: "Phantom LINK",
      token: "pLINK/DAI",
      apy: 156.7,
      tvl: "5.2M"
    },
    {
      name: "Ghost ADA",
      token: "gADA/USDC",
      apy: 94.2,
      tvl: "3.8M"
    },
    {
      name: "Crypto MATIC",
      token: "cMATIC/USDT",
      apy: 203.4,
      tvl: "7.1M",
      userStaked: "15,678.90 cMATIC",
      rewards: "234.567 cMATIC"
    },
    {
      name: "Stealth SOL",
      token: "sSOL/USDC",
      apy: 78.9,
      tvl: "9.3M"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Value Locked"
            value="$42.7M"
            subtitle="+12.5% from last week"
            icon={DollarSign}
            trend="up"
          />
          <StatsCard
            title="Active Farmers"
            value="3,247"
            subtitle="+147 new this week"
            icon={Users}
            trend="up"
          />
          <StatsCard
            title="Avg APY"
            value="124.8%"
            subtitle="Across all pools"
            icon={TrendingUp}
            trend="neutral"
          />
          <StatsCard
            title="Encryption Level"
            value="FHE-256"
            subtitle="Fully Homomorphic"
            icon={Shield}
            trend="neutral"
          />
        </div>

        {/* Farm Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-orbitron font-bold text-glow mb-2">
                Encrypted Farm Plots
              </h2>
              <p className="text-muted-foreground font-tech text-lg">
                Stake your assets with complete privacy. All positions and rewards are encrypted using FHE technology.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-accent">
              <Zap className="w-5 h-5 animate-pulse-glow" />
              <span className="font-tech font-semibold">Live Farming</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmPools.map((pool, index) => (
              <FarmPlot
                key={index}
                name={pool.name}
                token={pool.token}
                apy={pool.apy}
                tvl={pool.tvl}
                userStaked={pool.userStaked}
                rewards={pool.rewards}
                isEncrypted={true}
              />
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="farm-plot">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-neon p-0.5">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary animate-pulse-glow" />
                </div>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-glow">Privacy Features</h3>
                <p className="text-muted-foreground font-tech">Zero-knowledge farming</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></div>
                <span className="font-tech">Encrypted staking positions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse-glow"></div>
                <span className="font-tech">Private reward calculations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow"></div>
                <span className="font-tech">Anonymous yield farming</span>
              </div>
            </div>
          </div>

          <div className="farm-plot">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-neon p-0.5">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <Coins className="w-6 h-6 text-secondary animate-pulse-glow" />
                </div>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-glow">Reward System</h3>
                <p className="text-muted-foreground font-tech">Automated distribution</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-tech text-muted-foreground">Daily Rewards</span>
                <span className="font-orbitron font-bold text-primary text-glow">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-tech text-muted-foreground">Auto-Compounding</span>
                <span className="font-orbitron font-bold text-secondary text-glow">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-tech text-muted-foreground">Gas Optimization</span>
                <span className="font-orbitron font-bold text-accent text-glow">Layer 2</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;