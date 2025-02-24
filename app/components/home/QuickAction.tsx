'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="glass-button flex flex-col items-center justify-center w-20 h-20 p-4 gap-2 relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <motion.div 
        className="text-white w-8 h-8 relative z-10"
        whileHover={{ rotate: 5 }}
      >
        {icon}
      </motion.div>
      <span className="text-white/90 text-xs font-sf-pro-text relative z-10">
        {label}
      </span>
      <motion.div
        className="absolute inset-0 bg-white/5"
        initial={false}
        whileHover={{ 
          opacity: 1,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
        }}
      />
    </motion.button>
  );
}; 