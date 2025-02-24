import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  weather: 'sunny' | 'cloudy' | 'rainy';
  temperature: number;
  bookedCount: number;
  maxPlayers: number;
}

interface TeeTimeBookingProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  timeSlots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function TeeTimeBooking({
  selectedDate,
  onDateChange,
  timeSlots,
  onSlotSelect
}: TeeTimeBookingProps) {
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  const filteredSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    switch (selectedTimeOfDay) {
      case 'morning':
        return hour >= 6 && hour < 12;
      case 'afternoon':
        return hour >= 12 && hour < 16;
      case 'evening':
        return hour >= 16 && hour < 20;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Calendar Section */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Date</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-full">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm text-white/60">
              {day}
            </div>
          ))}
          {weekDates.map(date => (
            <motion.button
              key={date.toISOString()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDateChange(date)}
              className={`p-2 rounded-xl text-center ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-emerald-500 text-white'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-sm">{date.getDate()}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time of Day Filter */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTimeOfDay('morning')}
          className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 ${
            selectedTimeOfDay === 'morning'
              ? 'bg-amber-500/20 text-amber-500'
              : 'bg-white/5 text-white/60'
          }`}
        >
          <SunIcon className="w-5 h-5" />
          <span>Morning</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTimeOfDay('afternoon')}
          className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 ${
            selectedTimeOfDay === 'afternoon'
              ? 'bg-orange-500/20 text-orange-500'
              : 'bg-white/5 text-white/60'
          }`}
        >
          <SunIcon className="w-5 h-5" />
          <span>Afternoon</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTimeOfDay('evening')}
          className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 ${
            selectedTimeOfDay === 'evening'
              ? 'bg-blue-500/20 text-blue-500'
              : 'bg-white/5 text-white/60'
          }`}
        >
          <MoonIcon className="w-5 h-5" />
          <span>Evening</span>
        </motion.button>
      </div>

      {/* Time Slots */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Available Times</h3>
        <div className="grid grid-cols-2 gap-2">
          {filteredSlots.map(slot => (
            <motion.button
              key={slot.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSlotSelect(slot)}
              disabled={!slot.available}
              className={`p-4 rounded-xl ${
                slot.available
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-white/5 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-white/60" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                <div className="flex items-center gap-1 text-white/60">
                  <UserGroupIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {slot.bookedCount}/{slot.maxPlayers}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <SunIcon className="w-4 h-4" />
                <span>{slot.temperature}°C</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 