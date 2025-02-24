import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface StatMetric {
  label: string;
  value: number;
  trend: number;
  isPositive: boolean;
}

interface PerformanceData {
  handicap: StatMetric;
  averageScore: StatMetric;
  fairwaysHit: StatMetric;
  puttsPerRound: StatMetric;
}

interface StatsOverviewProps {
  performance: PerformanceData;
}

interface RoundData {
  date: string;
  score: number;
  par: number;
  course: string;
}

const recentRounds: RoundData[] = [
  { date: 'Mar 15', score: 72, par: 72, course: 'DLF Championship' },
  { date: 'Mar 12', score: 75, par: 72, course: 'DLF Valley' },
  { date: 'Mar 8', score: 71, par: 72, course: 'DLF Championship' },
  { date: 'Mar 5', score: 73, par: 72, course: 'DLF Links' },
  { date: 'Mar 1', score: 70, par: 72, course: 'DLF Championship' },
];

const timeframes = ['Last 5 Rounds', 'Last 10 Rounds', 'This Season'] as const;
type Timeframe = typeof timeframes[number];

export default function StatsOverview({ performance }: StatsOverviewProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('Last 5 Rounds');
  const metrics = [
    {
      ...performance.handicap,
      icon: <TrophyIcon className="w-5 h-5" />,
      color: 'from-amber-500/20 to-orange-500/20'
    },
    {
      ...performance.averageScore,
      icon: <ChartBarIcon className="w-5 h-5" />,
      color: 'from-emerald-500/20 to-blue-500/20'
    },
    {
      ...performance.fairwaysHit,
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      ...performance.puttsPerRound,
      icon: <ClockIcon className="w-5 h-5" />,
      color: 'from-blue-500/20 to-indigo-500/20'
    }
  ];

  const getScoreColor = (score: number, par: number) => {
    const diff = score - par;
    if (diff < 0) return 'text-emerald-400';
    if (diff === 0) return 'text-white';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number, par: number) => {
    const diff = score - par;
    if (diff === 0) return 'E';
    return diff > 0 ? `+${diff}` : diff;
  };

  const maxScore = Math.max(...recentRounds.map(round => round.score));
  const minScore = Math.min(...recentRounds.map(round => round.score));
  const scoreRange = maxScore - minScore;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl bg-gradient-to-br ${metric.color} p-3 backdrop-blur-lg border border-white/10`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {metric.icon}
              <span className="text-sm font-medium">{metric.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-xl font-bold">{metric.value}</div>
              <div className={`flex items-center gap-1 text-xs ${
                metric.isPositive ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {metric.isPositive ? (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                {Math.abs(metric.trend)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 p-3"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Recent Performance</h3>
          <div className="relative">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as Timeframe)}
              className="appearance-none bg-white/5 rounded-lg px-2 py-1 text-xs border border-white/10 pr-7"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe} value={timeframe}>{timeframe}</option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
          </div>
        </div>
        <div className="h-40">
          <div className="relative h-32">
            {/* Score Lines */}
            {recentRounds.map((round, index) => {
              const nextRound = recentRounds[index + 1];
              if (!nextRound) return null;
              
              const currentHeight = ((maxScore - round.score) / scoreRange) * 100;
              const nextHeight = ((maxScore - nextRound.score) / scoreRange) * 100;
              const x1 = `${(index / (recentRounds.length - 1)) * 100}%`;
              const x2 = `${((index + 1) / (recentRounds.length - 1)) * 100}%`;
              
              return (
                <svg
                  key={round.date}
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <line
                    x1={x1}
                    y1={`${currentHeight}%`}
                    x2={x2}
                    y2={`${nextHeight}%`}
                    stroke="rgb(52, 211, 153)"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                </svg>
              );
            })}
            
            {/* Score Points */}
            {recentRounds.map((round, index) => {
              const height = ((maxScore - round.score) / scoreRange) * 100;
              const left = `${(index / (recentRounds.length - 1)) * 100}%`;
              
              return (
                <motion.div
                  key={round.date}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute w-3 h-3 bg-emerald-500 rounded-full -translate-x-1.5 -translate-y-1.5"
                  style={{
                    left,
                    top: `${height}%`,
                  }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap">
                    <span className={`text-xs font-medium ${getScoreColor(round.score, round.par)}`}>
                      {getScoreLabel(round.score, round.par)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* X-Axis Labels */}
          <div className="flex justify-between mt-2">
            {recentRounds.map((round) => (
              <div key={round.date} className="text-xs text-white/60">
                {round.date}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Shot Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 p-3"
      >
        <h3 className="text-base font-semibold mb-3">Shot Distribution</h3>
        <div className="space-y-3">
          {[
            { label: 'Drives', data: [65, 20, 15] },
            { label: 'Approaches', data: [55, 30, 15] },
            { label: 'Putting', data: [45, 40, 15] }
          ].map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span>{stat.label}</span>
                <span className="text-white/60">
                  {stat.data[0]}% accuracy
                </span>
              </div>
              <div className="flex h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500"
                  style={{ width: `${stat.data[0]}%` }}
                />
                <div 
                  className="bg-yellow-500"
                  style={{ width: `${stat.data[1]}%` }}
                />
                <div 
                  className="bg-red-500"
                  style={{ width: `${stat.data[2]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 