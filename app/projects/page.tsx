import GithubProjects from '@/components/projects';
import Sidebar from '@/components/sidebar';

export default function Home() {
    return (
      <div className="flex h-screen bg-gray-900 text-white">
              <Sidebar/>
        <div className="flex-1 flex items-center justify-center overflow-y-auto p-6">
          <GithubProjects/>
        </div>
      </div>
    )
  }