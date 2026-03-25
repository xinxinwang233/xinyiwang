import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Briefcase, Mail, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { profileInfo } from '../data';

export function Navbar() {
  const [active, setActive] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let timeoutId: number;
    
    const resetTimer = () => {
      setActive(true);
      clearTimeout(timeoutId);
      // If we are on home page, hide nav after 3 seconds of inactivity. 
      // If we are on other pages, maybe keep it or hide it too. The request specifically mentions "The home page has a navigation bar..." Let's do it universally.
      timeoutId = window.setTimeout(() => {
        setActive(false);
      }, 3000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Initial trigger
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  const navLinks = [
    { name: '首页', path: '/', icon: Home, hash: '' },
    { name: '关于', path: '/', icon: User, hash: '#about' },
    { name: '项目', path: '/', icon: Briefcase, hash: '#projects' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, path: string) => {
    if (location.pathname === path && hash) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.pathname === path && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      onMouseEnter={() => setActive(true)}
    >
      <motion.div 
        layout
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center overflow-hidden px-2 py-2"
        transition={{ layout: { duration: 0.3, type: "spring", bounce: 0.2 } }}
      >
        <AnimatePresence mode="popLayout">
          {!active ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="px-6 py-2 cursor-pointer text-zinc-800 dark:text-zinc-100 font-medium tracking-wide flex items-center gap-2"
              onClick={() => setActive(true)}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {profileInfo.name}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 sm:gap-2 px-2"
            >
              <div className="mr-4 ml-2 font-semibold text-zinc-900 dark:text-zinc-100 hidden sm:block">{profileInfo.name}</div>
              
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path && 
                  (link.hash ? window.location.hash === link.hash : window.location.hash === '');
                  
                return (
                  <Link
                    key={link.name}
                    to={{ pathname: link.path, hash: link.hash }}
                    onClick={(e) => handleScroll(e, link.hash, link.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800'
                      }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{link.name}</span>
                  </Link>
                );
              })}
              
              <a
                href={`mailto:${profileInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">联系</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}