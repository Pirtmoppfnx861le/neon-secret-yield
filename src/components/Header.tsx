import { Zap, Shield } from "lucide-react";
import woodenBanner from "@/assets/wooden-banner.jpg";
import { WalletConnect } from "./WalletConnect";

export const Header = () => {
  return (
    <header className="relative">
      {/* Wooden Banner */}
      <div className="wooden-banner py-4 px-8 mx-4 mt-4 rounded-xl">
        <div className="flex items-center justify-center gap-4">
          <Shield className="w-8 h-8 text-amber-200" />
          <img 
            src={woodenBanner} 
            alt="FHE Technology Inside" 
            className="h-16 object-contain rounded-lg shadow-lg"
          />
          <Shield className="w-8 h-8 text-amber-200" />
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-8 py-6 bg-gradient-farm border-b border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-neon p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary animate-pulse-glow" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-orbitron font-bold text-glow">Anonymous Farm</h1>
            <p className="text-sm text-muted-foreground font-tech">Encrypted Yield Farming Protocol</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-sm font-tech">
            <div className="text-center">
              <p className="text-muted-foreground">TVL</p>
              <p className="text-primary font-semibold text-glow">$42.7M</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">APY</p>
              <p className="text-secondary font-semibold text-glow">127.5%</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Farmers</p>
              <p className="text-accent font-semibold text-glow">3,247</p>
            </div>
          </div>
          
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};