import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  image: string;
  type: 'tournament' | 'social' | 'training';
}

interface EventCardProps {
  event: EventDetails;
  onRegister?: () => void;
}

const getEventTypeColor = (type: EventDetails['type']) => {
  switch (type) {
    case 'tournament':
      return 'from-amber-500/20 to-orange-500/20';
    case 'social':
      return 'from-emerald-500/20 to-blue-500/20';
    case 'training':
      return 'from-purple-500/20 to-pink-500/20';
    default:
      return 'from-white/10 to-white/5';
  }
};

export default function EventCard({ event, onRegister }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10"
    >
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event.type)} mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 text-white/60">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <UserGroupIcon className="w-4 h-4" />
              <span className="text-sm">
                {event.participants}/{event.maxParticipants} participants
              </span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRegister}
          className="w-full py-2 px-4 rounded-xl bg-emerald-500 text-white font-medium
                     hover:bg-emerald-600 transition-colors duration-200"
        >
          Register Now
        </motion.button>
      </div>
    </motion.div>
  );
} 