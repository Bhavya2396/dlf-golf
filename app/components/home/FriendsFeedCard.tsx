import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
  FlagIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    level?: number;
  };
  type: 'score' | 'achievement' | 'photo' | 'milestone';
  timestamp: string;
  content: {
    text: string;
    image?: string;
    score?: number;
    course?: string;
    achievement?: {
      title: string;
      icon: string;
    };
  };
  likes: number;
  comments: number;
  liked?: boolean;
}

export const FriendsFeedCard: React.FC<{ items: FeedItem[] }> = ({ items }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      className="material-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
    >
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold">Friends Activity</h3>
      </div>

      <div className="divide-y divide-white/10">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={item.user.avatar}
                      alt={item.user.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  {item.user.level && (
                    <div className="absolute -bottom-1 -right-1 bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.user.level}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{item.user.name}</div>
                  <div className="text-xs text-white/60">{item.timestamp}</div>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-sm text-white/80">{item.content.text}</p>

              {/* Score Card */}
              {item.type === 'score' && item.content.score && (
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FlagIcon className="w-5 h-5 text-[var(--accent-mint)]" />
                      <span className="text-sm">{item.content.course}</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--accent-mint)]">
                      {item.content.score}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievement Card */}
              {item.type === 'achievement' && item.content.achievement && (
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--secondary-coral)]/20">
                      <Image
                        src={item.content.achievement.icon}
                        alt={item.content.achievement.title}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.content.achievement.title}</div>
                      <div className="text-sm text-white/60">New Achievement Unlocked!</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Content */}
              {item.type === 'photo' && item.content.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={item.content.image}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-4">
              <motion.button
                className="flex items-center gap-2 text-sm"
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike(item.id)}
              >
                {likedItems.has(item.id) ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
              </motion.button>

              <button className="flex items-center gap-2 text-sm">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                <span>{item.comments}</span>
              </button>

              <button className="flex items-center gap-2 text-sm ml-auto">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 