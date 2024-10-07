import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faCode, faHome, faMessage, faBlog, faBook, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import {faTwitter, faGithub, faDiscord, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {config} from '@fortawesome/fontawesome-svg-core'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
config.autoAddCss = false
interface SidebarItemProps {
  icon: IconDefinition
  href: string
  ariaLabel: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, href, ariaLabel }) => {
  return (
    <Link 
      href={href} 
      className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-gray-400 hover:text-white"
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={icon} className="w-6 h-6" />
    </Link>
  )
}

export default function Sidebar() {
  const sidebarItems = [
    { icon: faHome, href: "/", ariaLabel: "Home" },
    { icon: faGithub, href: "/projects", ariaLabel: "Projects" },
    { icon: faTwitter, href: "https://x.com/wlfyzz", ariaLabel: "Twitter" },
    { icon: faGithub, href: "https://github.com/wlfyzz", ariaLabel: "GitHub" },
    { icon: faDiscord, href: "https://potatonodes.com/discord", ariaLabel: "Discord" },
    { icon: faSpotify, href: "https://open.spotify.com/user/317z66iim4mtbr6brs22y3fkuitm?si=fae99502182848cc", ariaLabel: "Spotify" }
  ]

  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4">
      <div className="space-y-4 mb-4">
        {sidebarItems.slice(0, 2).map((item, index) => (
          <div key={index}>
            <SidebarItem {...item} />
          </div>
        ))}
      </div>
      <Separator className="bg-gray-700 w-8 my-4" />
      <div className="flex-grow" />
      <div className="space-y-4 mb-4">
        {sidebarItems.slice(2).map((item, index) => (
          <div key={index + 2}>
            <SidebarItem {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}