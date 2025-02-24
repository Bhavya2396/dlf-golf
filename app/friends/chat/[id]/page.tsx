'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  EllipsisHorizontalIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  sender: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    content: 'Anyone up for a round this Saturday?',
    timestamp: '10:30 AM',
    isCurrentUser: false
  },
  {
    id: '2',
    sender: {
      name: 'Sarah Williams',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    content: 'I\'m in! What time are you thinking?',
    timestamp: '10:32 AM',
    isCurrentUser: false
  },
  {
    id: '3',
    sender: {
      name: 'You',
      image: '/path/to/your/image.jpg'
    },
    content: 'Count me in too. How about 7 AM tee time?',
    timestamp: '10:35 AM',
    isCurrentUser: true
  },
  {
    id: '4',
    sender: {
      name: 'John Smith',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    content: 'Perfect timing! The weather forecast looks great.',
    timestamp: '10:36 AM',
    isCurrentUser: false
  },
  {
    id: '5',
    sender: {
      name: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    },
    content: 'Awesome! I\'ll book the tee time right now.',
    timestamp: '10:38 AM',
    isCurrentUser: false
  }
];

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  // Add effect to hide navigation
  React.useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('hide-nav');
    }
    return () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.classList.remove('hide-nav');
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        name: 'You',
        image: '/path/to/your/image.jpg'
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen text-white bg-[#0A4B3A] flex flex-col">
      {/* Floating Header with Blur Effect */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0A4B3A]/80 backdrop-blur-lg border-b border-white/10 safe-top"
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
          <div className="flex-1 mx-4">
            <h1 className="text-lg font-semibold">Weekend Warriors</h1>
            <p className="text-sm text-white/60">8 members</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowGroupInfo(!showGroupInfo)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full pt-[4.5rem] pb-[4.5rem]">
        {/* Messages */}
        <div className="px-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}
            >
              {!message.isCurrentUser && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={message.sender.image}
                    alt={message.sender.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className={`flex flex-col ${message.isCurrentUser ? 'items-end' : 'items-start'}`}>
                {!message.isCurrentUser && (
                  <span className="text-sm text-white/60 mb-1">{message.sender.name}</span>
                )}
                <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  message.isCurrentUser
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 backdrop-blur-lg'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-white/40 mt-1">{message.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A4B3A]/80 backdrop-blur-lg border-t border-white/10 safe-bottom">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <PhotoIcon className="w-6 h-6" />
            </motion.button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Group Info Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: showGroupInfo ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed top-0 right-0 bottom-0 w-80 bg-[#0A4B3A] border-l border-white/10 p-6 space-y-6 z-50"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Group Info</h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGroupInfo(false)}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-white/60" />
              <span className="text-sm text-white/60">Members</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Mike Johnson', 'Sarah Williams', 'John Smith', 'You'].map((name) => (
                <span key={name} className="px-2 py-1 rounded-lg bg-white/10 text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="w-5 h-5 text-white/60" />
              <span className="text-sm text-white/60">About</span>
            </div>
            <p className="text-sm">
              Weekend golf group for casual rounds and friendly competition.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 