import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, trend = "neutral", className = "" }: StatsCardProps) => {
  const trendColors = {
    up: "text-secondary",
    down: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <div className={`farm-plot ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-neon p-0.5">
          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary animate-pulse-glow" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-tech text-muted-foreground">{title}</p>
        <p className="text-2xl font-orbitron font-bold text-glow">{value}</p>
        {subtitle && (
          <p className={`text-sm font-tech ${trendColors[trend]}`}>{subtitle}</p>
        )}
      </div>
    </div>
  );
};