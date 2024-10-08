'use client'

import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faClock, faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Sidebar from '@/components/sidebar'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { unified } from 'unified'
import parse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'

config.autoAddCss = false

interface BlogPost {
  title: string;
  date: string;
  author: string;
  readingTime: string;
  content: string;
}

export default function BlogRenderer({ post }: { post: BlogPost }) {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
          <Sidebar />
          <div className="flex-1 flex justify-center items-center overflow-y-auto p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-6xl"
            >
              <div className="p-8">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-4xl font-bold mb-4"
                >
                  {post.title}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-center text-gray-400 mb-6"
                >
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  <span className="mr-4">{post.date}</span>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <span>{post.readingTime}</span>
                </motion.div>
                <Separator className="bg-gray-700 mb-6" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="prose prose-invert max-w-none"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  >
                    {post.content}
                  </ReactMarkdown>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      );
}
