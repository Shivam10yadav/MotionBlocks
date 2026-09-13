import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";

const PHRASES = [
  "NO NEED TO BE SHY.",
  "LET'S TALK BUSINESS.",
  "DROP US A MESSAGE.",
  "WE ARE READY TO HELP.",
];

export default function ContactPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timer;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 80);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  // Stagger Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Stagger Children Items
  const itemVariants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Letter Hover Twist Effect
  const twistLetter = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      y: -4,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F6F6F4] text-neutral-900 font-sans flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden"
    >
      {/* Top Header Badge */}
      <motion.div
        variants={itemVariants}
        className="flex justify-between items-center w-full"
      >
        <div className="flex items-center gap-2 border border-neutral-300 bg-white/70 backdrop-blur-md rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold tracking-wider uppercase shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          OPEN FOR NEW WORK
        </div>

        <a
          href="mailto:contact@shivam.dev"
          className="hidden sm:inline-flex items-center gap-2 border border-neutral-900 rounded-full px-5 py-1.5 text-xs md:text-sm font-semibold uppercase hover:bg-neutral-900 hover:text-white transition-colors duration-200"
        >
          SAY HI
        </a>
      </motion.div>

      {/* Hero Interactive Typography Section */}
      <div className="my-auto py-12 flex flex-col items-center justify-center text-center">
        <motion.div variants={itemVariants} className="max-w-6xl w-full">
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-none min-h-[140px] sm:min-h-[180px]">
            {/* Animated Arrow */}
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="inline-block"
            >
              →
            </motion.span>

            {/* Interactive Typewritten Letters with Twist Hover Effect */}
            {displayedText.split("").map((char, index) => (
              <motion.span
                key={index}
                whileHover="hover"
                variants={twistLetter}
                className="inline-block cursor-default hover:text-neutral-600 transition-colors duration-150"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            {/* Blinking Cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 md:w-3.5 h-[0.75em] bg-neutral-900 ml-1 rounded-xs"
            />

            {/* Interactive Embedded Media Box */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="inline-block relative mx-2 rounded-xl overflow-hidden border-2 border-neutral-900 shadow-md align-middle cursor-pointer"
            >
              <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 bg-neutral-200">
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZtZGNicHJ0bTkycXkyMnJ0aHZ1NmJvaG80dnE2OXhrcDFwbWRrayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tP213vtzZPPv2eI/giphy.gif"
                  alt="Interactive Element"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-8 md:mt-12">
          <motion.a
            href="mailto:contact@shivam.dev"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full text-sm sm:text-base font-semibold shadow-md transition-all duration-200"
          >
            <span>SEND AN EMAIL</span>
            <FiArrowRight className="text-lg" />
          </motion.a>
        </motion.div>
      </div>

      {/* Footer Grid */}
      <motion.footer
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-neutral-300 text-xs sm:text-sm font-medium"
      >
        {/* Simple Plain Summary */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="font-bold text-base">→ ABOUT</div>
          <p className="text-neutral-700 leading-snug font-normal max-w-[220px]">
            We design and build fast, simple web applications that work smoothly on all devices.
          </p>
        </motion.div>

        {/* Social Icons using react-icons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="block uppercase text-neutral-500 font-semibold tracking-wider text-xs">
            SOCIAL
          </span>
          <div className="flex items-center gap-2.5">
            {[
              { icon: FaGithub, label: "GitHub", href: "https://github.com" },
              { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
              { icon: FaXTwitter, label: "Twitter", href: "https://x.com" },
              { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
              { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white transition-colors duration-200 text-neutral-800"
                >
                  <Icon className="text-base" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Direct Contacts */}
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="block uppercase text-neutral-500 font-semibold tracking-wider text-xs">
            CONTACT
          </span>
          <div className="flex flex-col space-y-1.5 font-semibold text-neutral-900">
            <a
              href="mailto:contact@shivam.dev"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <FiMail className="text-neutral-500" />
              contact@shivam.dev
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <FiPhone className="text-neutral-500" />
              +91 98765 43210
            </a>
          </div>
        </motion.div>

        {/* Indian Location */}
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="block uppercase text-neutral-500 font-semibold tracking-wider text-xs">
            LOCATION
          </span>
          <div className="flex items-start gap-2 font-semibold text-neutral-900">
            <FiMapPin className="text-neutral-500 mt-1 shrink-0" />
            <address className="not-italic leading-relaxed font-normal text-neutral-800">
              Sector 12, Urban Estate
              <br />
              Karnal, Haryana 132001
              <br />
              India
            </address>
          </div>
        </motion.div>
      </motion.footer>
    </motion.div>
  );
}