'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  TrophyIcon,
  ChatBubbleLeftIcon,
  FlagIcon,
  UserGroupIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Friend {
  id: string;
  name: string;
  profileImage: string;
  handicap: number;
  recentScore: {
    score: number;
    par: number;
    course: string;
  };
  stats: {
    roundsPlayed: number;
    avgScore: number;
    bestScore: number;
  };
  rankChange: number;
  lastPlayed: string;
}

interface ChatGroup {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface Challenge {
  id: string;
  title: string;
  type: 'active' | 'upcoming' | 'completed';
  description: string;
  participants: number;
  progress?: number;
  reward: {
    type: 'trophy' | 'badge' | 'prize' | 'achievement';
    title: string;
    value?: string;
    icon: string;
  };
  deadline: string;
  leaderboard?: {
    position: number;
    total: number;
  };
  requirements?: string[];
  milestones?: {
    target: number;
    current: number;
    label: string;
  }[];
}

const friends: Friend[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    handicap: 8.4,
    recentScore: {
      score: 72,
      par: 72,
      course: 'DLF Championship'
    },
    stats: {
      roundsPlayed: 24,
      avgScore: 76,
      bestScore: 70
    },
    rankChange: 2,
    lastPlayed: '2 days ago'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    handicap: 10.2,
    recentScore: {
      score: 75,
      par: 72,
      course: 'DLF Valley'
    },
    stats: {
      roundsPlayed: 18,
      avgScore: 78,
      bestScore: 73
    },
    rankChange: -1,
    lastPlayed: '3 days ago'
  },
  {
    id: '3',
    name: 'John Smith',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    handicap: 6.7,
    recentScore: {
      score: 71,
      par: 72,
      course: 'DLF Championship'
    },
    stats: {
      roundsPlayed: 32,
      avgScore: 74,
      bestScore: 68
    },
    rankChange: 1,
    lastPlayed: '1 day ago'
  }
];

const chatGroups: ChatGroup[] = [
  {
    id: '1',
    name: 'Weekend Warriors',
    members: 8,
    lastMessage: 'Anyone up for a round this Saturday?',
    timestamp: '10 min ago',
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Tournament Group',
    members: 12,
    lastMessage: 'Check out the new schedule!',
    timestamp: '1 hour ago',
    unreadCount: 1
  },
  {
    id: '3',
    name: 'Golf Tips',
    members: 15,
    lastMessage: 'Here\'s a great drill for putting...',
    timestamp: '2 hours ago',
    unreadCount: 0
  }
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Break 80 Challenge',
    description: 'Join the elite club! Break 80 in a single round this month.',
    type: 'active',
    participants: 24,
    progress: 75,
    reward: {
      type: 'trophy',
      title: 'Gold Trophy',
      value: '₹10,000',
      icon: '/illustrations/tee-off.svg'
    },
    deadline: '5 days left',
    leaderboard: {
      position: 2,
      total: 24
    },
    milestones: [
      {
        target: 3,
        current: 2,
        label: 'Rounds under 85'
      },
      {
        target: 1,
        current: 0,
        label: 'Round under 80'
      }
    ],
    requirements: [
      'Must play full 18 holes',
      'Score must be verified by a playing partner',
      'Maximum handicap: 15'
    ]
  },
  {
    id: '2',
    title: 'Summer Tournament',
    description: 'Compete in our flagship summer tournament with amazing prizes!',
    type: 'upcoming',
    participants: 32,
    reward: {
      type: 'prize',
      title: 'Prize Pool',
      value: '₹50,000',
      icon: '/illustrations/golf-course-hero.svg'
    },
    deadline: 'Starts in 2 weeks',
    requirements: [
      'Club membership required',
      'Handicap index needed',
      'Registration closes in 1 week'
    ]
  },
  {
    id: '3',
    title: 'Putting Master',
    description: 'Average less than 30 putts per round over 5 rounds',
    type: 'active',
    participants: 45,
    progress: 60,
    reward: {
      type: 'badge',
      title: 'Putting Master Badge',
      icon: '/illustrations/players.svg'
    },
    deadline: '10 days left',
    leaderboard: {
      position: 5,
      total: 45
    },
    milestones: [
      {
        target: 5,
        current: 3,
        label: 'Rounds completed'
      },
      {
        target: 30,
        current: 29.5,
        label: 'Avg putts per round'
      }
    ]
  }
];

