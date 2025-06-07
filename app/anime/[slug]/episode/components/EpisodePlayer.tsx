'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface EpisodePlayerProps {
  videoUrl: string
  thumbnail: string
}

export default function EpisodePlayer({ videoUrl, thumbnail }: EpisodePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [tooltipTime, setTooltipTime] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isBuffering, setIsBuffering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => setIsBuffering(false)
    const handleSeeking = () => setIsBuffering(true)
    const handleSeeked = () => setIsBuffering(false)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('seeking', handleSeeking)
    video.addEventListener('seeked', handleSeeked)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('seeking', handleSeeking)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      if (newMutedState) {
        setVolume(0)
      } else {
        setVolume(videoRef.current.volume)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      setTooltipTime(percent * duration)
      setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setShowTooltip(true)
    }
  }

  const handleSliderMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div 
      ref={playerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        className="w-full aspect-video cursor-pointer"
        onClick={togglePlay}
      />
      
      <AnimatePresence>
        {isBuffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={controlsRef}
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pb-2 pt-8 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <div className="space-y-1 mb-1"> {/* Updated margin-bottom value */}
          <div
            ref={sliderRef}
            className="relative w-full px-1"
            onMouseMove={handleSliderMouseMove}
            onMouseLeave={handleSliderMouseLeave}
          >
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={(value) => handleSeek(value[0])}
              className="w-full"
            />
            {showTooltip && (
              <div 
                className="absolute pointer-events-none bg-black/80 text-white text-xs rounded px-2 py-1"
                style={{ 
                  left: `${tooltipPosition.x}px`, 
                  bottom: '100%', 
                  transform: 'translateX(-50%)' 
                }}
              >
                {formatTime(tooltipTime)}
              </div>
            )}
          </div>
        </div>

        {/* Controls and timestamp */}
        <div className="flex items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={togglePlay} 
                className="h-7 w-7 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full hover:bg-white/20"
              >
                {isPlaying ? 
                  <Pause className="h-full w-full" /> : 
                  <Play className="h-full w-full" />
                }
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSeek(currentTime - 10)} 
                className="h-7 w-7 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full hover:bg-white/20"
              >
                <SkipBack className="h-full w-full" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSeek(currentTime + 10)} 
                className="h-7 w-7 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full hover:bg-white/20"
              >
                <SkipForward className="h-full w-full" />
              </Button>
            </div>
            <span className="text-xs text-white/90 min-w-[85px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center group">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMute}
                className="h-7 w-7 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full hover:bg-white/20"
              >
                {isMuted ? 
                  <VolumeX className="h-full w-full" /> : 
                  <Volume2 className="h-full w-full" />
                }
              </Button>
              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={(value) => handleVolumeChange(value[0])}
                className="w-[60px] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFullscreen}
              className="h-7 w-7 sm:h-9 sm:w-9 p-1 sm:p-2 rounded-full hover:bg-white/20"
            >
              {isFullscreen ? 
                <Minimize className="h-full w-full" /> : 
                <Maximize className="h-full w-full" />
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

