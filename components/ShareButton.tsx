'use client'

import { useState, useRef, useEffect, FC } from 'react'

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  size?: 'sm' | 'md'
}

interface ShareOption {
  name: string
  icon: string
  color: string
  action: (title: string, text: string, url: string) => void
}

const shareOptions: ShareOption[] = [
  {
    name: 'Twitter',
    icon: '𝕏',
    color: 'hover:bg-gray-700',
    action: (title, text, url) => {
      const tweetText = encodeURIComponent(`${text} ${url}`)
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
    }
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: 'hover:bg-sky-600',
    action: (title, text, url) => {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    }
  },
  {
    name: 'Copy Link',
    icon: '🔗',
    color: 'hover:bg-solana-purple',
    action: (title, text, url) => {
      navigator.clipboard.writeText(url)
    }
  }
]

export const ShareButton: FC<ShareButtonProps> = ({ title, text, url = typeof window !== 'undefined' ? window.location.href : '', size = 'md' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleShare = async (option: ShareOption) => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

    if (option.name === 'Copy Link') {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      option.action(title, text, shareUrl)
    }

    setIsOpen(false)
  }

  const handleNativeShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl
        })
      } catch {
        setIsOpen(true)
      }
    } else {
      setIsOpen(true)
    }
  }

  const buttonSize = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleNativeShare}
        className={`${buttonSize} rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-solana-green/50 transition-all duration-300`}
        aria-label="Share"
      >
        📤
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-gray-900/95 border border-white/20 backdrop-blur-sm shadow-2xl shadow-black/50 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-white/10">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Share via</p>
          </div>
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 text-left text-white/80 hover:text-white ${option.color} transition-colors duration-200`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium">
                {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShareButton
