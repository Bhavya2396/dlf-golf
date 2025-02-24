'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { 
  HandThumbUpIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  TrophyIcon,
  ChartBarIcon,
  FlagIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
  BookmarkIcon,
  EyeIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid, 
  BookmarkIcon as BookmarkIconSolid,
  FireIcon as FireIconSolid,
  SparklesIcon as SparklesIconSolid
} from '@heroicons/react/24/solid';

// Local image paths with optimized dimensions
const DEFAULT_IMAGES = {
  achievement: {
    trophy: {
      url: '/images/achievements/trophy.jpg',
      width: 800,
      height: 600
    },
    celebration: {
      url: '/images/achievements/celebration.jpg',
      width: 800,
      height: 600
    },
    sunset: {
      url: '/images/achievements/sunset.jpg',
      width: 800,
      height: 600
    }
  },
  score: {
    course: {
      url: '/images/scores/course.jpg',
      width: 800,
      height: 600
    },
    scorecard: {
      url: '/images/scores/scorecard.jpg',
      width: 800,
      height: 600
    },
    putting: {
      url: '/images/scores/putting.jpg',
      width: 800,
      height: 600
    }
  },
  challenge: {
    action: {
      url: '/images/challenges/action.jpg',
      width: 800,
      height: 600
    },
    bunker: {
      url: '/images/challenges/bunker.jpg',
      width: 800,
      height: 600
    },
    approach: {
      url: '/images/challenges/approach.jpg',
      width: 800,
      height: 600
    }
  },
  userDefault: [
    {
      url: '/images/avatars/default-1.jpg',
      width: 200,
      height: 200
    },
    {
      url: '/images/avatars/default-2.jpg',
      width: 200,
      height: 200
    },
    {
      url: '/images/avatars/default-3.jpg',
      width: 200,
      height: 200
    }
  ]
};

// Default placeholder image for loading state
const PLACEHOLDER_BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qQEBALkE6Oz5DRVlLT1NbWl5eYWJhSl9yX2JhYVv/2wBDARUXFx4aHjshITtbQjVCW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

interface SocialFeedCardProps {
  user: {
    name: string;
    avatar?: string;
    level?: number;
    achievements?: number;
  };
  content: string;
  type: 'achievement' | 'score' | 'challenge';
  image?: string;
  likes: number;
  comments: number;
  views?: number;
  time: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  tags?: string[];
  score?: {
    value: number;
    par?: number;
    course?: string;
  };
  achievement?: {
    title: string;
    description: string;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  };
  challenge?: {
    title: string;
    progress: number;
    deadline?: string;
  };
}

interface ImageData {
  url: string;
  width: number;
  height: number;
}

