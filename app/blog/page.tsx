import { promises as fs } from 'fs';
import path from 'path';
import BlogList from '@/components/BlogList'; // Your client component

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogList posts={posts} />;
}

async function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'blog');
  const files = await fs.readdir(blogDir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      const [, metadata] = content.split('---');

      const metadataObj = metadata.split('\n').reduce((acc, line) => {
        const [key, ...valueParts] = line.split(':').map(s => s.trim());
        const value = valueParts.join(':').trim();
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>);

      return {
        slug: file.replace('.md', ''),
        title: metadataObj.title || 'Untitled',
        date: metadataObj.date || 'Unknown date',
        author: metadataObj.author || 'Anonymous',
        readingTime: metadataObj.readingTime || '5 min read',
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
