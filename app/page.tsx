'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import {
  CalendarIcon, UserGroupIcon, ChartBarIcon, TrophyIcon,
  BoltIcon, StarIcon, FireIcon, UserIcon, BellIcon,
  SunIcon, MapPinIcon, ClockIcon, FlagIcon,
  ArrowRightIcon, ExclamationTriangleIcon,
  ShoppingBagIcon, SparklesIcon, HeartIcon,
  HomeIcon, XMarkIcon as XIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import ProShopDeals from './components/shop/ProShopDeals';
import ClubFeed from './components/feed/ClubFeed';

// Helper Component Interfaces
interface StatusCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subLabel?: string;
  bgColor: string;
  illustration: string;
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  primary?: boolean;
  illustration: string;
}

interface CourseUpdate {
  id: string;
  type: 'maintenance' | 'weather';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  illustration: string;
}

interface CourseUpdateCardProps {
  update: CourseUpdate;
}

// Helper Functions
const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high': return 'bg-red-500/20 text-red-500';
    case 'medium': return 'bg-yellow-500/20 text-yellow-500';
    case 'low': return 'bg-green-500/20 text-green-500';
    default: return 'bg-white/20 text-white';
  }
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({ temp: 28, condition: 'Sunny', humidity: 65, windSpeed: 12 });
  const [nextTeeTime, setNextTeeTime] = useState('14:30');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerSpring = useSpring(headerOpacity, { stiffness: 100, damping: 30 });

  const [courseUpdates] = useState<CourseUpdateCardProps['update'][]>([
    {
      id: '1',
      type: 'maintenance' as const,
      title: 'Bunker Maintenance',
      description: 'Renovation work on hole 7',
      priority: 'medium' as const,
      time: '2h ago',
      illustration: '/illustrations/maintenance.svg'
    },
    {
      id: '2',
      type: 'weather' as const,
      title: 'Weather Alert',
      description: 'Light showers expected at 2 PM',
      priority: 'low' as const,
      time: '1h ago',
      illustration: '/illustrations/weather.svg'
    }
  ]);

  const router = useRouter();

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]" ref={scrollRef}>
      {/* Floating Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 pt-1"
        style={{ opacity: headerSpring }}
      >
        <div className="flex items-center justify-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
              <Image
              src="/DLF-logo-01.png"
              alt="DLF Golf"
              width={90}
              height={24}
              className="object-cover brightness-0 invert drop-shadow-md"
                priority
              />
          </motion.div>
        </div>
      </motion.header>

      {/* Notification Button - Now separate from header */}
      <div className="fixed top-1 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-[#1A6B4A]/40 rounded-full backdrop-blur-sm"
        >
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
        </motion.button>
            </div>

      {/* Main Content */}
      <main className="pb-20 bg-[#0A4B3A]">
        {/* Hero Section */}
        <section className="relative h-[85vh] md:h-[85vh] overflow-hidden">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A4B3A]/80 via-[#0A4B3A]/20 to-[#0A4B3A]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A4B3A] via-[#0A4B3A]/10 to-transparent" />
          
          {/* Golf Course Illustration */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/illustrations/golf-course-hero.svg"
              alt="Golf Course"
              fill
              className="object-cover object-[65%_75%] sm:object-[center_75%] opacity-80 scale-125 sm:scale-100"
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col">
            {/* Top Content */}
            <div className="p-4 sm:p-6 pt-24 sm:pt-28 space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <motion.h1 
                  className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome Back,<br />John!
                </motion.h1>
                <motion.p 
                  className="text-base sm:text-lg text-white/90 drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Perfect weather for golf today
                </motion.p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 sm:gap-4 bg-[#1A6B4A]/30 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#2A8B5A]/30"
              >
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-white">12.4</span>
                  <span className="text-xs sm:text-sm text-white/80">Handicap</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-white">15</span>
                  <span className="text-xs sm:text-sm text-white/80">Level</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-white">72</span>
                  <span className="text-xs sm:text-sm text-white/80">Best Score</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-4 py-6 space-y-4 bg-gradient-to-b from-[#0A4B3A] to-[#0A4B3A] -mt-20 relative z-10"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-[#1A6B4A]/40 rounded-full text-white/80"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/play/setup')}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A8B5A] to-[#1A6B4A] shadow-lg shadow-[#2A8B5A]/10 p-4 border border-[#2A8B5A]/20"
            >
              <motion.div 
                className="relative z-10 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-2 rounded-xl inline-block bg-white/20">
                  <FlagIcon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Start Round</div>
                  <div className="text-sm text-white/80">Today at {nextTeeTime}</div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute right-0 bottom-0 w-24 h-24"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 0.3, scale: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Image
                  src="/illustrations/tee-off.svg"
                  alt="Start Round"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/friends')}
              className="relative overflow-hidden rounded-xl bg-[#1A6B4A]/20 hover:bg-[#1A6B4A]/30 backdrop-blur-lg p-4"
            >
              <motion.div 
                className="relative z-10 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-2 rounded-xl inline-block bg-white/10">
                  <UserGroupIcon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Club Friends</div>
                  <div className="text-sm text-white/60">Connect & compete</div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute right-0 bottom-0 w-24 h-24"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 0.3, scale: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Image
                  src="/illustrations/players.svg"
                  alt="Club Friends"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Weather & Course Status */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-4 py-6 space-y-4 bg-[#0A4B3A]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Status</h2>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full text-sm border border-emerald-500/20"
            >
              Open
            </motion.span>
        </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/course')}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 to-[#2A8B5A]/20 p-4 backdrop-blur-lg cursor-pointer"
            >
              <motion.div 
                className="relative z-10 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-2 rounded-xl inline-block bg-white/10">
                  <SunIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{weather.temp}°C</div>
                  <div className="text-sm text-white/80">{weather.condition}</div>
                  <div className="text-xs text-white/60">{weather.humidity}% Humidity</div>
                </div>
              </motion.div>
        <motion.div 
                className="absolute right-0 bottom-0 w-24 h-24"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/illustrations/weather-sunny.svg"
                  alt="Weather"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 p-4 backdrop-blur-lg"
            >
              <motion.div 
                className="relative z-10 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-2 rounded-xl inline-block bg-white/10">
                  <ClockIcon className="w-6 h-6" />
                  </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{nextTeeTime}</div>
                  <div className="text-sm text-white/80">Next Tee Time</div>
                  <div className="text-xs text-white/60">2 slots available</div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute right-0 bottom-0 w-24 h-24"
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/illustrations/clock.svg"
                  alt="Clock"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
              </div>
        </motion.section>

        {/* Course Updates */}
        <section className="px-4 py-6 space-y-4 bg-[#0A4B3A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Course Updates</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-white/60">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {courseUpdates.map((update) => (
              <motion.div
                key={update.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/course')}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A6B4A]/40 to-[#1A6B4A]/20 backdrop-blur-lg border border-[#2A8B5A]/20 p-4 cursor-pointer"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`p-2 rounded-xl ${getPriorityColor(update.priority)} backdrop-blur-sm`}>
                    {update.type === 'maintenance' ? (
                      <BoltIcon className="w-6 h-6" />
                    ) : (
                      <ExclamationTriangleIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{update.title}</h4>
                        <p className="text-sm text-white/80">{update.description}</p>
                      </div>
                      <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full">{update.time}</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="absolute right-0 bottom-0 w-24 h-24"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                >
                  <Image
                    src={update.illustration}
                    alt={update.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pro Shop Deals */}
        <section className="px-4 py-6 bg-[#0A4B3A]">
          <ProShopDeals />
        </section>

        {/* Club Feed Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Club Feed</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-emerald-400"
            >
              View All
            </motion.button>
          </div>
          <ClubFeed />
        </motion.section>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
        {showAchievement && (
          <AchievementModal onClose={() => setShowAchievement(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components
const StatusCard: React.FC<StatusCardProps> = ({ icon, value, label, subLabel, bgColor, illustration }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-2xl p-4 ${bgColor}`}
  >
    <div className="relative z-10 space-y-2">
      {icon}
      <div className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-white/80">{label}</div>
        {subLabel && (
          <div className="text-xs text-white/60">{subLabel}</div>
        )}
      </div>
    </div>
    <div className="absolute right-0 bottom-0 w-24 h-24 opacity-50">
      <Image
        src={illustration}
        alt={label}
        fill
        className="object-contain"
          />
        </div>
  </motion.div>
);

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, subtitle, primary, illustration }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-2xl p-4 ${
      primary 
        ? 'bg-gradient-to-br from-[#2A8B5A] to-[#1A6B4A]' 
        : 'bg-white/5'
    }`}
  >
    <div className="relative z-10 space-y-2">
      {icon}
      <div className="text-left">
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-white/60">{subtitle}</div>
      </div>
    </div>
    <div className="absolute right-0 bottom-0 w-24 h-24 opacity-30">
      <Image
        src={illustration}
        alt={label}
        fill
        className="object-contain"
      />
    </div>
  </motion.button>
);

const CourseUpdateCard: React.FC<CourseUpdateCardProps> = ({ update }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className="relative overflow-hidden rounded-2xl bg-white/5 p-4"
  >
    <div className="relative z-10 flex items-start gap-4">
      <div className={`p-2 rounded-xl ${getPriorityColor(update.priority)}`}>
        {update.type === 'maintenance' ? (
          <BoltIcon className="w-6 h-6" />
        ) : (
          <ExclamationTriangleIcon className="w-6 h-6" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold">{update.title}</h4>
            <p className="text-sm text-white/80">{update.description}</p>
          </div>
          <span className="text-xs text-white/40">{update.time}</span>
        </div>
      </div>
    </div>
    <div className="absolute right-0 bottom-0 w-24 h-24 opacity-10">
      <Image
        src={update.illustration}
        alt={update.title}
        fill
        className="object-contain"
      />
    </div>
  </motion.div>
);

const ActivityCard: React.FC<{
  type: 'achievement' | 'round';
  title: string;
  description: string;
  illustration: string;
}> = ({ type, title, description, illustration }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className="relative overflow-hidden rounded-2xl bg-white/5 p-4"
  >
    <div className="relative z-10 flex items-start gap-4">
      <div className={`p-2 rounded-xl ${
        type === 'achievement' 
          ? 'bg-amber-500/20 text-amber-500'
          : 'bg-emerald-500/20 text-emerald-500'
      }`}>
        {type === 'achievement' ? (
          <TrophyIcon className="w-6 h-6" />
        ) : (
          <FlagIcon className="w-6 h-6" />
        )}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-white/60">{description}</p>
      </div>
    </div>
    <div className="absolute right-0 bottom-0 w-24 h-24 opacity-10">
      <Image
        src={illustration}
        alt={title}
        fill
        className="object-contain"
      />
    </div>
  </motion.div>
);

const NotificationsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100%' }}
    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
  >
    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0A4B3A] shadow-xl">
      <div className="p-4 border-b border-[#2A8B5A]/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button onClick={onClose}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Add notification content */}
    </div>
  </motion.div>
);

const AchievementModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <div className="relative w-full max-w-sm bg-[#0A4B3A] rounded-2xl overflow-hidden">
      <div className="absolute top-4 right-4">
        <button onClick={onClose}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      {/* Add achievement content */}
    </div>
  </motion.div>
); 
