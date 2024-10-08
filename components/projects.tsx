'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from 'framer-motion';

const GITHUB_API_URL = 'https://api.github.com/users/wlfyzz/repos';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: {
    avatar_url: string;
  };
}

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data: Repo[] = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        setError('Error fetching repositories. Please try again later.');
        console.log(err);
      }
    };

    fetchRepos(); // Initial fetch
  }, []);

  if (error) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-red-500"
      >
        {error}
      </motion.p>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl"
    >
      <div className="p-4 space-y-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Projects
        </motion.h2>
        <Separator className="bg-gray-700" />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                className="mb-2 bg-gray-700 rounded-lg p-3 flex items-start"
              >
                <Image src={repo.owner.avatar_url} alt="Owner Avatar" width={40} height={40} className="rounded-full mr-3" />
                <div className="flex-grow">
                  <h3 className="font-medium">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {repo.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-400">{repo.description || 'No description available'}</p>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{repo.language || 'N/A'}</span>
                    <span>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}