'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import StatsOverview from '../components/stats/StatsOverview';
import LeaderboardCard from '../components/leaderboard/LeaderboardCard';

const dummyPerformance = {
  handicap: {
    label: 'Handicap',
    value: 12.4,
    trend: -0.6,
    isPositive: true
  },
  averageScore: {
    label: 'Avg Score',
    value: 76,
    trend: -2.3,
    isPositive: true
  },
  fairwaysHit: {
    label: 'Fairways',
    value: 68,
    trend: 5,
    isPositive: true
  },
  puttsPerRound: {
    label: 'Putts/Round',
    value: 31,
    trend: 2,
    isPositive: false
  }
};

const dummyLeaderboard = {
  title: 'Club Rankings',
  timeframe: 'This Month',
  players: [
    {
      rank: 1,
      previousRank: 2,
      name: 'John Smith',
      handicap: 8.2,
      roundsPlayed: 12,
      averageScore: 74,
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    {
      rank: 2,
      previousRank: 1,
      name: 'Mike Johnson',
      handicap: 9.1,
      roundsPlayed: 10,
      averageScore: 75,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    {
      rank: 3,
      previousRank: 3,
      name: 'Sarah Williams',
      handicap: 10.4,
      roundsPlayed: 8,
      averageScore: 77,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
  ]
};

export default function StatsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]">
      {/* Floating Header with Blur Effect */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A4B3A]/80 backdrop-blur-lg border-b border-white/10 safe-top"
      >
        <div className="max-w-lg mx-auto px-3 py-2 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-base font-semibold"
          >
            Statistics
          </motion.h1>
          <div className="w-8" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[2.75rem] pb-safe">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[25vh] overflow-hidden"
        >
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A4B3A]/60 via-[#0A4B3A]/20 to-[#0A4B3A]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A4B3A] via-transparent to-transparent" />
          
          {/* Golf Course Illustration */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 -top-16"
          >
            <Image
              src="/illustrations/golf-course-hero.svg"
              alt="Golf Course"
              fill
              className="object-cover object-top opacity-90"
              priority
            />
          </motion.div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col justify-end px-3 pb-3">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-0.5"
            >
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Your Stats
              </h2>
              <p className="text-sm text-white/90 drop-shadow-lg">
                Track your performance
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="px-3 py-3 space-y-6">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsOverview performance={dummyPerformance} />
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LeaderboardCard {...dummyLeaderboard} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
            >
              <div className="text-base font-semibold">View History</div>
              <div className="text-xs text-white/60">Past rounds & stats</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/play/setup')}
              className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600"
            >
              <div className="text-base font-semibold">Start Round</div>
              <div className="text-xs text-white/80">Track new game</div>
            </motion.button>
          </motion.div>
        </section>
      </main>
    </div>
  );
} 