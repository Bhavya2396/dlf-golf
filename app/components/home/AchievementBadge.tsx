'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  progress: number;
  reward: string;
  isActive?: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  title,
  description,
  progress,
  reward,
  isActive = false
}) => {
  return (
    <motion.div
      className={`isometric-card p-4 ${isActive ? 'border-[var(--md-primary-container)]' : ''}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl overflow-hidden">
            <img 
              src={icon} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <svg className="absolute -right-2 -bottom-2 w-6 h-6 text-[var(--md-primary)]" viewBox="0 0 36 36">
            <path 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/60 mt-1">{description}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="text-xs px-2 py-1 rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]">
              {reward}
            </div>
            <span className="text-xs text-white/40">{progress}% Complete</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 