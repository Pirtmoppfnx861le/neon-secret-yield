import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sprout, TrendingUp, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FarmPlotProps {
  name: string;
  token: string;
  apy: number;
  tvl: string;
  userStaked?: string;
  rewards?: string;
  isEncrypted?: boolean;
}

export const FarmPlot = ({ name, token, apy, tvl, userStaked, rewards, isEncrypted = true }: FarmPlotProps) => {
  const [showEncrypted, setShowEncrypted] = useState(true);
  
  return (
    <div className="farm-plot group cursor-pointer">
      {/* Plot Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-neon p-0.5">
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary animate-grow-asset" />
            </div>
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-lg text-glow">{name}</h3>
            <p className="text-sm text-muted-foreground font-tech">{token}</p>
          </div>
        </div>
        
        {isEncrypted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="text-accent hover:text-accent-glow"
          >
            {showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground font-tech">APY</span>
          </div>
          <p className="text-xl font-orbitron font-bold text-secondary text-glow">
            {apy}%
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-tech">TVL</span>
          </div>
          <p className="text-xl font-orbitron font-bold text-primary text-glow">
            {tvl}
          </p>
        </div>
      </div>

      {/* User Stats */}
      {userStaked && (
        <div className="space-y-3 mb-6 p-3 rounded-lg bg-muted/20 border border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-sm font-tech text-muted-foreground">Your Stake</span>
            <span className="font-orbitron font-semibold text-foreground">
              {showEncrypted && isEncrypted ? "████.██" : userStaked}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-tech text-muted-foreground">Pending Rewards</span>
            <span className="font-orbitron font-semibold text-accent text-glow">
              {showEncrypted && isEncrypted ? "██.███" : rewards}
            </span>
          </div>
          
          <Progress value={65} className="h-2" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          className="neon-border bg-transparent hover:bg-primary/20 transition-all font-tech"
        >
          Stake
        </Button>
        <Button 
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary/20 transition-all font-tech"
        >
          Harvest
        </Button>
      </div>
      
      {/* Encryption Indicator */}
      {isEncrypted && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
          <Lock className="w-3 h-3 text-accent" />
        </div>
      )}
    </div>
  );
};