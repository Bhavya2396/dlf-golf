'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  FlagIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ArrowPathIcon,
  MapIcon,
  CameraIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Hole {
  number: number;
  par: number;
  distance: number;
  handicap: number;
  image: string;
}

interface Score {
  strokes: number;
  putts: number;
  fairwayHit: boolean | null;
  gir: boolean;
  notes: string;
}

interface FriendScore {
  id: string;
  name: string;
  profileImage: string;
  currentHole: number;
  totalScore: number;
  scores: number[];
  vsParTotal: number;
  thruHole: number;
}

const holes: Hole[] = [
  { number: 1, par: 4, distance: 420, handicap: 7, image: '/illustrations/golf-course-hero.svg' },
  { number: 2, par: 5, distance: 540, handicap: 1, image: '/illustrations/golf-course-hero.svg' },
  { number: 3, par: 3, distance: 180, handicap: 15, image: '/illustrations/golf-course-hero.svg' },
  { number: 4, par: 4, distance: 410, handicap: 5, image: '/illustrations/golf-course-hero.svg' },
  { number: 5, par: 4, distance: 380, handicap: 11, image: '/illustrations/golf-course-hero.svg' },
  { number: 6, par: 5, distance: 520, handicap: 3, image: '/illustrations/golf-course-hero.svg' },
  { number: 7, par: 3, distance: 170, handicap: 17, image: '/illustrations/golf-course-hero.svg' },
  { number: 8, par: 4, distance: 430, handicap: 9, image: '/illustrations/golf-course-hero.svg' },
  { number: 9, par: 4, distance: 400, handicap: 13, image: '/illustrations/golf-course-hero.svg' },
];

const mockScores: Record<number, Score> = {
  1: {
    strokes: 4,
    putts: 2,
    fairwayHit: true,
    gir: true,
    notes: 'Good drive, approach to 15 feet, two-putt par'
  },
  2: {
    strokes: 5,
    putts: 2,
    fairwayHit: false,
    gir: false,
    notes: 'Drive in rough, layup, wedge and two-putt'
  },
  3: {
    strokes: 3,
    putts: 1,
    fairwayHit: null,
    gir: true,
    notes: 'Perfect 7-iron to 10 feet, made the birdie putt!'
  }
};

const dummyFriendScores: FriendScore[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    currentHole: 1,
    totalScore: 0,
    scores: Array(holes.length).fill(0),
    vsParTotal: 0,
    thruHole: 0
  },
  {
    id: '2',
    name: 'Sarah Williams',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    currentHole: 1,
    totalScore: 0,
    scores: Array(holes.length).fill(0),
    vsParTotal: 0,
    thruHole: 0
  },
  {
    id: '3',
    name: 'John Smith',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    currentHole: 1,
    totalScore: 0,
    scores: Array(holes.length).fill(0),
    vsParTotal: 0,
    thruHole: 0
  }
];

export default function ScoringPage() {
  const router = useRouter();
  const [currentHole, setCurrentHole] = useState(1);
  const [scores, setScores] = useState<Record<number, Score>>(mockScores);
  const [showStats, setShowStats] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [friendScores, setFriendScores] = useState<FriendScore[]>(dummyFriendScores);

  const currentScore = scores[currentHole] || {
    strokes: 0,
    putts: 0,
    fairwayHit: null,
    gir: false,
    notes: ''
  };

  // Calculate total scores and stats
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score.strokes, 0);
  const totalPutts = Object.values(scores).reduce((sum, score) => sum + score.putts, 0);
  const fairwaysHit = Object.values(scores).filter(score => score.fairwayHit).length;
  const greensInReg = Object.values(scores).filter(score => score.gir).length;
  
  // Calculate vs par total
  const vsParTotal = Object.entries(scores).reduce((total, [holeNum, score]) => {
    const hole = holes[parseInt(holeNum) - 1];
    return total + (score.strokes - hole.par);
  }, 0);

  // Calculate personal leaderboard position with scores only up to current hole
  const personalScore = {
    id: 'me',
    name: 'You',
    profileImage: '/path/to/your/image.jpg',
    currentHole,
    totalScore: Object.entries(scores)
      .filter(([hole]) => parseInt(hole) <= currentHole)
      .reduce((sum, [_, score]) => sum + score.strokes, 0),
    scores: holes
      .slice(0, currentHole)
      .map((_, index) => scores[index + 1]?.strokes || 0),
    vsParTotal: Object.entries(scores)
      .filter(([hole]) => parseInt(hole) <= currentHole)
      .reduce((total, [hole, score]) => {
        const holeIndex = parseInt(hole) - 1;
        return total + (score.strokes - holes[holeIndex].par);
      }, 0),
    thruHole: currentHole - 1
  };

  // Combine and sort all scores, showing only completed holes
  const allScores = [...friendScores, personalScore]
    .map(player => ({
      ...player,
      scores: player.scores.slice(0, currentHole),
      totalScore: player.scores.slice(0, currentHole).reduce((sum, s) => sum + (s || 0), 0),
      vsParTotal: player.scores.slice(0, currentHole).reduce((total, s, idx) => total + ((s || 0) - holes[idx].par), 0)
    }))
    .sort((a, b) => {
      // Sort by total score through current hole
      const aScore = a.scores.reduce((sum, s) => sum + (s || 0), 0);
      const bScore = b.scores.reduce((sum, s) => sum + (s || 0), 0);
      return aScore - bScore;
    });

  const updateScore = (field: keyof Score, value: any) => {
    setScores(prev => ({
      ...prev,
      [currentHole]: {
        ...prev[currentHole],
        [field]: value
      }
    }));

    // Auto-update GIR based on strokes and par
    if (field === 'strokes') {
      const par = holes[currentHole - 1].par;
      const isGIR = value <= par - 2 || (value === par - 1 && (currentScore.putts || 0) === 2);
      setScores(prev => ({
        ...prev,
        [currentHole]: {
          ...prev[currentHole],
          gir: isGIR
        }
      }));
    }
  };

  const goToNextHole = () => {
    if (currentHole < holes.length) {
      // Auto-save current hole if not already scored
      if (!scores[currentHole]?.strokes) {
        const par = holes[currentHole - 1].par;
        setScores(prev => ({
          ...prev,
          [currentHole]: {
            ...currentScore,
            strokes: par,
            putts: 2,
            gir: false
          }
        }));
      }

      // Generate scores for friends for the current hole
      setFriendScores(prev =>
        prev.map(friend => {
          const par = holes[currentHole - 1].par;
          const newScore = Math.max(par - 1, Math.min(par + 2, Math.floor(Math.random() * 3) + par));
          const newScores = [...friend.scores];
          newScores[currentHole - 1] = newScore;
          
          // Calculate total score and vs par only for completed holes
          const completedScores = newScores.slice(0, currentHole);
          const totalScore = completedScores.reduce((sum, s) => sum + (s || 0), 0);
          const vsParTotal = completedScores.reduce((total, s, idx) => total + ((s || 0) - holes[idx].par), 0);

          return {
            ...friend,
            currentHole: currentHole + 1,
            scores: newScores,
            totalScore,
            vsParTotal,
            thruHole: currentHole
          };
        })
      );

      setCurrentHole(currentHole + 1);
      setShowNotes(false);
    }
  };

  const goToPrevHole = () => {
    if (currentHole > 1) {
      // Move all players to the previous hole
      setFriendScores(prev =>
        prev.map(friend => ({
          ...friend,
          currentHole: currentHole - 1,
          // Recalculate totals for previous hole
          totalScore: friend.scores.slice(0, currentHole - 1).reduce((sum, s) => sum + (s || 0), 0),
          vsParTotal: friend.scores.slice(0, currentHole - 1).reduce((total, s, idx) => total + ((s || 0) - holes[idx].par), 0),
          thruHole: currentHole - 1
        }))
      );

      setCurrentHole(currentHole - 1);
      setShowNotes(false);
    }
  };

  const getScoreColor = (strokes: number, par: number) => {
    const diff = strokes - par;
    if (diff <= -2) return 'text-purple-400';
    if (diff === -1) return 'text-emerald-400';
    if (diff === 0) return 'text-white';
    if (diff === 1) return 'text-yellow-400';
    return 'text-red-400';
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
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-lg font-semibold"
          >
            Score Round
          </motion.h1>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFriends(!showFriends)}
              className={`p-2 hover:bg-white/10 rounded-full transition-colors ${showFriends ? 'text-emerald-400' : ''}`}
            >
              <UserGroupIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className={`p-2 hover:bg-white/10 rounded-full transition-colors ${showStats ? 'text-emerald-400' : ''}`}
            >
              <ChartBarIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[4.5rem] pb-safe">
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                    Hole {currentHole}
                  </h2>
                  <p className="text-base text-white/90 drop-shadow-lg">
                    Par {holes[currentHole - 1].par} • {holes[currentHole - 1].distance}y
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPrevHole}
                    disabled={currentHole === 1}
                    className="p-2 hover:bg-white/10 rounded-full disabled:opacity-50"
                  >
                    <ArrowPathIcon className="w-5 h-5 rotate-180" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNextHole}
                    disabled={currentHole === holes.length}
                    className="p-2 hover:bg-white/10 rounded-full disabled:opacity-50"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="px-4 pt-2 pb-4">
          {/* Friends Leaderboard */}
          <AnimatePresence>
            {showFriends && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <div className="rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 p-4">
                  <div className="space-y-3">
                    {allScores.map((player, index) => (
                      <div key={player.id} className="flex items-center gap-4">
                        <div className="w-6 text-center font-medium text-white/60">
                          {index + 1}
                        </div>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={player.profileImage}
                            alt={player.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{player.name}</span>
                            <span className="text-sm text-white/60">• Hole {player.currentHole}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            {player.scores.map((score, i) => (
                              <span
                                key={i}
                                className={`w-5 h-5 flex items-center justify-center rounded ${
                                  getScoreColor(score, holes[i].par)
                                }`}
                              >
                                {score}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{player.totalScore}</div>
                          <div className={`text-sm ${player.vsParTotal <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {player.vsParTotal <= 0 ? 'E' : '+' + player.vsParTotal}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Overview */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                  >
                    <div className="text-white/60 text-sm mb-1">Total Score</div>
                    <div className="text-2xl font-bold">{totalScore || '-'}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                  >
                    <div className="text-white/60 text-sm mb-1">Total Putts</div>
                    <div className="text-2xl font-bold">{totalPutts || '-'}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                  >
                    <div className="text-white/60 text-sm mb-1">Fairways Hit</div>
                    <div className="text-2xl font-bold">
                      {fairwaysHit}/{Object.keys(scores).length}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                  >
                    <div className="text-white/60 text-sm mb-1">GIR</div>
                    <div className="text-2xl font-bold">
                      {greensInReg}/{Object.keys(scores).length}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Score Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60">Strokes</label>
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateScore('strokes', Math.max(0, currentScore.strokes - 1))}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                      -
                    </motion.button>
                    <div className={`flex-1 text-center text-2xl font-bold ${
                      currentScore.strokes ? getScoreColor(currentScore.strokes, holes[currentHole - 1].par) : ''
                    }`}>
                      {currentScore.strokes || '-'}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateScore('strokes', (currentScore.strokes || 0) + 1)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/60">Putts</label>
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateScore('putts', Math.max(0, currentScore.putts - 1))}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                      -
                    </motion.button>
                    <div className="flex-1 text-center text-2xl font-bold">
                      {currentScore.putts || '-'}
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateScore('putts', (currentScore.putts || 0) + 1)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/60">Fairway Hit</label>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateScore('fairwayHit', true)}
                    className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 ${
                      currentScore.fairwayHit === true 
                        ? 'bg-emerald-500' 
                        : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10'
                    }`}
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Yes</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateScore('fairwayHit', false)}
                    className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 ${
                      currentScore.fairwayHit === false 
                        ? 'bg-red-500/20 text-red-400 border-red-500/20' 
                        : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10'
                    }`}
                  >
                    <XCircleIcon className="w-5 h-5" />
                    <span>No</span>
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/60">Green in Regulation</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateScore('gir', !currentScore.gir)}
                  className={`w-full p-3 rounded-xl flex items-center justify-center gap-2 ${
                    currentScore.gir 
                      ? 'bg-emerald-500' 
                      : 'bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10'
                  }`}
                >
                  <FlagIcon className="w-5 h-5" />
                  <span>{currentScore.gir ? 'Yes' : 'No'}</span>
                </motion.button>
              </div>
            </div>

            {/* Notes */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotes(true)}
              className="w-full p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 flex items-center justify-center gap-2"
            >
              <PencilIcon className="w-5 h-5" />
              <span>Add Notes</span>
            </motion.button>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToPrevHole}
                disabled={currentHole === 1}
                className="p-4 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 disabled:opacity-50"
              >
                Previous Hole
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToNextHole}
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 font-semibold shadow-lg"
              >
                {currentHole === holes.length ? 'Finish Round' : 'Next Hole'}
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Notes Modal */}
      <AnimatePresence>
        {showNotes && (
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
                <h3 className="text-lg font-semibold">Hole Notes</h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotes(false)}
                  className="p-1 hover:bg-white/5 rounded-full"
                >
                  <XCircleIcon className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="p-4">
                <textarea
                  value={currentScore.notes}
                  onChange={(e) => updateScore('notes', e.target.value)}
                  placeholder="Add notes about this hole..."
                  className="w-full h-32 bg-white/5 rounded-xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 