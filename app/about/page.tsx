"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const SocialIcon = ({ href, icon: Icon }) => (
  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/80 hover:text-white transition-colors duration-200"
    >
      <Icon className="w-6 h-6" />
    </Link>
  </motion.div>
)

export default function AboutPage() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "visible"
    }
  }, [])

  return (
    <div className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Left Bracket */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-8 text-white/80 text-9xl font-light cursor-default"
        whileHover={{ scale: 1.1 }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.2)",
              "0 0 40px rgba(255,255,255,0.4)",
              "0 0 20px rgba(255,255,255,0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="bg-gradient-to-br from-white via-white/80 to-white/40 bg-clip-text text-transparent"
        >
          {"<"}
        </motion.span>
      </motion.div>

      {/* Right Bracket */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-8 text-white/80 text-9xl font-light cursor-default"
        whileHover={{ scale: 1.1 }}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.2)",
              "0 0 40px rgba(255,255,255,0.4)",
              "0 0 20px rgba(255,255,255,0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="bg-gradient-to-bl from-white via-white/80 to-white/40 bg-clip-text text-transparent"
        >
          {">"}
        </motion.span>
      </motion.div>

      {/* Diagonal Line */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-2 h-[40%] bg-white/20 transform rotate-[15deg]" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-20 flex justify-between items-center">
        {/* Left Content - Atakwn75 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex-1 text-center pr-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            animate={{
              textShadow: [
                "0 0 3px rgba(255,255,255,0.3)",
                "0 0 10px rgba(255,255,255,0.6)",
                "0 0 3px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Atakwn75
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 text-white/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Frontend Developer
          </motion.p>
          <div className="flex justify-center space-x-6">
            <SocialIcon href="https://github.com/atakwn75" icon={Github} />
            <SocialIcon href="https://twitter.com/atakwn75" icon={Twitter} />
            <SocialIcon href="https://instagram.com/atakwn75" icon={Instagram} />
          </div>
        </motion.div>

        {/* Right Content - tikhi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex-1 text-center pl-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4 text-white"
            animate={{
              textShadow: [
                "0 0 3px rgba(255,255,255,0.3)",
                "0 0 10px rgba(255,255,255,0.6)",
                "0 0 3px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            tikhi
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 text-white/60"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Backend Developer
          </motion.p>
          <div className="flex justify-center space-x-6">
            <SocialIcon href="https://github.com/tikhi" icon={Github} />
            <SocialIcon href="https://twitter.com/tikhi" icon={Twitter} />
            <SocialIcon href="https://instagram.com/tikhi" icon={Instagram} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

