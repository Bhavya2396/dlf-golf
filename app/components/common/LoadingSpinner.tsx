'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-accent-mint rounded-full border-t-transparent"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}; 