import { promises as fs } from 'fs'
import path from 'path'
import BlogRenderer from './BlogRenderer'

interface BlogPost {
  title: string;
  date: string;
  author: string;
  readingTime: string;
  content: string;
}

async function getPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(process.cwd(), 'blog', `${slug}.md`)
  let fileContents: string

  try {
    fileContents = await fs.readFile(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file: ${error}`)
    return {
      title: 'Error',
      date: 'Unknown',
      author: 'Unknown',
      readingTime: 'Unknown',
      content: 'There was an error loading this blog post.'
    }
  }

  const parts = fileContents.split('---')
  let metadata: Record<string, string> = {}
  let content = ''

  if (parts.length >= 3) {
    const metadataStr = parts[1]
    content = parts.slice(2).join('---').trim()

    metadata = metadataStr.split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split(':').map(s => s.trim())
      const value = valueParts.join(':').trim()
      if (key && value) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)
  } else {
    content = fileContents
  }

  return {
    title: metadata.title || 'Untitled',
    date: metadata.date || 'Unknown date',
    author: metadata.author || 'Anonymous',
    readingTime: metadata.readingTime || '5 min read',
    content: content
  }
}

export default async function Page({ params }: { params: { blog: string } }) {
  const post = await getPost(params.blog)

  return <BlogRenderer post={post} />
}