'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  TagIcon,
  ShoppingCartIcon,
  StarIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Product {
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
  isNew?: boolean;
  isFeatured?: boolean;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'balls', label: 'Balls' },
  { id: 'apparel', label: 'Apparel' },
  { id: 'accessories', label: 'Accessories' }
] as const;

const products: Product[] = [
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
    isFeatured: true,
    isNew: true
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
    isFeatured: true
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
    isNew: true
  }
];

const getCategoryColor = (category: Product['category']) => {
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

export default function ShopPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    (searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A]">
      {/* Floating Header */}
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
            Pro Shop
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </motion.button>
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
                Pro Shop
              </h2>
              <p className="text-sm text-white/90 drop-shadow-lg">
                Premium golf equipment & gear
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search Bar */}
        <div className="px-3 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-white/5 rounded-xl"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="px-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="px-3 py-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onClick={() => router.push(`/shop/${product.id}`)}
                className={`rounded-xl overflow-hidden bg-gradient-to-br ${getCategoryColor(product.category)} backdrop-blur-lg border border-white/10`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-emerald-500 px-1.5 py-0.5 rounded-lg text-xs font-medium">
                      -{product.discountPercentage}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-blue-500 px-1.5 py-0.5 rounded-lg text-xs font-medium">
                      New
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                    <p className="text-xs text-white/60 line-clamp-1">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-white/60">({product.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold">₹{(product.discountedPrice / 100).toLocaleString()}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xs text-white/60 line-through">₹{(product.originalPrice / 100).toLocaleString()}</span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 rounded-lg bg-emerald-500 text-white"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 