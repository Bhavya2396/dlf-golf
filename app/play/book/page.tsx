'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  SunIcon,
  MapPinIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  XMarkIcon,
  ShoppingCartIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const courses = [
  {
    id: 'dlf-championship',
    name: 'DLF Championship Course',
    holes: 18,
    par: 72,
    length: '7347 yards',
    difficulty: 'Professional',
    image: '/illustrations/golf-course-hero.svg',
    description: 'Gary Player designed championship course with challenging bunkers and water hazards.'
  },
  {
    id: 'dlf-valley',
    name: 'DLF Valley Course',
    holes: 9,
    par: 36,
    length: '3450 yards',
    difficulty: 'Intermediate',
    image: '/illustrations/golf-course-hero.svg',
    description: 'Scenic valley course perfect for a quick round or improving your game.'
  }
];

const timeSlots = [
  { time: '06:00', available: true, price: '₹2,500', weather: 'Clear', temp: 22, slotsLeft: 3 },
  { time: '06:30', available: true, price: '₹2,500', weather: 'Clear', temp: 23, slotsLeft: 2 },
  { time: '07:00', available: false, price: '₹3,000', weather: 'Sunny', temp: 24, slotsLeft: 0 },
  { time: '07:30', available: true, price: '₹3,000', weather: 'Sunny', temp: 25, slotsLeft: 4 },
  { time: '08:00', available: true, price: '₹3,500', weather: 'Sunny', temp: 26, slotsLeft: 1 },
];

const addOns = [
  { id: 'cart', name: 'Golf Cart', price: '₹1,000', icon: ShoppingCartIcon },
  { id: 'caddie', name: 'Caddie Service', price: '₹800', icon: UserGroupIcon },
  { id: 'club-rental', name: 'Club Rental', price: '₹1,500', icon: MapPinIcon },
];

export default function BookingPage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [players, setPlayers] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const totalPrice = () => {
    const basePrice = selectedTime ? parseInt(timeSlots.find(slot => slot.time === selectedTime)?.price.replace('₹', '') || '0') : 0;
    const addOnsPrice = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find(a => a.id === id);
      return sum + parseInt(addon?.price.replace('₹', '') || '0');
    }, 0);
    return (basePrice + addOnsPrice) * players;
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => step > 1 ? setStep(step - 1) : router.back()}
          className="p-2 hover:bg-white/5 rounded-full"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>
        <div>
          <h1 className="text-2xl font-bold">Book Tee Time</h1>
          <p className="text-white/60">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Course Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Course</h2>
              <div className="grid gap-4">
                {courses.map((course) => (
                  <motion.button
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCourse(course)}
                    className={`relative overflow-hidden rounded-2xl border ${
                      selectedCourse.id === course.id
                        ? 'border-emerald-500'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="relative h-40">
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="relative p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-white/60">{course.difficulty}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{course.holes} Holes</div>
                          <div className="text-sm text-white/60">Par {course.par}</div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-white/80">{course.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-emerald-500 font-semibold"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Date & Players Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Date & Players</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCalendar(true)}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
                >
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <CalendarIcon className="w-5 h-5" />
                    <span>Date</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </motion.button>

                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <UserGroupIcon className="w-5 h-5" />
                    <span>Players</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => players > 1 && setPlayers(players - 1)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                      -
                    </motion.button>
                    <span className="text-lg font-semibold">{players}</span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => players < 4 && setPlayers(players + 1)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Available Times</h2>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.time}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between ${
                      selectedTime === slot.time
                        ? 'bg-emerald-500'
                        : slot.available
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-left">
                        <div className="font-semibold">{slot.time}</div>
                        <div className="text-sm text-white/60">{slot.price}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <SunIcon className="w-4 h-4" />
                          <span>{slot.temp}°C</span>
                        </div>
                        {slot.available && (
                          <div className="text-emerald-400">
                            {slot.slotsLeft} slots left
                          </div>
                        )}
                      </div>
                    </div>
                    {!slot.available && (
                      <span className="text-sm text-white/60">Booked</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(3)}
              disabled={!selectedTime}
              className="w-full py-4 rounded-2xl bg-emerald-500 font-semibold disabled:opacity-50"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Add-ons */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Additional Services</h2>
              <div className="space-y-2">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  const isSelected = selectedAddOns.includes(addon.id);
                  return (
                    <motion.button
                      key={addon.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedAddOns(prev =>
                          isSelected
                            ? prev.filter(id => id !== addon.id)
                            : [...prev, addon.id]
                        );
                      }}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between ${
                        isSelected ? 'bg-emerald-500' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{addon.name}</span>
                      </div>
                      <span>{addon.price}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="rounded-2xl bg-white/5 p-4 space-y-4">
              <h2 className="font-semibold">Booking Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Course</span>
                  <span>{selectedCourse.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Date & Time</span>
                  <span>{selectedDate.toLocaleDateString()} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Players</span>
                  <span>{players}</span>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{totalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Policy */}
            <div className="rounded-2xl bg-white/5 p-4 flex items-start gap-3">
              <InformationCircleIcon className="w-5 h-5 text-white/60 flex-shrink-0" />
              <div className="text-sm text-white/60">
                Cancellations must be made at least 24 hours before the tee time. 
                A full refund will be provided for cancellations made within this period.
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-emerald-500 font-semibold"
            >
              Confirm Booking
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm bg-[#0A0F1C] rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Select Date</h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCalendar(false)}
                  className="p-1 hover:bg-white/5 rounded-full"
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-sm text-white/60">
                      {day}
                    </div>
                  ))}
                  {generateCalendarDays().map((date, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      className={`p-2 rounded-lg text-center ${
                        date.toDateString() === selectedDate.toDateString()
                          ? 'bg-emerald-500'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {date.getDate()}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 