'use client'
import { Terminal } from "lucide-react"
import { useState, useEffect } from 'react'
import {getFlags} from '@/utils/badges'
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faCode, faHome, faMessage, faBlog, faBook, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faSpotify, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Sidebar from '@/components/sidebar'
import { getImageForName } from "@/utils/badgeImage"
import { motion, AnimatePresence } from 'framer-motion'

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false

const LANYARD_API_URL = 'https://api.lanyard.rest/v1/users/'

interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  details?: string;
  created_at: number;
  application_id?: string;
  timestamps?: {
    start: number;
    end?: number;
  };
  sync_id?: string;
  session_id?: string;
  party?: {
    id: string;
  };
  flags?: number;
  assets?: {
    large_text?: string;
    large_image?: string;
    small_text?: string;
    small_image?: string;
  };
}

interface LanyardResponse {
  success: boolean;
  data: {
    discord_user: {
      username: string;
      public_flags: number;
      id: string;
      discriminator: string;
      avatar: string;
    };
    discord_status: string;
    activities: Activity[];
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
    listening_to_spotify: boolean;
    spotify?: {
      track_id: string;
      timestamps: {
        start: number;
        end: number;
      };
      song: string;
      artist: string;
      album_art_url: string;
      album: string;
    };
  };
}

function LanyardStatus({ userId }: { userId: string }) {
  const [status, setStatus] = useState<LanyardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${LANYARD_API_URL}${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: LanyardResponse = await response.json();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.log(err);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 250); // Fetch every 250ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [userId]);

  if (error) {
    throw new Error("An error occurred fetching information");
  }

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get user badges from public flags
  const badges = getFlags(status.data.discord_user.public_flags);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateProgress = (start: number, end: number) => {
    const now = Date.now()
    const total = end - start
    const current = now - start
    return Math.min(100, (current / total) * 100)
  }

  const getActivityIcon = (type: number) => {
    switch (type) {
      case 0: return <FontAwesomeIcon icon={faGamepad} className="w-4 h-4 mr-2" />;
      case 2: return <FontAwesomeIcon icon={faSpotify} className="w-4 h-4 mr-2" />;
      case 4: return <FontAwesomeIcon icon={faMessage} className="w-4 h-4 mr-2" />;
      default: return <FontAwesomeIcon icon={faCode} className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl"
    >
      <div className="relative pb-0">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-600 to-transparent rounded-t-lg"></div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 flex items-end space-x-4 p-4"
        >
          <div className="relative">
            <Image
              src={`https://cdn.discordapp.com/avatars/${userId}/${status.data.discord_user.avatar}.png`}
              alt="User Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-gray-800 ${getStatusColor(status.data.discord_status)}`}></div>
          </div>
          <div className="pb-4">
            <div className="flex items-center justify-between">
              <motion.h2 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-bold"
              >
                {status.data.discord_user.username}
              </motion.h2>
              <div className="flex flex-wrap items-start ml-4">
                <AnimatePresence>
                  {badges.length > 0 ? (
                    badges.map((badge, index) => (
                      <motion.span 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        className="relative text-white rounded-full px-3 py-1 text-xs mr-2 group flex items-center"
                      >
                        <Image 
                          src={getImageForName(badge)} 
                          width="16" 
                          height="16" 
                          alt={badge.replace(/_/g, ' ')} 
                        />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          {badge.replace(/_/g, ' ')}
                        </span>
                      </motion.span>
                    ))
                  ) : (
                    <p className="text-gray-400"></p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="p-4 space-y-4"
      >
        <Separator className="bg-gray-700" />
        <div>
          <AnimatePresence>
            {status.data.activities.length > 0 ? (
              status.data.activities.map((activity: Activity, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="mb-2 bg-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    {getActivityIcon(activity.type)}
                    <p className="font-medium">{activity.name}</p>
                  </div>
                  {activity.type === 2 && status.data.spotify && (
                    <div className="mt-2 flex items-center">
                      <Image
                        src={status.data.spotify.album_art_url}
                        alt="Album Art"
                        width={64}
                        height={64}
                        className="rounded-md cursor-pointer mr-4"
                        onClick={() => {
                          if (status.data.spotify && status.data.spotify.track_id) {
                            window.open(`https://open.spotify.com/track/${status.data.spotify.track_id}`, '_blank');
                          }
                        }}
                      />
                      <div className="flex-grow">
                        <p className="text-sm text-gray-400">
                          Listening to {status.data.spotify.song} by {status.data.spotify.artist}
                        </p>
                        <div className="mt-2 bg-gray-600 h-2 rounded-full">
                          <motion.div 
                            className="bg-green-500 h-2 rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${calculateProgress(status.data.spotify.timestamps.start, status.data.spotify.timestamps.end)}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{Math.floor((Date.now() - status.data.spotify.timestamps.start) / 1000 / 60)}:{Math.floor((Date.now() - status.data.spotify.timestamps.start) / 1000 % 60).toString().padStart(2, '0')}</span>
                          <span>{Math.floor((status.data.spotify.timestamps.end - status.data.spotify.timestamps.start) / 1000 / 60)}:{Math.floor((status.data.spotify.timestamps.end - status.data.spotify.timestamps.start) / 1000 % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activity.type === 4 && (
                    <p className="text-sm text-gray-400 mt-1">{activity.state}</p>
                  )}
                  {activity.type !== 2 && activity.type !== 4 && activity.details && (
                    <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-center text-gray-400"
              >
                Not doing anything currently
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar/>
      <div className="flex-1 flex items-center justify-center overflow-y-auto p-6">
        <LanyardStatus userId="1137093225576935485" />
      </div>
    </div>
  )
}