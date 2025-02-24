import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MinusIcon,
  FlagIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface HoleData {
  number: number;
  par: number;
  distance: number;
  score?: number;
  putts?: number;
  fairwayHit?: boolean;
  greenInRegulation?: boolean;
}

interface ScorecardEntryProps {
  hole: HoleData;
  onScoreChange: (score: number) => void;
  onPuttsChange: (putts: number) => void;
  onFairwayHitChange: (hit: boolean) => void;
  onGIRChange: (gir: boolean) => void;
}

export default function ScorecardEntry({
  hole,
  onScoreChange,
  onPuttsChange,
  onFairwayHitChange,
  onGIRChange
}: ScorecardEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number, par: number) => {
    const diff = score - par;
    if (diff < 0) return 'text-emerald-400';
    if (diff === 0) return 'text-white';
    if (diff === 1) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden"
    >
      {/* Main Row */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            {hole.number}
          </div>
          <div>
            <div className="text-sm text-white/60">Par {hole.par}</div>
            <div className="text-xs text-white/40">{hole.distance}y</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {hole.score && (
            <div className={`text-xl font-bold ${getScoreColor(hole.score, hole.par)}`}>
              {hole.score}
            </div>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-5 h-5 text-white/40"
          >
            ▼
          </motion.div>
        </div>
      </div>

      {/* Expanded Details */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 space-y-4">
          {/* Score Input */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Score</span>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => hole.score && onScoreChange(hole.score - 1)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <MinusIcon className="w-5 h-5" />
              </motion.button>
              <span className="w-8 text-center">{hole.score || '-'}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onScoreChange((hole.score || hole.par) + 1)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <PlusIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Putts Input */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Putts</span>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => hole.putts && onPuttsChange(hole.putts - 1)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <MinusIcon className="w-5 h-5" />
              </motion.button>
              <span className="w-8 text-center">{hole.putts || '-'}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onPuttsChange((hole.putts || 1) + 1)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <PlusIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Stats Toggles */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onFairwayHitChange(!hole.fairwayHit)}
              className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 ${
                hole.fairwayHit
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              <FlagIcon className="w-4 h-4" />
              <span className="text-sm">Fairway</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onGIRChange(!hole.greenInRegulation)}
              className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 ${
                hole.greenInRegulation
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              <CheckCircleIcon className="w-4 h-4" />
              <span className="text-sm">GIR</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 