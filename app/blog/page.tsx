import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import Sidebar from '@/components/sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  readingTime: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'blog')
  const files = await fs.readdir(blogDir)

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blogDir, file)
      const content = await fs.readFile(filePath, 'utf8')
      const [, metadata] = content.split('---')

      const metadataObj = metadata.split('\n').reduce((acc, line) => {
        const [key, ...valueParts] = line.split(':').map(s => s.trim())
        const value = valueParts.join(':').trim()
        if (key && value) {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, string>)

      return {
        slug: file.replace('.md', ''),
        title: metadataObj.title || 'Untitled',
        date: metadataObj.date || 'Unknown date',
        author: metadataObj.author || 'Anonymous',
        readingTime: metadataObj.readingTime || '5 min read',
      }
    })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function BlogList() {
  const posts = await getBlogPosts()

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block hover:bg-gray-800 rounded-lg p-4 transition duration-300">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <div className="flex items-center text-gray-400 mb-2">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-300">{post.author} • {post.readingTime}</p>
                </Link>
                <Separator className="bg-gray-700 mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}