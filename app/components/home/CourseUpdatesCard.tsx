import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  SunIcon,
  CloudIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface CourseUpdate {
  id: string;
  type: 'maintenance' | 'weather' | 'event' | 'notice';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  affectedAreas?: string[];
  duration?: {
    start: string;
    end: string;
  };
  image?: string;
}

interface Weather {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    time: string;
    condition: string;
    temperature: number;
  }>;
}

interface CourseUpdatesCardProps {
  updates: CourseUpdate[];
  weather: Weather;
  lastUpdated: string;
}

export const CourseUpdatesCard: React.FC<CourseUpdatesCardProps> = ({
  updates,
  weather,
  lastUpdated,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'low':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-white/20 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <ArrowPathIcon className="w-5 h-5" />;
      case 'weather':
        return <CloudIcon className="w-5 h-5" />;
      case 'event':
        return <CalendarIcon className="w-5 h-5" />;
      case 'notice':
        return <InformationCircleIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="material-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Course Updates</h3>
          <div className="text-sm text-white/60 flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            Updated {lastUpdated}
          </div>
        </div>

        {/* Weather Summary */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[var(--accent-mint)]/20">
                <SunIcon className="w-6 h-6 text-[var(--accent-mint)]" />
              </div>
              <div>
                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm text-white/60">{weather.condition}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Wind</div>
              <div className="font-medium">{weather.windSpeed} km/h</div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 snap-x">
            {weather.forecast.map((hour, index) => (
              <motion.div
                key={index}
                className="flex-none text-center snap-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-sm text-white/60">{hour.time}</div>
                <div className="my-1">
                  <CloudIcon className="w-5 h-5 mx-auto" />
                </div>
                <div className="font-medium">{hour.temperature}°</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div className="divide-y divide-white/10">
        {updates.map((update, index) => (
          <motion.div
            key={update.id}
            className="p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${getPriorityColor(update.priority)}`}>
                {getTypeIcon(update.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium mb-1">{update.title}</h4>
                    <p className="text-sm text-white/60">{update.description}</p>
                  </div>
                  <div className="text-xs text-white/40">{update.timestamp}</div>
                </div>

                {/* Additional Info */}
                {update.affectedAreas && (
                  <div className="mt-3">
                    <div className="text-sm text-white/60 mb-2">Affected Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {update.affectedAreas.map((area, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 rounded-full bg-white/10 text-xs"
                        >
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration */}
                {update.duration && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
                    <ClockIcon className="w-4 h-4" />
                    <span>{update.duration.start} - {update.duration.end}</span>
                  </div>
                )}

                {/* Image */}
                {update.image && (
                  <div className="mt-3 relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 