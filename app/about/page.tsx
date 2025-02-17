"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

const textVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

const SocialIcon = ({ href, icon: Icon, color = "text-gray-800" }) => (
  <motion.div variants={iconVariants}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transform hover:scale-110 transition-transform duration-200"
    >
      <Icon className={`w-8 h-8 ${color === "white" ? "text-white" : color}`} />
    </Link>
  </motion.div>
)

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Diagonal divider with reduced gap */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(0 0, 48% 0, 52% 100%, 0% 100%)",
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-0">
          {/* Left side - White theme */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left p-8 md:p-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent -z-10" />
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h2 variants={textVariants} className="text-5xl md:text-7xl font-bold mb-4 text-black">
                Atakwn75
              </motion.h2>
              <motion.p variants={textVariants} className="text-lg md:text-xl text-gray-800 mb-8 font-light">
                Frontend Developer & UI Designer
              </motion.p>
              <motion.div variants={containerVariants} className="flex justify-center md:justify-start space-x-6">
                <SocialIcon href="https://github.com/atakwn75" icon={Github} />
                <SocialIcon href="https://twitter.com/atakwn75" icon={Twitter} />
                <SocialIcon href="https://instagram.com/atakwn75" icon={Instagram} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Black theme */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right p-8 md:p-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black to-transparent -z-10" />
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h2 variants={textVariants} className="text-5xl md:text-7xl font-bold mb-4 text-white">
                tikhi
              </motion.h2>
              <motion.p variants={textVariants} className="text-lg md:text-xl text-gray-300 mb-8 font-light">
                Backend Developer & System Architect
              </motion.p>
              <motion.div variants={containerVariants} className="flex justify-center md:justify-end space-x-6">
                <SocialIcon href="https://github.com/tikhi" icon={Github} color="white" />
                <SocialIcon href="https://twitter.com/tikhi" icon={Twitter} color="white" />
                <SocialIcon href="https://instagram.com/tikhi" icon={Instagram} color="white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  )
}

