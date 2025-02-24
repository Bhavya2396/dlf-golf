'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  SunIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface CourseUpdate {
  id: string;
  type: 'maintenance' | 'weather' | 'closure';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  area: string;
  duration?: string;
  affectedHoles?: number[];
}

const courseUpdates: CourseUpdate[] = [
  {
    id: '1',
    type: 'maintenance',
    title: 'Bunker Renovation',
    description: 'Ongoing bunker maintenance on holes 4, 5, and 6. Please follow local rules for relief.',
    priority: 'medium',
    time: '7:00 AM - 11:00 AM',
    area: 'Front Nine',
    affectedHoles: [4, 5, 6],
    duration: '4 hours'
  },
  {
    id: '2',
    type: 'weather',
    title: 'Morning Frost Delay',
    description: 'Expected frost delay tomorrow morning. First tee time moved to 8:00 AM.',
    priority: 'high',
    time: 'Tomorrow',
    area: 'All Course',
    duration: '1 hour'
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Green Aeration',
    description: 'Regular green aeration scheduled. Temporary greens will be in use.',
    priority: 'medium',
    time: 'Next Week',
    area: 'All Greens',
    duration: '3 days'
  }
];

const courseConditions = {
  weather: {
    temperature: 24,
    condition: 'Sunny',
    windSpeed: 12,
    humidity: 65,
    forecast: [
      { time: '9 AM', temp: 22, condition: 'Sunny' },
      { time: '12 PM', temp: 26, condition: 'Sunny' },
      { time: '3 PM', temp: 25, condition: 'Partly Cloudy' },
      { time: '6 PM', temp: 23, condition: 'Clear' }
    ]
  },
  course: {
    greenSpeed: 10.5,
    fairwayCondition: 'Excellent',
    roughHeight: '2.5 inches',
    bunkerStatus: 'Maintained',
    lastMowed: '6:00 AM Today'
  },
  traffic: {
    currentPlayers: 42,
    nextAvailable: '10:30 AM',
    peakHours: '9:00 AM - 11:00 AM',
    averageRoundTime: '4h 15m'
  }
};

const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high':
      return 'from-red-500/20 to-orange-500/20 border-red-500/20';
    case 'medium':
      return 'from-amber-500/20 to-yellow-500/20 border-amber-500/20';
    case 'low':
      return 'from-emerald-500/20 to-green-500/20 border-emerald-500/20';
    default:
      return 'from-[#2A8B5A]/20 to-[#1A6B4A]/20 border-[#2A8B5A]/20';
  }
};

const getUpdateIcon = (type: CourseUpdate['type']) => {
  switch (type) {
    case 'maintenance':
      return <WrenchScrewdriverIcon className="w-5 h-5" />;
    case 'weather':
      return <CloudIcon className="w-5 h-5" />;
    case 'closure':
      return <ExclamationTriangleIcon className="w-5 h-5" />;
  }
};

export default function CourseStatusPage() {
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
            Course Status
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
                Course Status
              </h2>
              <p className="text-sm text-white/90 drop-shadow-lg">
                Current conditions and updates
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Sections */}
        <section className="px-3 py-3 space-y-6">
          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Weather</h3>
              <div className="flex items-center gap-2">
                <SunIcon className="w-6 h-6 text-amber-400" />
                <span className="text-2xl font-bold">{courseConditions.weather.temperature}°C</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-sm font-medium">{courseConditions.weather.windSpeed} km/h</div>
                <div className="text-xs text-white/60">Wind Speed</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-sm font-medium">{courseConditions.weather.humidity}%</div>
                <div className="text-xs text-white/60">Humidity</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-sm font-medium">{courseConditions.weather.condition}</div>
                <div className="text-xs text-white/60">Condition</div>
              </div>
            </div>

            <div className="flex justify-between">
              {courseConditions.weather.forecast.map((forecast, index) => (
                <div key={forecast.time} className="text-center">
                  <div className="text-xs text-white/60">{forecast.time}</div>
                  <div className="text-sm font-medium mt-1">{forecast.temp}°</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Course Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4">Course Conditions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Green Speed</span>
                <span className="font-medium">{courseConditions.course.greenSpeed} Stimp</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Fairway Condition</span>
                <span className="font-medium">{courseConditions.course.fairwayCondition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Rough Height</span>
                <span className="font-medium">{courseConditions.course.roughHeight}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Last Mowed</span>
                <span className="font-medium">{courseConditions.course.lastMowed}</span>
              </div>
            </div>
          </motion.div>

          {/* Traffic & Pace */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4">Traffic & Pace</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <UserGroupIcon className="w-4 h-4" />
                  <span className="text-sm">Current Players</span>
                </div>
                <div className="text-xl font-semibold">{courseConditions.traffic.currentPlayers}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-white/60 mb-1">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-sm">Next Available</span>
                </div>
                <div className="text-xl font-semibold">{courseConditions.traffic.nextAvailable}</div>
              </div>
            </div>
          </motion.div>

          {/* Course Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold">Course Updates</h3>
            {courseUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${getPriorityColor(update.priority)} backdrop-blur-lg border`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {getUpdateIcon(update.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{update.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        update.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        update.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mb-2">{update.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>{update.time}</span>
                      </div>
                      {update.duration && (
                        <div className="flex items-center gap-1">
                          <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                          <span>{update.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
} 