export const SocialFeedCard: React.FC<SocialFeedCardProps> = React.memo(({
  user,
  content,
  type,
  image,
  likes: initialLikes,
  comments,
  views,
  time,
  onLike,
  onComment,
  onShare,
  tags,
  score,
  achievement,
  challenge
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Enhanced motion values
  const scale = useSpring(1, {
    stiffness: 200,
    damping: 20
  });
  
  const rotation = useSpring(0, {
    stiffness: 200,
    damping: 20
  });

  // Parallax effect for card content
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, [-300, 300], [30, -30]);

  useEffect(() => {
    if (isHovered) {
      scale.set(1.02);
      rotation.set(2);
    } else {
      scale.set(1);
      rotation.set(0);
    }
  }, [isHovered, scale, rotation]);

  const getTypeIcon = useMemo(() => {
    const iconClasses = "w-5 h-5";
    switch (type) {
      case 'achievement':
        return <TrophyIcon className={`${iconClasses} text-yellow-500`} />;
      case 'score':
        return <ChartBarIcon className={`${iconClasses} text-accent-mint`} />;
      case 'challenge':
        return <FlagIcon className={`${iconClasses} text-secondary-coral`} />;
    }
  }, [type]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x - rect.width / 2);
      mouseY.set(y - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();

    // Trigger like animation
    if (!isLiked) {
      const hearts = Array(5).fill(0);
      hearts.forEach((_, i) => {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerHTML = '❤️';
          heart.className = 'absolute text-2xl animate-float-up';
          heart.style.left = `${Math.random() * 100}%`;
          cardRef.current?.appendChild(heart);
          setTimeout(() => heart.remove(), 1000);
        }, i * 100);
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getRandomImage = (type: 'achievement' | 'score' | 'challenge'): ImageData => {
    const images = DEFAULT_IMAGES[type];
    const keys = Object.keys(images) as Array<keyof typeof images>;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return images[randomKey];
  };

  const getRandomAvatar = (): ImageData => {
    return DEFAULT_IMAGES.userDefault[Math.floor(Math.random() * DEFAULT_IMAGES.userDefault.length)];
  };

  const selectedImage = useMemo(() => {
    if (image && image.startsWith('/')) {
      // If it's already a local path, use it
      return { url: image, width: 800, height: 600 };
    } else if (image) {
      // If it's an external URL, use a default size
      return { url: image, width: 800, height: 600 };
    }
    return getRandomImage(type);
  }, [image, type]);

  const selectedAvatar = useMemo(() => {
    if (user.avatar && user.avatar.startsWith('/')) {
      // If it's already a local path, use it
      return { url: user.avatar, width: 200, height: 200 };
    } else if (user.avatar) {
      // If it's an external URL, use a default size
      return { url: user.avatar, width: 200, height: 200 };
    }
    return getRandomAvatar();
  }, [user.avatar]);

  // Enhanced card variants with spring animations
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Enhanced content reveal animation
  const contentVariants = {
    collapsed: {
      height: "3em",
      overflow: "hidden"
    },
    expanded: {
      height: "auto",
      overflow: "visible",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Achievement animation variants
  const achievementVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="material-card group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
      style={{
        scale,
        rotateY: rotation,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
          const y = e.clientY - rect.top - rect.height / 2;
          mouseY.set(y);
        }
      }}
    >
      {/* Enhanced Header with User Level and Achievements */}
      <div className="p-4 flex items-center justify-between relative">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <motion.div 
              className="w-12 h-12 rounded-full overflow-hidden bg-white/5 relative ring-2 ring-[var(--md-primary-container)] ring-offset-2 ring-offset-[var(--md-surface)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={selectedAvatar.url}
                alt={user.name}
                width={selectedAvatar.width}
                height={selectedAvatar.height}
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setAvatarError(true)}
                priority
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR_DATA_URL}
              />
              {avatarError && (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--md-primary)] to-[var(--md-secondary)] flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{user.name[0]}</span>
                </div>
              )}
            </motion.div>
            
            {/* User Level Badge */}
            {user.level && (
              <motion.div 
                className="absolute -bottom-1 -right-1 bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] rounded-full px-2 py-0.5 text-xs font-medium ring-2 ring-[var(--md-surface)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                Lvl {user.level}
              </motion.div>
            )}
          </div>

          <div>
            <motion.h3 
              className="text-base font-medium text-white group-hover:text-[var(--md-primary-container)] cursor-pointer flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              {user.name}
              {user.achievements && user.achievements > 0 && (
                <motion.span
                  className="inline-flex items-center gap-1 text-xs bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] px-2 py-0.5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <SparklesIcon className="w-3 h-3" />
                  {user.achievements}
                </motion.span>
              )}
            </motion.h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/60">{time}</span>
              <span className="text-white/40">•</span>
              <motion.span 
                className={`flex items-center gap-1 ${
                  type === 'achievement' ? 'text-yellow-500' :
                  type === 'score' ? 'text-[var(--accent-mint)]' :
                  'text-[var(--secondary-coral)]'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {getTypeIcon}
                {type}
              </motion.span>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced Options Menu */}
        <div className="relative">
          <motion.button
            className="p-2 rounded-full hover:bg-white/10 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOptions(!showOptions)}
          >
            <EllipsisHorizontalIcon className="w-6 h-6 text-white/60 group-hover:text-white" />
          </motion.button>
          
          <AnimatePresence>
            {showOptions && (
              <motion.div
                className="absolute right-0 mt-2 w-56 rounded-xl bg-[var(--md-surface)] border border-white/10 shadow-xl overflow-hidden z-10"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="p-2 space-y-1">
                  <button className="w-full px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <ShareIcon className="w-4 h-4" />
                    Share Post
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-colors">
                    <FlagIcon className="w-4 h-4" />
                    Report
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <AnimatePresence>
        <motion.div 
          className="px-4 pb-3"
          variants={contentVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          style={{ y: parallaxY }}
        >
          <p className="text-base text-white/90 leading-relaxed">
            {content}
            {content.length > 100 && (
              <motion.button
                className="ml-2 text-[var(--accent-mint)] hover:underline font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Read more"}
              </motion.button>
            )}
          </p>

          {/* Tags Section */}
          {tags && tags.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Image Section */}
      <motion.div 
        className="relative aspect-video bg-gradient-to-b from-white/5 to-white/10 cursor-pointer overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isImageLoaded ? 1 : 0 }}
        whileHover="hover"
      >
        <Image 
          src={selectedImage.url}
          alt={`${type} post by ${user.name}`}
          width={selectedImage.width}
          height={selectedImage.height}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setImageError(true)}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR_DATA_URL}
          quality={90}
        />
        
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--md-surface)] to-[var(--md-surface-bright)] flex items-center justify-center">
            <span className="text-white/60 text-sm font-medium">Image not available</span>
          </div>
        )}

        {/* Enhanced Image Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          variants={{
            hover: { opacity: 1 }
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="flex gap-4"
              variants={{
                hover: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.button
                className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-[var(--md-primary)] transition-colors"
                variants={{
                  hover: { scale: 1.1, y: 0 }
                }}
                initial={{ scale: 0.8, y: 20 }}
                whileTap={{ scale: 0.95 }}
              >
                <HeartIcon className="w-6 h-6" />
              </motion.button>
              <motion.button
                className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-[var(--md-primary)] transition-colors"
                variants={{
                  hover: { scale: 1.1, y: 0 }
                }}
                initial={{ scale: 0.8, y: 20 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Type-specific Overlays */}
        {type === 'score' && score && (
          <motion.div 
            className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-white/60">Score</p>
                <p className="text-2xl font-bold text-white">{score.value}</p>
              </div>
              {score.par && (
                <div>
                  <p className="text-xs text-white/60">Par</p>
                  <p className="text-2xl font-bold text-white">{score.par}</p>
                </div>
              )}
            </div>
            {score.course && (
              <p className="text-sm text-white/80 mt-1">{score.course}</p>
            )}
          </motion.div>
        )}

        {type === 'achievement' && achievement && (
          <motion.div 
            className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500 to-purple-500' :
                achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                'bg-gradient-to-r from-gray-500 to-slate-500'
              }`}>
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">{achievement.title}</h4>
                <p className="text-xs text-white/60">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {type === 'challenge' && challenge && (
          <motion.div 
            className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{challenge.title}</h4>
                {challenge.deadline && (
                  <span className="text-xs text-white/60">{challenge.deadline}</span>
                )}
              </div>
              <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-[var(--md-primary)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${challenge.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-white/60 text-right">{challenge.progress}% Complete</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Actions Section */}
      <div className="p-4 flex items-center justify-between border-t border-white/10">
        <div className="flex items-center gap-6">
          <motion.button
            className={`flex items-center gap-2 ${
              isLiked ? 'text-red-500' : 'text-white/60 hover:text-red-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <motion.span 
              key={likes}
              className="text-sm font-medium"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {likes}
            </motion.span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-white/60 hover:text-[var(--accent-mint)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComment}
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{comments}</span>
          </motion.button>

          {views !== undefined && (
            <motion.div
              className="flex items-center gap-2 text-white/60"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <EyeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{views}</span>
            </motion.div>
          )}

          <motion.button
            className="flex items-center gap-2 text-white/60 hover:text-[var(--accent-mint)] group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
          >
            <ShareIcon className="w-5 h-5" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Share
            </span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            className={`p-2 rounded-full ${
              isBookmarked ? 'text-[var(--accent-mint)]' : 'text-white/60 hover:text-[var(--accent-mint)]'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookmark}
          >
            {isBookmarked ? (
              <BookmarkIconSolid className="w-5 h-5" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Floating hearts animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-50px) scale(1.5) rotate(15deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(2) rotate(30deg);
            opacity: 0;
          }
        }

        .animate-float-up {
          position: absolute;
          animation: float-up 1s ease-out forwards;
        }
      `}</style>
    </motion.div>
  );
});

SocialFeedCard.displayName = 'SocialFeedCard'; 