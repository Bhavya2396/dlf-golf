'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  CameraIcon,
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Course Record',
    description: 'Shot a personal best of 68 at DLF Championship Course',
    date: 'Mar 15, 2024',
    icon: '/illustrations/tee-off.svg'
  },
  {
    id: '2',
    title: 'First Eagle',
    description: 'Scored first eagle on hole 14',
    date: 'Mar 8, 2024',
    icon: '/illustrations/golf-course-hero.svg'
  },
  {
    id: '3',
    title: '10 Rounds Milestone',
    description: 'Completed 10 rounds this season',
    date: 'Mar 1, 2024',
    icon: '/illustrations/players.svg'
  }
];

const menuItems = [
  { icon: UserIcon, label: 'Edit Profile', href: '/profile/edit' },
  { icon: BellIcon, label: 'Notifications', href: '/profile/notifications' },
  { icon: ShieldCheckIcon, label: 'Privacy', href: '/profile/privacy' },
  { icon: DocumentTextIcon, label: 'Terms & Conditions', href: '/profile/terms' },
  { icon: QuestionMarkCircleIcon, label: 'Help & Support', href: '/profile/support' },
  { icon: ArrowRightOnRectangleIcon, label: 'Sign Out', href: '/logout' }
];

export default function ProfilePage() {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

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
            Profile
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[2.75rem] pb-safe">
        {/* Profile Header */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[35vh] overflow-hidden"
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

          {/* Profile Content */}
          <div className="relative h-full flex flex-col justify-end px-3 pb-3">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-end gap-4"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 border-2 border-[#0A4B3A]"
                >
                  <CameraIcon className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  John Smith
                </h2>
                <p className="text-white/90 drop-shadow-lg">
                  Member since 2023
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Overview */}
        <section className="px-3 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { icon: ChartBarIcon, label: 'Handicap', value: '12.4' },
              { icon: TrophyIcon, label: 'Best Score', value: '68' },
              { icon: ClockIcon, label: 'Rounds', value: '24' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                >
                  <Icon className="w-5 h-5 text-white/60 mb-2" />
                  <div className="text-lg font-semibold">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Recent Achievements */}
        <section className="px-3 py-3">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg font-semibold mb-3"
          >
            Recent Achievements
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10">
                    <Image
                      src={achievement.icon}
                      alt={achievement.title}
                      fill
                      className="object-cover p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <span className="text-xs text-white/60">{achievement.date}</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 bottom-0 w-80 bg-[#0A4B3A] border-l border-white/10 p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Settings</h2>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => router.push(item.href)}
                        className="w-full p-3 rounded-xl bg-white/5 flex items-center justify-between hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-white/60" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-white/40" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 