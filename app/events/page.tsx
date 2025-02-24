'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  CalendarIcon, 
  FunnelIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon,
  ArrowLeftIcon,
  SunIcon
} from '@heroicons/react/24/outline';

const eventTypes = ['All', 'Tournament', 'Social', 'Training'] as const;

const dummyEvents = [
  {
    id: '1',
    title: 'Club Championship',
    date: 'Mar 15, 2024',
    time: '8:00 AM',
    location: 'DLF Golf Course',
    participants: 24,
    maxParticipants: 32,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
    type: 'tournament',
    weather: { temp: 24, condition: 'Sunny' },
    description: 'Annual club championship tournament. Join us for an exciting day of competitive golf.',
    prizePool: '₹50,000'
  },
  {
    id: '2',
    title: 'Weekend Social',
    date: 'Mar 16, 2024',
    time: '9:00 AM',
    location: 'DLF Golf Course',
    participants: 12,
    maxParticipants: 16,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
    type: 'social',
    weather: { temp: 26, condition: 'Clear' },
    description: 'Casual weekend gathering for members. Network and enjoy a relaxed round of golf.',
    format: 'Best Ball'
  },
  {
    id: '3',
    title: 'Pro Training Session',
    date: 'Mar 17, 2024',
    time: '10:00 AM',
    location: 'DLF Practice Area',
    participants: 5,
    maxParticipants: 8,
    image: 'https://images.unsplash.com/photo-1535132011086-b8818f016104',
    type: 'training',
    weather: { temp: 25, condition: 'Sunny' },
    description: 'Advanced training session with our club pro. Focus on swing mechanics and course strategy.',
    instructor: 'David Wilson'
  },
] as const;

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<typeof eventTypes[number]>('All');

  const filteredEvents = dummyEvents.filter(
    event => selectedType === 'All' || event.type === selectedType.toLowerCase()
  );

  const getEventGradient = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'from-amber-500/20 to-orange-500/20 border-amber-500/20';
      case 'social':
        return 'from-emerald-500/20 to-[#2A8B5A]/20 border-emerald-500/20';
      case 'training':
        return 'from-blue-500/20 to-indigo-500/20 border-blue-500/20';
      default:
        return 'from-[#2A8B5A]/20 to-[#1A6B4A]/20 border-[#2A8B5A]/20';
    }
  };

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
            onClick={() => window.history.back()}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-lg font-semibold"
          >
            Golf Events
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
                Upcoming Events
              </h2>
              <p className="text-base text-white/90 drop-shadow-lg">
                Join tournaments and activities
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="px-4 pt-2 pb-4">
          {/* Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-3 -mx-4 px-4 overflow-x-auto scrollbar-hide"
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-lg rounded-xl p-1.5 border border-white/10 shadow-lg inline-flex min-w-full"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5 w-full">
                {eventTypes.map((type, index) => (
                  <motion.button
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type)}
                    className={`flex-1 px-3 py-2 rounded-lg text-center text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedType === type
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Events List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -1, scale: 1.01 }}
                className={`rounded-xl overflow-hidden bg-gradient-to-br ${getEventGradient(event.type)} backdrop-blur-lg border shadow-lg transition-all duration-300`}
              >
                <div className="relative h-36">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs border border-white/20"
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </motion.div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-1.5">{event.title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{event.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-xs">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-xs">{event.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="text-xs">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <SunIcon className="w-4 h-4" />
                        <span className="text-xs">{event.weather.temp}°C • {event.weather.condition}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/70">
                      <UserGroupIcon className="w-4 h-4" />
                      <span className="text-xs">
                        {event.participants}/{event.maxParticipants} participants
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium shadow-lg hover:bg-emerald-600 transition-colors"
                    >
                      Register
                    </motion.button>
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