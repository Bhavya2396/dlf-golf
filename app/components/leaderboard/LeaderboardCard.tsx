import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrophyIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface PlayerStats {
  rank: number;
  previousRank: number;
  name: string;
  handicap: number;
  roundsPlayed: number;
  averageScore: number;
  profileImage?: string;
}

interface LeaderboardCardProps {
  title: string;
  timeframe: string;
  players: PlayerStats[];
}

export default function LeaderboardCard({ title, timeframe, players }: LeaderboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <span className="text-sm text-white/60">{timeframe}</span>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {players.map((player) => (
          <motion.div
            key={player.name}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className="flex items-center gap-4 p-4"
          >
            <div className="w-8 text-center font-semibold">
              {player.rank}
              <div className="text-xs">
                {player.previousRank < player.rank ? (
                  <ChevronDownIcon className="w-3 h-3 text-red-400 inline" />
                ) : player.previousRank > player.rank ? (
                  <ChevronUpIcon className="w-3 h-3 text-emerald-400 inline" />
                ) : null}
              </div>
            </div>

            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10">
              {player.profileImage ? (
                <Image
                  src={player.profileImage}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  {player.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium">{player.name}</div>
              <div className="text-sm text-white/60">
                Handicap: {player.handicap}
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium">{player.averageScore}</div>
              <div className="text-sm text-white/60">
                {player.roundsPlayed} rounds
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 