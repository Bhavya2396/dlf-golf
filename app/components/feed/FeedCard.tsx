import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FeedPost {
  id: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface FeedCardProps {
  post: FeedPost;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onMore: () => void;
}

export default function FeedCard({ post, onLike, onComment, onShare, onMore }: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-white/60">{post.author.role}</div>
          </div>
        </div>
        <button
          onClick={onMore}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <p className="text-white/90">{post.content}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className="relative mt-2">
          <div className={`grid gap-1 ${
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' :
            post.images.length === 3 ? 'grid-cols-2' :
            'grid-cols-2'
          }`}>
            {post.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`relative ${
                  post.images.length === 3 && index === 0 ? 'col-span-2' : ''
                } ${
                  index === 0 ? 'h-60' : 'h-40'
                }`}
              >
                <Image
                  src={image}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {post.images.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-xl font-semibold">+{post.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onLike}
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              {post.isLiked ? (
                <HeartIconSolid className="w-5 h-5 text-emerald-400" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{post.likes}</span>
            </button>
            <button
              onClick={onComment}
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          <button
            onClick={onShare}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-white/40">{post.timestamp}</div>
      </div>
    </motion.div>
  );
} 