import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  TagIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  expiresIn: string;
  category: string;
  isHot?: boolean;
}

// Sample deals data with real golf equipment
const sampleDeals: Deal[] = [
  {
    id: '1',
    title: 'TaylorMade Stealth 2 Plus Driver',
    description: 'Revolutionary 60X Carbon Twist Face with advanced aerodynamics for maximum distance and forgiveness',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070',
    originalPrice: 599.99,
    discountedPrice: 499.99,
    discountPercentage: 17,
    expiresIn: '2 days',
    category: 'Drivers',
    isHot: true
  },
  {
    id: '2',
    title: 'Titleist Pro V1 Golf Balls',
    description: 'Tour-proven performance with exceptional distance, consistent flight, and Drop-and-Stop™ control',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070',
    originalPrice: 49.99,
    discountedPrice: 39.99,
    discountPercentage: 20,
    expiresIn: '3 days',
    category: 'Balls'
  },
  {
    id: '3',
    title: 'Callaway JAWS Raw Wedge',
    description: 'Raw Face with aggressive grooves for maximum spin and versatility around the greens',
    image: 'https://images.unsplash.com/photo-1622819584099-e06a45b65b02?q=80&w=2070',
    originalPrice: 179.99,
    discountedPrice: 149.99,
    discountPercentage: 15,
    expiresIn: '5 days',
    category: 'Wedges',
    isHot: true
  },
  {
    id: '4',
    title: 'FootJoy Pro|SL Golf Shoes',
    description: 'Premium ChromoSkin leather with superior waterproof performance and exceptional comfort',
    image: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070',
    originalPrice: 169.99,
    discountedPrice: 129.99,
    discountPercentage: 24,
    expiresIn: '4 days',
    category: 'Footwear'
  }
];

export const ProShopDealsCard: React.FC = () => {
  const [likedDeals, setLikedDeals] = useState<Set<string>>(new Set());
  const [hoveredDeal, setHoveredDeal] = useState<string | null>(null);

  const handleLike = (id: string) => {
    setLikedDeals(prev => {
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
      {/* Enhanced Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[var(--accent-mint)]/5 via-transparent to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="flex items-center gap-3 relative">
          <div className="p-2 rounded-xl bg-[var(--accent-mint)]/10">
            <ShoppingBagIcon className="w-6 h-6 text-[var(--accent-mint)]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Pro Shop Deals</h3>
            <p className="text-sm text-white/60">Limited time offers</p>
          </div>
        </div>
        <motion.button 
          className="relative px-4 py-2 text-sm text-[var(--accent-mint)] flex items-center gap-2 rounded-full bg-[var(--accent-mint)]/10 font-medium"
          whileHover={{ gap: '12px' }}
          transition={{ duration: 0.2 }}
        >
          View All
          <ArrowRightIcon className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sampleDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--accent-mint)]/30 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredDeal(deal.id)}
              onHoverEnd={() => setHoveredDeal(null)}
            >
              {/* Enhanced Deal Image */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Enhanced Discount Badge */}
                <motion.div 
                  className="absolute top-4 left-4 bg-[var(--secondary-coral)] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {deal.discountPercentage}% OFF
                </motion.div>
                
                {/* Enhanced Hot Deal Badge */}
                {deal.isHot && (
                  <motion.div 
                    className="absolute top-4 right-4 bg-[var(--accent-mint)] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <FireIcon className="w-4 h-4" />
                    Hot Deal
                  </motion.div>
                )}

                {/* Quick Action Buttons */}
                <AnimatePresence>
                  {hoveredDeal === deal.id && (
                    <motion.div 
                      className="absolute right-4 bottom-4 flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <motion.button
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(deal.id)}
                      >
                        {likedDeals.has(deal.id) ? (
                          <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-white" />
                        )}
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShareIcon className="w-5 h-5 text-white" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Deal Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.h4 
                      className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-[var(--accent-mint)] transition-colors"
                      layoutId={`title-${deal.id}`}
                    >
                      {deal.title}
                    </motion.h4>
                    <p className="text-sm text-white/60 line-clamp-2 mb-3">{deal.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 rounded-full bg-white/10 text-white/80 flex items-center gap-1">
                        <TagIcon className="w-4 h-4" />
                        {deal.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price and Timer */}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-sm text-white/60 line-through mb-1">
                      ${deal.originalPrice}
                    </div>
                    <motion.div 
                      className="text-2xl font-bold text-[var(--accent-mint)]"
                      whileHover={{ scale: 1.05 }}
                    >
                      ${deal.discountedPrice}
                    </motion.div>
                  </div>
                  
                  <div className="px-3 py-1.5 rounded-full bg-white/10 flex items-center gap-2 text-sm text-white/80">
                    <ClockIcon className="w-4 h-4" />
                    <span>{deal.expiresIn}</span>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <motion.button
                  className="w-full mt-6 bg-[var(--accent-mint)] text-[var(--md-surface)] py-3 rounded-xl font-medium flex items-center justify-center gap-3 relative overflow-hidden group/button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"
                  />
                  <ShoppingBagIcon className="w-5 h-5" />
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 