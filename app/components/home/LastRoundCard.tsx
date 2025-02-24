'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FlagIcon,
  ClockIcon,
  ChartBarIcon,
  MapPinIcon,
  UserGroupIcon,
  SunIcon,
  ArrowTrendingUpIcon,
  CloudIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

interface LastRoundCardProps {
  course: string;
  date: string;
  score: number;
  stats: {
    fairways: number;
    greens: number;
    putts: number;
    handicap: number;
  };
  highlights: Array<{
    hole: number;
    achievement: string;
    description: string;
    icon: string;
  }>;
  weather: {
    temp: number;
    condition: string;
    windSpeed: number;
    humidity: number;
  };
  playedWith: Array<{
    name: string;
    avatar: string;
    handicap: number;
  }>;
  courseDetails: {
    totalPar: number;
    length: number;
    difficulty: string;
  };
}

export const LastRoundCard: React.FC<LastRoundCardProps> = ({
  course,
  date,
  score,
  stats,
  highlights,
  weather,
  playedWith,
  courseDetails
}) => {
  return (
    <motion.div 
      className="material-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
        {/* Left Column */}
        <div className="relative">
          <div className="relative h-full min-h-[300px]">
            <Image
              src={highlights[0].icon}
              alt={course}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            
            <div className="absolute bottom-0 w-full p-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{course}</h3>
                <div className="flex items-center gap-3 text-white/80 mb-4">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">{date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{courseDetails.length}y</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FlagIcon className="w-4 h-4" />
                    <span className="text-sm">Par {courseDetails.totalPar}</span>
                  </div>
                </div>

                {/* Weather Info */}
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <SunIcon className="w-5 h-5 text-[var(--accent-mint)]" />
                    <span>{weather.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudIcon className="w-5 h-5 text-[var(--accent-mint)]" />
                    <span>{weather.windSpeed}km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-6 flex flex-col gap-6">
          {/* Score and Stats */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-white/60">Final Score</div>
                <div className="text-4xl font-bold text-white">{score}</div>
                <div className="text-sm text-[var(--accent-mint)]">
                  {score - courseDetails.totalPar > 0 ? '+' : ''}{score - courseDetails.totalPar}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Difficulty</div>
                <div className="text-lg font-bold text-[var(--accent-mint)]">{courseDetails.difficulty}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <div className="text-base font-bold text-[var(--accent-mint)]">{stats.fairways}%</div>
                <div className="text-xs text-white/60">FIR</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <div className="text-base font-bold text-[var(--accent-mint)]">{stats.greens}%</div>
                <div className="text-xs text-white/60">GIR</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <div className="text-base font-bold text-[var(--accent-mint)]">{stats.putts}</div>
                <div className="text-xs text-white/60">Putts</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <div className="text-base font-bold text-[var(--accent-mint)]">{stats.handicap}</div>
                <div className="text-xs text-white/60">HC</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Highlights</h4>
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={highlight.icon}
                      alt={highlight.achievement}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Hole {highlight.hole}</div>
                      <div className="text-xs text-[var(--accent-mint)]">{highlight.achievement}</div>
                    </div>
                    <div className="text-xs text-white/60">{highlight.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Players */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Playing Partners</h4>
            <div className="flex flex-wrap gap-2">
              {playedWith.map((player, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={player.avatar}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{player.name}</div>
                    <div className="text-xs text-white/60">HC: {player.handicap}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 