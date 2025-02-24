'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  TagIcon,
  ShoppingCartIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: 'clubs' | 'balls' | 'apparel' | 'accessories';
  brand: string;
  endDate: string;
  stock?: number;
}

const deals: Deal[] = [
  {
    id: '1',
    title: 'TaylorMade Stealth 2 Driver',
    description: 'Latest model with advanced carbon technology',
    originalPrice: 59999,
    discountedPrice: 49999,
    discountPercentage: 17,
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
    rating: 4.8,
    reviewCount: 124,
    category: 'clubs',
    brand: 'TaylorMade',
    endDate: '2024-04-15',
    stock: 5
  },
  {
    id: '2',
    title: 'Titleist Pro V1 Golf Balls',
    description: 'Tour-proven performance, dozen pack',
    originalPrice: 4999,
    discountedPrice: 3999,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
    rating: 4.9,
    reviewCount: 256,
    category: 'balls',
    brand: 'Titleist',
    endDate: '2024-04-20',
    stock: 20
  },
  {
    id: '3',
    title: 'Nike Dri-FIT Golf Polo',
    description: 'Premium moisture-wicking fabric',
    originalPrice: 3499,
    discountedPrice: 2499,
    discountPercentage: 29,
    image: 'https://images.unsplash.com/photo-1535132011086-b8818f016104',
    rating: 4.7,
    reviewCount: 89,
    category: 'apparel',
    brand: 'Nike',
    endDate: '2024-04-25',
    stock: 12
  }
];

const getCategoryColor = (category: Deal['category']) => {
  switch (category) {
    case 'clubs':
      return 'from-amber-500/20 to-orange-500/20';
    case 'balls':
      return 'from-emerald-500/20 to-blue-500/20';
    case 'apparel':
      return 'from-purple-500/20 to-pink-500/20';
    case 'accessories':
      return 'from-blue-500/20 to-indigo-500/20';
    default:
      return 'from-[#2A8B5A]/20 to-[#1A6B4A]/20';
  }
};

const getDaysRemaining = (endDate: string) => {
  const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

export default function ProShopDeals() {
  const router = useRouter();

  return (
    <section className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20">
            <TagIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Pro Shop Deals</h2>
            <p className="text-sm text-white/60">Limited time offers</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/shop')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="text-sm text-white/90">View All</span>
          <ArrowRightIcon className="w-4 h-4 text-white/60" />
        </motion.button>
      </motion.div>

      {/* Deals Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/shop/${deal.id}`)}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${getCategoryColor(deal.category)} backdrop-blur-lg border border-white/10`}
            >
              <div className="relative aspect-square">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 2}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-12" />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500 px-2 py-1 rounded-lg">
                  <ArrowTrendingDownIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">{deal.discountPercentage}%</span>
                </div>
                {deal.stock && deal.stock < 10 && (
                  <div className="absolute top-2 left-2 bg-red-500/90 px-2 py-1 rounded-lg">
                    <span className="text-xs font-medium">Only {deal.stock} left</span>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm line-clamp-1">{deal.title}</h3>
                    <span className="text-xs text-white/60">{deal.brand}</span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-1 mt-0.5">{deal.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-medium">{deal.rating}</span>
                    <span className="text-xs text-white/60">({deal.reviewCount})</span>
                  </div>
                  <span className="text-xs text-white/60">{getDaysRemaining(deal.endDate)}d left</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">₹{(deal.discountedPrice / 100).toLocaleString()}</span>
                    <span className="text-xs text-white/60 line-through">₹{(deal.originalPrice / 100).toLocaleString()}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors"
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
} 