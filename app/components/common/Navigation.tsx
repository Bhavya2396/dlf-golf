'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  CalendarIcon,
  TrophyIcon,
  UserIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const routes = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/events', label: 'Events', icon: CalendarIcon },
  { path: '/play', label: 'Play', icon: PlusCircleIcon },
  { path: '/stats', label: 'Stats', icon: TrophyIcon },
  { path: '/profile', label: 'Profile', icon: UserIcon },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2"
      >
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.path;
          const isPlay = route.path === '/play';

          return (
            <Link key={route.path} href={route.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-xl flex flex-col items-center gap-1
                  ${isPlay ? 'bg-emerald-500 text-white -mt-6' : 
                    isActive ? 'bg-white/10 text-emerald-400' : 'text-white/60 hover:text-white/80'}`}
              >
                <Icon className={`w-6 h-6 ${isPlay ? 'w-7 h-7' : ''}`} />
                <span className="text-xs font-medium">{route.label}</span>
                {isActive && !isPlay && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-emerald-400"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
} 