'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  CalendarIcon, 
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
  PlayIcon,
  ChartBarIcon,
  FlagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const quickStats = [
  {
    label: 'Handicap',
    value: '12.4',
    trend: '-0.8',
    isPositive: true,
    icon: <ChartBarIcon className="w-5 h-5" />
  },
  {
    label: 'Rounds',
    value: '24',
    trend: '+3',
    isPositive: true,
    icon: <FlagIcon className="w-5 h-5" />
  }
];

const recentGames = [
  {
    date: 'Mar 10, 2024',
    course: 'DLF Championship Course',
    score: '76',
    vs_par: 4,
    highlights: ['2 Birdies', '12 Pars']
  },
  {
    date: 'Mar 8, 2024',
    course: 'DLF Links Course',
    score: '72',
    vs_par: 0,
    highlights: ['Eagle on 14', '3 Birdies']
  }
];

export default function PlayPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]">
      {/* Floating Header with Blur Effect */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A4B3A]/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-lg font-semibold"
          >
            Play Golf
          </motion.h1>
          <div className="w-9" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[2.75rem]">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[28vh] overflow-hidden"
        >
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A4B3A]/60 via-[#0A4B3A]/20 to-[#0A4B3A]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A4B3A] via-transparent to-transparent" />
          
          {/* Golf Course Illustration */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 -top-20"
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
          <div className="relative h-full flex flex-col justify-end px-4 pb-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-1"
            >
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Start Playing
              </h2>
              <p className="text-base text-white/90 drop-shadow-lg">
                Book a tee time or track your score
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="px-4 pt-2 pb-4 space-y-4">
          {/* Quick Stats */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {quickStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
              >
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  {stat.icon}
                  <span>{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-sm ${
                    stat.isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Actions */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/play/book')}
              className="w-full p-6 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 relative overflow-hidden shadow-lg"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <ClockIcon className="w-6 h-6" />
                  <span className="text-lg font-semibold">Book Tee Time</span>
                </div>
                <p className="text-white/80">Reserve your next round at DLF Golf Club</p>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20">
                <Image
                  src="/illustrations/tee-off.svg"
                  alt="Tee Off"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/play/score')}
              className="w-full p-6 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 relative overflow-hidden shadow-lg"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <PlayIcon className="w-6 h-6" />
                  <span className="text-lg font-semibold">Start Round</span>
                </div>
                <p className="text-white/60">Track your score and stats in real-time</p>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
                <Image
                  src="/illustrations/golf-course-hero.svg"
                  alt="Golf Course"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.button>
          </motion.div>

          {/* Recent Games */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold">Recent Games</h2>
            <div className="space-y-2">
              {recentGames.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{game.date}</div>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{game.course}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">{game.score}</div>
                      <div className={`text-sm ${
                        game.vs_par <= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {game.vs_par <= 0 ? '' : '+'}
                        {game.vs_par}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {game.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-white/10 text-xs text-white/80"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tee Times */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-white/60" />
                <h2 className="text-lg font-semibold">Next Tee Time</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-emerald-400"
              >
                View All
              </motion.button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Tomorrow, 7:00 AM</div>
                <div className="text-sm text-white/60">DLF Championship Course</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
} 