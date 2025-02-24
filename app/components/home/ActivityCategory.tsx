'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ActivityCategoryProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ActivityCategory: React.FC<ActivityCategoryProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`nav-pill relative ${
        isActive ? 'nav-pill-active' : 'nav-pill-inactive'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      layout
    >
      {isActive && (
        <motion.div
          layoutId="activeBackground"
          className="absolute inset-0 bg-white rounded-full"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      )}
      <span className={`relative z-10 ${isActive ? 'text-primary-navy' : 'text-white'}`}>
        {label}
      </span>
    </motion.button>
  );
}; 