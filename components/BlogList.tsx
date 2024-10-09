'use client';

import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import Sidebar from '@/components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  readingTime: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-gray-900 text-white"
    >
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold mb-8"
          >
            Blog Posts
          </motion.h1>
          <div className="space-y-6">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                <Link href={`/blog/${post.slug}`} className="block hover:bg-gray-800 rounded-lg p-4 transition duration-300">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center text-gray-400 mb-2">
                    <span><FontAwesomeIcon icon={faCalendar} style={{ fontSize: '0.75rem' }} className="mr-2" />
                    {post.date}</span>
                  </div>
                  <p className="text-gray-300">{post.author} • {post.readingTime}</p>
                </Link>
                  <Separator className="bg-gray-700 mt-4" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
