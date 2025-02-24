'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  FlagIcon,
  UserGroupIcon,
  MapPinIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  SunIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Course {
  id: string;
  name: string;
  image: string;
  weather?: {
    temp: number;
    condition: string;
  };
  nextTeeTime?: string;
  tees: {
    color: string;
    rating: number;
    slope: number;
    yards: number;
  }[];
}

const courses: Course[] = [
  {
    id: 'championship',
    name: 'DLF Championship Course',
    image: '/illustrations/golf-course-hero.svg',
    weather: {
      temp: 28,
      condition: 'Sunny'
    },
    nextTeeTime: '10:30 AM',
    tees: [
      { color: 'Black', rating: 74.8, slope: 142, yards: 7323 },
      { color: 'Blue', rating: 72.6, slope: 138, yards: 6841 },
      { color: 'White', rating: 70.8, slope: 134, yards: 6421 },
      { color: 'Red', rating: 68.9, slope: 128, yards: 5932 }
    ]
  },
  {
    id: 'links',
    name: 'DLF Links Course',
    image: '/illustrations/golf-course-hero.svg',
    weather: {
      temp: 27,
      condition: 'Clear'
    },
    nextTeeTime: '11:00 AM',
    tees: [
      { color: 'Black', rating: 73.2, slope: 138, yards: 7012 },
      { color: 'Blue', rating: 71.4, slope: 134, yards: 6632 },
      { color: 'White', rating: 69.6, slope: 130, yards: 6213 },
      { color: 'Red', rating: 67.8, slope: 124, yards: 5742 }
    ]
  }
];

const gameFormats = [
  { 
    id: 'stroke', 
    name: 'Stroke Play', 
    description: 'Traditional scoring format',
    icon: FlagIcon
  },
  { 
    id: 'stableford', 
    name: 'Stableford', 
    description: 'Points based on score relative to par',
    icon: ChartBarIcon
  },
  { 
    id: 'match', 
    name: 'Match Play', 
    description: 'Hole-by-hole competition',
    icon: UserGroupIcon
  }
];

export default function SetupPage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [selectedTeeColor, setSelectedTeeColor] = useState<string>('White');
  const [playerCount, setPlayerCount] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(gameFormats[0].id);

  const handleStartRound = () => {
    // Here you would typically save the game settings to state/context/storage
    router.push('/play/score');
  };

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]">
      {/* Floating Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A4B3A]/80 backdrop-blur-lg border-b border-white/10 safe-top"
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
            Game Setup
          </motion.h1>
          <div className="w-9" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[4.5rem] pb-safe px-4 space-y-6">
        {/* Course Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Select Course</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <motion.button
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCourse(course)}
                className={`w-full rounded-xl overflow-hidden ${
                  selectedCourse.id === course.id
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20'
                }`}
              >
                <div className="relative h-32">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="font-semibold text-lg">{course.name}</div>
                    <div className="text-sm text-white/80">{course.tees.length} tee options</div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <SunIcon className="w-4 h-4" />
                      <span className="text-sm">{course.weather?.temp}°C • {course.weather?.condition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-sm">Next: {course.nextTeeTime}</span>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-white/40" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Tee Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Select Tee</h2>
          <div className="grid grid-cols-2 gap-3">
            {selectedCourse.tees.map((tee) => (
              <motion.button
                key={tee.color}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTeeColor(tee.color)}
                className={`p-4 rounded-xl ${
                  selectedTeeColor === tee.color
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20'
                }`}
              >
                <div className="font-medium text-lg">{tee.color}</div>
                <div className="text-sm text-white/80">
                  {tee.yards.toLocaleString()} yards
                </div>
                <div className="text-xs text-white/60 mt-1">
                  Rating: {tee.rating} • Slope: {tee.slope}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Player Count */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Number of Players</h2>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-lg">{playerCount} Player{playerCount > 1 ? 's' : ''}</div>
                <div className="text-sm text-white/60">Including yourself</div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                  className="p-2 rounded-full hover:bg-white/10"
                  disabled={playerCount <= 1}
                >
                  <MinusIcon className={`w-5 h-5 ${playerCount <= 1 ? 'text-white/40' : ''}`} />
                </motion.button>
                <span className="w-8 text-center text-lg font-medium">{playerCount}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlayerCount(Math.min(4, playerCount + 1))}
                  className="p-2 rounded-full hover:bg-white/10"
                  disabled={playerCount >= 4}
                >
                  <PlusIcon className={`w-5 h-5 ${playerCount >= 4 ? 'text-white/40' : ''}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Game Format */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold">Game Format</h2>
          <div className="space-y-3">
            {gameFormats.map((format) => {
              const Icon = format.icon;
              return (
                <motion.button
                  key={format.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 ${
                    selectedFormat === format.id
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20'
                      : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20'
                  }`}
                >
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{format.name}</div>
                    <div className="text-sm text-white/60">{format.description}</div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-white/40" />
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Start Round Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="sticky bottom-0 pt-4 pb-8 -mx-4 px-4 bg-gradient-to-t from-[#0A4B3A] to-transparent"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartRound}
            className="w-full p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            <span>Start Round</span>
            <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
} 