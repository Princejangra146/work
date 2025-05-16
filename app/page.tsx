"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Figma, ArrowRight, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import AnimatedBackground from "./components/animated-background"
import TextAnimation from "./components/text-animation"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Scroll progress animation
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["hero", "projects", "designs", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Calculate parallax effect for hero elements
  const calculateParallax = (strength = 50) => {
    if (!heroRef.current) return { x: 0, y: 0 }

    const heroRect = heroRef.current.getBoundingClientRect()
    const centerX = heroRect.left + heroRect.width / 2
    const centerY = heroRect.top + heroRect.height / 2

    const x = (mousePosition.x - centerX) / strength
    const y = (mousePosition.y - centerY) / strength

    return { x, y }
  }

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Basic E-commerce platform with React, Node.js, MongoDB, Express,it have all the functionality that a e-commerce platform should have",
      image: "/pammo.jpeg",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://e-commerce-eight-theta.vercel.app/",
    },
    {
      id: 2,
      title: "Georilla",
      description: "AI-Powered Geo-Location Based Attendance System",
      image: "/georilla.jpeg",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://georilla-vert.vercel.app/",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website with modern animations and dark theme",
      image: "/portfolio.png",
      tags: ["Next.js", "Three.js", "Tailwind CSS"],
      link: "https://portfolio-suvp.vercel.app/",
    },
  ]

  // Sample design data
  const designs = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "UI/UX design for an e-commerce platform",
      image: "/e-commerce.jpeg",
      link: "https://drive.google.com/drive/folders/1lSBcuVDzXgSJEK_2ISMbaY9Owq8Z7mA5?usp=sharing",
    },
    {
      id: 2,
      title: "Car Service Booking App",
      description: "UI/UX design for a car service booking app",
      image: "/car app.jpeg",
      link: "https://drive.google.com/drive/folders/1lSBcuVDzXgSJEK_2ISMbaY9Owq8Z7mA5?usp=sharing",
    },
    {
      id: 3,
      title: "Landing Page/Poster",
      description: "UI design for landing page/poster ",
      image: "/A4 - 1 (1).png",
      link: "https://drive.google.com/drive/folders/1lSBcuVDzXgSJEK_2ISMbaY9Owq8Z7mA5?usp=sharing",
    },
    {
      id: 4,
      title: "Restaurant Menu Design",
      description: "UI design for restaurant menu",
      image: "/rm.jpeg",
      link: "https://drive.google.com/drive/folders/1lSBcuVDzXgSJEK_2ISMbaY9Owq8Z7mA5?usp=sharing",
    },
    {
      id: 5,
      title: "Dashboard Design",
      description: "UI design for dashboard",
      image: "/dashboard.jpeg",
      link: "https://drive.google.com/drive/folders/1lSBcuVDzXgSJEK_2ISMbaY9Owq8Z7mA5?usp=sharing",
    }
  ]

  // Calculate parallax effect
  const parallax = calculateParallax()

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-50" style={{ scaleX, transformOrigin: "0%" }} />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: scrollY > 50 ? "rgba(0, 0, 0, 0.8)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        }}
      >
        <motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
          Prince Jangra
        </motion.div>
        <div className="hidden md:flex space-x-8">
          {["hero", "projects", "designs", "contact"].map((section) => (
            <motion.button
              key={section}
              className={`text-sm uppercase tracking-wider ${
                activeSection === section ? "text-white" : "text-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection(section)}
            >
              {section === "hero" ? "Home" : section}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden"
      >
        {/* Animated background */}
        <AnimatedBackground />

        {/* Glowing orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(100, 100, 255, 0.15), transparent 70%)",
              left: "20%",
              top: "30%",
              filter: "blur(60px)",
              transform: `translate(${parallax.x * -1.5}px, ${parallax.y * -1.5}px)`,
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(255, 100, 100, 0.1), transparent 70%)",
              right: "20%",
              bottom: "20%",
              filter: "blur(80px)",
              transform: `translate(${parallax.x * 1.2}px, ${parallax.y * 1.2}px)`,
            }}
          />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`h-line-${i}`}
              className="absolute h-px bg-gray-500 w-full"
              style={{ top: `${(i + 1) * 10}%` }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="absolute w-px bg-gray-500 h-full"
              style={{ left: `${(i + 1) * 10}%` }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="z-10 text-center max-w-3xl relative">
          {/* Animated badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="px-4 py-2 rounded-full border border-gray-700 bg-gray-900 bg-opacity-80 text-sm"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 15px rgba(255, 255, 255, 0.3)",
                  "0 0 0 rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-gray-400">Available for work</span>
            </motion.div>
          </motion.div>

          {/* Main heading with animated text */}
          <div className="mb-6">
            <TextAnimation
              text="Creative Developer & Designer"
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              delay={300}
            />
          </div>

          {/* Subtitle with animated text */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
            }}
          >
            I build exceptional digital experiences that live at the intersection of design and technology
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gray-200"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="border border-white text-white px-8 py-3 rounded-full text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-white bg-opacity-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Tech stack icons */}
          <motion.div
            className="mt-16 flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "N" },
              { name: "Figma", icon: <Figma size={24} /> },
              { name: "TypeScript", icon: "TS" },
              { name: "Framer", icon: "M" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-2"
                  whileHover={{
                    backgroundColor: "#333",
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                  }}
                  style={{
                    transform: `translate(${parallax.x * 0.1 * (index - 2)}px, ${parallax.y * 0.1 * (index - 2)}px)`,
                  }}
                >
                  {typeof tech.icon === "string" ? <div className="text-2xl">{tech.icon}</div> : tech.icon}
                </motion.div>
                <span className="text-xs text-gray-400">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronDown size={32} onClick={() => scrollToSection("projects")} className="cursor-pointer" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen py-20 px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-purple-900 opacity-10 filter blur-[100px]"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-blue-900 opacity-10 filter blur-[120px]"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`projects-h-line-${i}`}
              className="absolute h-px bg-gray-500 w-full"
              style={{ top: `${(i + 1) * 20}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`projects-v-line-${i}`}
              className="absolute w-px bg-gray-500 h-full"
              style={{ left: `${(i + 1) * 20}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <motion.span
                className="inline-block px-3 py-1 text-sm bg-white bg-opacity-10 rounded-full mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                My Work
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-white"></div>
            </div>

            <motion.div
              className="mt-6 md:mt-0 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {["All", "Web", "Mobile", "UI/UX"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm ${
                    category === "All" ? "bg-white text-black" : "bg-gray-800 text-white hover:bg-gray-700"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-gray-900 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>

                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(1).map((tag) => (
                      <span key={tag} className="bg-gray-800 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                    <Link
                      href={project.link}
                      className="flex items-center text-white group-hover:text-white transition-colors"
                    >
                      <span className="mr-2">View Project</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </Link>

                    <motion.button
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                    >
                      <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Figma Designs Section */}
      <section
        id="designs"
        className="min-h-screen py-20 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-pink-900 opacity-10 filter blur-[150px]"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-indigo-900 opacity-10 filter blur-[120px]"></div>

        {/* Decorative shapes */}
        <motion.div
          className="absolute top-40 right-[10%] w-20 h-20 border-2 border-gray-700 rounded-full opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-40 left-[10%] w-32 h-32 border-2 border-gray-700 opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <motion.span
              className="inline-block px-3 py-1 text-sm bg-white bg-opacity-10 rounded-full mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Figma size={14} className="inline mr-2" />
              UI/UX Design
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Figma Designs</h2>
            <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              Explore my UI/UX design projects created in Figma. These designs showcase my approach to creating
              intuitive, visually appealing, and user-centered digital experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((design, index) => (
              <motion.div
                key={design.id}
                className="group relative bg-gray-900 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs">
                      Design
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{design.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{design.description}</p>

                  <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                    <Link
                      href={design.link}
                      className="flex items-center text-white group-hover:text-white transition-colors"
                    >
                      <span className="mr-2">View Design</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </Link>

                    <motion.button
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                    >
                      <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Design process section */}
          <motion.div
            className="mt-20 bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">My Design Process</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Research",
                  description: "Understanding user needs and business goals through research and analysis.",
                  icon: "🔍",
                },
                {
                  step: "02",
                  title: "Wireframing",
                  description: "Creating the structural foundation and information architecture.",
                  icon: "📐",
                },
                {
                  step: "03",
                  title: "Visual Design",
                  description: "Crafting beautiful, intuitive interfaces with attention to detail.",
                  icon: "🎨",
                },
                {
                  step: "04",
                  title: "Prototyping",
                  description: "Building interactive prototypes to test and refine the experience.",
                  icon: "⚙️",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-sm text-gray-400 mb-2">Step {item.step}</div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>

                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6H38.5M38.5 6L33.5 1M38.5 6L33.5 11" stroke="white" strokeOpacity="0.3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-6 bg-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gray-800 filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gray-800 filter blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-white mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg">
                I'm currently available for freelance work and full-time positions. If you have a project that needs
                creative solutions or want to discuss potential collaborations, feel free to reach out through any of
                these channels.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <motion.a
                  href="mailto:princejangra146@gmail.com"
                  className="flex items-center gap-3 px-6 py-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)" }}
                >
                  <Mail size={24} className="text-white" />
                  <span>Email Me</span>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/prince-jangra-6079a0209/"
                  className="flex items-center gap-3 px-6 py-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)" }}
                >
                  <Linkedin size={24} className="text-white" />
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  href="https://github.com/Princejangra146"
                  className="flex items-center gap-3 px-6 py-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)" }}
                >
                  <Github size={24} className="text-white" />
                  <span>GitHub</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-white opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-white opacity-20"></div>

              <div className="bg-gray-900 p-8 rounded-2xl h-full">
                <h3 className="text-2xl font-bold mb-6">Download Resume</h3>
                <p className="text-gray-300 mb-8">
                  Get a comprehensive overview of my skills, experience, and qualifications by downloading my resume.
                </p>

                <motion.a
                  href="/Resume.pdf"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText size={24} />
                  Download CV
                </motion.a>

                <div className="mt-8 pt-8 border-t border-gray-800">
                  <h4 className="text-lg font-semibold mb-4">Current Availability</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Available for new projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.div className="text-xl font-bold mb-4 md:mb-0" whileHover={{ scale: 1.05 }}>
            Prince Jangra
          </motion.div>
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} All Rights Reserved</div>
        </div>
      </footer>
    </div>
  )
}
