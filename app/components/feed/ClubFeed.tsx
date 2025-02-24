import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CameraIcon,
  PencilSquareIcon,
  FlagIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  UserGroupIcon,
  XMarkIcon,
  PaperClipIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FeedPost {
  id: string;
  type: 'score' | 'photo' | 'message';
  user: {
    name: string;
    image: string;
    role: string;
  };
  content: string;
  images?: string[];
  score?: {
    value: number;
    par: number;
    course: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const samplePosts: FeedPost[] = [
  {
    id: '1',
    type: 'score',
    user: {
      name: 'John Smith',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'Member'
    },
    content: 'Just finished a great round! 🏌️‍♂️',
    score: {
      value: 72,
      par: 72,
      course: 'DLF Championship Course'
    },
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: '2',
    type: 'photo',
    user: {
      name: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Pro Member'
    },
    content: 'Perfect morning for golf! The course is looking amazing today.',
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b'
    ],
    likes: 45,
    comments: 12,
    timestamp: '4 hours ago',
    isLiked: true
  },
  {
    id: '3',
    type: 'message',
    user: {
      name: 'Club Admin',
      image: '/illustrations/golf-course-hero.svg',
      role: 'Admin'
    },
    content: 'The weekend tournament schedule has been updated. Check the events section for more details!',
    likes: 18,
    comments: 5,
    timestamp: '6 hours ago',
    isLiked: false
  }
];

export default function ClubFeed() {
  const router = useRouter();
  const [showPostModal, setShowPostModal] = useState(false);
  const [postType, setPostType] = useState<'score' | 'photo' | 'message'>('message');
  const [posts, setPosts] = useState<FeedPost[]>(samplePosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
            alt="Your profile"
            fill
            className="object-cover"
          />
        </div>
        <button
          onClick={() => {
            setPostType('message');
            setShowPostModal(true);
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-left text-white/60 text-sm hover:bg-white/10"
        >
          Share something with the club...
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setPostType('score');
            setShowPostModal(true);
          }}
          className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"
        >
          <FlagIcon className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setPostType('photo');
            setShowPostModal(true);
          }}
          className="p-2 rounded-lg bg-blue-500/20 text-blue-400"
        >
          <CameraIcon className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.user.image}
                  alt={post.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.user.name}</span>
                  <span className="text-xs text-white/60">{post.user.role}</span>
                </div>
                <div className="text-xs text-white/60">{post.timestamp}</div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-sm text-white/90">{post.content}</p>

              {/* Score Card */}
              {post.type === 'score' && post.score && (
                <div className="mt-3 p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">{post.score.course}</div>
                    <div className={`text-lg font-semibold ${
                      post.score.value <= post.score.par ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {post.score.value}
                    </div>
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    Par {post.score.par}
                  </div>
                </div>
              )}

              {/* Photo Grid */}
              {post.type === 'photo' && post.images && (
                <div className="mt-3 grid grid-cols-2 gap-1">
                  {post.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors">
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#0A4B3A] p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">
                  {postType === 'score' ? 'Post Score' :
                   postType === 'photo' ? 'Share Photo' :
                   'Write Message'}
                </h3>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {postType === 'message' && (
                <textarea
                  placeholder="What's on your mind?"
                  className="w-full h-32 bg-white/5 rounded-xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}

              {postType === 'score' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-sm text-white/60 mb-1 block">Score</label>
                      <input
                        type="number"
                        placeholder="72"
                        className="w-full bg-white/5 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-white/60 mb-1 block">Par</label>
                      <input
                        type="number"
                        placeholder="72"
                        className="w-full bg-white/5 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Add a comment about your round..."
                    className="w-full h-20 bg-white/5 rounded-xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              {postType === 'photo' && (
                <div className="space-y-4">
                  <button className="w-full aspect-video flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 hover:border-emerald-500/50 transition-colors">
                    <div className="text-center">
                      <PhotoIcon className="w-8 h-8 mx-auto mb-2 text-white/40" />
                      <span className="text-sm text-white/60">Click to add photos</span>
                    </div>
                  </button>
                  <textarea
                    placeholder="Write a caption..."
                    className="w-full h-20 bg-white/5 rounded-xl p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <PaperClipIcon className="w-6 h-6 text-white/60" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-emerald-500 rounded-xl text-white font-medium"
                >
                  Post
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 