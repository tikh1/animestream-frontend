import React, { useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'

interface QualitySelectorProps {
  qualities: string[]
  currentQuality: string
  onQualityChange: (quality: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isFullscreen: boolean
}

export function QualitySelector({ 
  qualities, 
  currentQuality, 
  onQualityChange, 
  isOpen, 
  setIsOpen,
  isFullscreen
}: QualitySelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  const handleQualityChange = (quality: string) => {
    onQualityChange(quality)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-40 bg-black/80 text-white border border-gray-700 rounded-md shadow-lg ${isFullscreen ? 'bottom-full mb-2' : 'top-full'}`}
          style={{ zIndex: isFullscreen ? 2147483647 : 1 }}
        >
          {qualities.map((quality) => (
            <button
              key={quality}
              onClick={() => handleQualityChange(quality)}
              className={`block w-full text-left px-4 py-2 text-sm ${quality === currentQuality ? "bg-white/20" : ""} hover:bg-white/30`}
            >
              {quality}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