export default function FriendsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'chats' | 'challenges'>('leaderboard');
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredChallenges = challenges.filter(
    challenge => challengeFilter === 'all' || challenge.type === challengeFilter
  );

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]">
      {/* Floating Header with Blur Effect */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A4B3A]/80 backdrop-blur-lg border-b border-white/10 safe-top"
      >
        <div className="max-w-lg mx-auto px-3 py-2 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-base font-semibold"
          >
            Club Friends
          </motion.h1>
          <div className="w-8" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pt-[2.75rem] pb-safe">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[25vh] overflow-hidden"
        >
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A4B3A]/60 via-[#0A4B3A]/20 to-[#0A4B3A]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A4B3A] via-transparent to-transparent" />
          
          {/* Golf Course Illustration */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 -top-16"
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
          <div className="relative h-full flex flex-col justify-end px-3 pb-3">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-0.5"
            >
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Club Friends
              </h2>
              <p className="text-sm text-white/90 drop-shadow-lg">
                Connect with fellow golfers
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <div className="px-3 pt-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1.5 p-1 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
          >
            {[
              { id: 'leaderboard', label: 'Leaderboard', icon: TrophyIcon },
              { id: 'chats', label: 'Group Chats', icon: ChatBubbleLeftIcon },
              { id: 'challenges', label: 'Challenges', icon: FlagIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Content Section */}
        <section className="px-3 py-3">
          <AnimatePresence mode="wait">
            {activeTab === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {friends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={friend.profileImage}
                          alt={friend.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{friend.name}</span>
                          {friend.rankChange !== 0 && (
                            <span className={friend.rankChange > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {friend.rankChange > 0 ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                          <span>Handicap: {friend.handicap}</span>
                          <span>•</span>
                          <span>Avg: {friend.stats.avgScore}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          friend.recentScore.score <= friend.recentScore.par ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {friend.recentScore.score}
                        </div>
                        <div className="text-xs text-white/60">
                          Last round
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-sm font-medium">{friend.stats.roundsPlayed}</div>
                        <div className="text-xs text-white/60">Rounds</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-sm font-medium">{friend.stats.avgScore}</div>
                        <div className="text-xs text-white/60">Avg Score</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5">
                        <div className="text-sm font-medium">{friend.stats.bestScore}</div>
                        <div className="text-xs text-white/60">Best Score</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'chats' && (
              <motion.div
                key="chats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {chatGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => router.push(`/friends/chat/${group.id}`)}
                    className="p-3 rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 cursor-pointer active:bg-white/10 transition-colors touch-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <UserGroupIcon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{group.name}</span>
                          <span className="text-xs text-white/60 truncate">• {group.members} members</span>
                        </div>
                        <p className="text-xs text-white/60 truncate">{group.lastMessage}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-xs text-white/60 mb-1">{group.timestamp}</div>
                        {group.unreadCount > 0 && (
                          <div className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-xs font-medium min-w-[1.25rem] text-center">
                            {group.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'challenges' && (
              <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Challenge Filters */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3"
                >
                  {['all', 'active', 'upcoming', 'completed'].map((filter) => (
                    <motion.button
                      key={filter}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setChallengeFilter(filter as any)}
                      className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                        challengeFilter === filter
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Challenge Cards */}
                <div className="space-y-4">
                  {filteredChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="rounded-xl bg-gradient-to-br from-[#2A8B5A]/20 to-[#1A6B4A]/20 backdrop-blur-lg border border-white/10 overflow-hidden"
                    >
                      {/* Challenge Header */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-start gap-3">
                          <div className={`relative w-12 h-12 rounded-xl overflow-hidden ${
                            challenge.type === 'active' ? 'bg-emerald-500/20' :
                            challenge.type === 'upcoming' ? 'bg-blue-500/20' :
                            'bg-amber-500/20'
                          }`}>
                            <Image
                              src={challenge.reward.icon}
                              alt={challenge.title}
                              fill
                              className="object-cover p-2"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{challenge.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                challenge.type === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                                challenge.type === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-amber-500/20 text-amber-400'
                              }`}>
                                {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-white/80 mt-1">{challenge.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Challenge Stats */}
                      <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
                        <div className="p-3 text-center">
                          <div className="text-sm font-medium">{challenge.participants}</div>
                          <div className="text-xs text-white/60">Participants</div>
                        </div>
                        {challenge.leaderboard && (
                          <div className="p-3 text-center">
                            <div className="text-sm font-medium">#{challenge.leaderboard.position}</div>
                            <div className="text-xs text-white/60">Your Rank</div>
                          </div>
                        )}
                        <div className="p-3 text-center">
                          <div className="text-sm font-medium">{challenge.deadline}</div>
                          <div className="text-xs text-white/60">Remaining</div>
                        </div>
                      </div>

                      {/* Challenge Progress */}
                      <div className="p-4 space-y-4">
                        {challenge.milestones && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-medium text-white/80">Milestones</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {challenge.milestones.map((milestone, idx) => (
                                <div key={idx} className="p-2 rounded-lg bg-white/5">
                                  <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-white/60">{milestone.label}</span>
                                    <span className="font-medium">
                                      {milestone.current}/{milestone.target}
                                    </span>
                                  </div>
                                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(milestone.current / milestone.target) * 100}%` }}
                                      className="h-full bg-emerald-500 rounded-full"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {challenge.progress !== undefined && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white/60">Overall Progress</span>
                              <span className="font-medium">{challenge.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${challenge.progress}%` }}
                                className="h-full bg-emerald-500 rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        {challenge.requirements && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-white/80">Requirements</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {challenge.requirements.map((req, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-white/60 p-2 rounded-lg bg-white/5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Challenge Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${
                              challenge.reward.type === 'trophy' ? 'bg-amber-500/20 text-amber-400' :
                              challenge.reward.type === 'badge' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              <TrophyIcon className="w-4 h-4" />
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">{challenge.reward.title}</span>
                              {challenge.reward.value && (
                                <span className="text-white/60 ml-1">({challenge.reward.value})</span>
                              )}
                            </div>
                          </div>
                          {challenge.type === 'upcoming' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium"
                            >
                              Join Challenge
                            </motion.button>
                          )}
                          {challenge.type === 'active' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20"
                            >
                              View Details
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
} 