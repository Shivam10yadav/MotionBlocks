import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaXTwitter, 
  FaDiscord, 
  FaEnvelope, 
  FaArrowUpRightFromSquare, 
  FaCube 
} from 'react-icons/fa6';

const FOOTER_LINKS = {
  components: [
    { name: 'Buttons', href: '#buttons' },
    { name: 'Cards', href: '#cards' },
    { name: 'Hero Sections', href: '#hero-sections' },
    { name: 'Backgrounds', href: '#backgrounds' },
    { name: 'Loaders', href: '#loaders' },
  ],
  resources: [
    { name: 'Documentation', href: '#docs' },
    { name: 'Contribute', href: '#contribute' },
    { name: 'Changelog', href: '#changelog' },
    { name: 'License', href: '#license' },
  ],
  connect: [
    { name: 'GitHub', href: 'https://github.com', icon: FaGithub, external: true },
    { name: 'X (Twitter)', href: 'https://x.com', icon: FaXTwitter, external: true },
    { name: 'Discord', href: 'https://discord.com', icon: FaDiscord, external: true },
    { name: 'Email', href: 'mailto:hello@motionblocks.dev', icon: FaEnvelope, external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D1117] border-t border-[#30363D] text-[#F8FAFC] font-sans antialiased">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Section 1: Branding & Description */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <a href="#" className="inline-flex items-center gap-2.5 group w-fit">
              <div className="p-2 rounded-xl bg-[#161B22] border border-[#30363D] text-[#06B6D4] group-hover:border-[#06B6D4]/50 transition-colors duration-300">
                <FaCube className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#06B6D4] transition-colors duration-300">
                MotionBlocks
              </span>
            </a>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Beautiful animated React components built for modern developers. Copy, customize, and ship faster.
            </p>
          </div>

          {/* Section 2: Components */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase">
              Components
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.components.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Connect */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wider uppercase">
              Connect
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.connect.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                      className="group inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#06B6D4] transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#06B6D4]" />
                      <span>{link.name}</span>
                      {link.external && (
                        <FaArrowUpRightFromSquare className="w-3 h-3 text-[#94A3B8]/60 group-hover:text-[#06B6D4] transition-colors duration-300" />
                      )}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="w-full h-px bg-[#30363D] mb-8" />

        {/* Bottom Bar Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          
          {/* Copyright & Tech Stack Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 MotionBlocks. All rights reserved.</span>
            <span className="hidden sm:inline text-[#30363D]">•</span>
            <span className="text-[#94A3B8]/80">
              Built with React, Tailwind CSS & Framer Motion.
            </span>
          </div>

          {/* GitHub Quick Link */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#94A3B8] hover:text-[#06B6D4] hover:border-[#06B6D4]/40 transition-colors duration-300"
            aria-label="GitHub Repository"
          >
            <FaGithub className="w-4 h-4" />
          </motion.a>

        </div>

      </div>
    </footer>
  );
}