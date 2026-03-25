import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion'; // 如果你用的包是 motion/react，请改回 'motion/react'
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router'; // 注意：如果是 react-router-dom 请确保包名正确
import { projects, profileInfo } from '../data';

// 修复 TypeScript 报错：添加 as const 或显式类型定义
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeInOut" } 
  }
};

export function Home() {
  const introRef = useRef(null);
  const projectsRef = useRef(null);
  
  // 这里的类型增加了 '实验性交互设计' 以匹配你的分类
  const [selectedCategory, setSelectedCategory] = useState<'全部' | '交互设计' | '工业设计' | '实验性设计作品'>('全部');

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const interactiveIds = new Set(['1', '2', '3', '4','11']);
  const experimentalIds = new Set(['5', '9', '10']);
  const industrialIds = new Set(['6', '7', '8']);

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === '全部') return true;
    if (selectedCategory === '交互设计') return interactiveIds.has(project.id);
    if (selectedCategory === '工业设计') return industrialIds.has(project.id);
    if (selectedCategory === '实验性设计作品') return experimentalIds.has(project.id);
    return true;
  });

  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });
  const isProjectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-32 pb-24 px-6 md:px-12 lg:px-24">
      
      {/* Hero Section */}
      <motion.section 
        ref={introRef}
        id="about"
        initial="hidden"
        animate={isIntroInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-[70vh] py-12"
      >
        <div className="flex-1 space-y-8 order-2 md:order-1 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-300">
              寻找转正机会
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            你好，我是<br className="hidden md:block"/>
            <span className="text-zinc-400 dark:text-zinc-500">{profileInfo.name}</span>
          </h1>
          
<div className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
  <span>就读于同济大学工业设计硕士，预计毕业设计2027年6月。</span>
  <div className="h-1 m-0 p-0 leading-none"></div>
    <div className="h-1 m-0 p-0 leading-none"></div>
  <span>我专注于交互设计、AI驱动的创新设计以及用户体验设计。曾在西班牙Elisava巴塞罗那设计与工程学院交换学习，擅长使用Figma、AI工具和多种设计软件创造数字体验。</span>
  <div className="h-2 m-0 p-0 leading-none"></div>
  <span>我相信好的设计源于对认真生活的热忱——热爱自然与户外，它赋予我不断破界的勇气；手工艺术的兴趣爱好磨炼了我的专注力、解决问题的敏锐直觉与对细节的极致追求。</span>
</div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              查看作品 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/src/imports/王心怡_简历.pdf" 
              download
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-full font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <Download className="w-4 h-4" />
              下载简历
            </a>
          </div>
          
          <div className="flex items-center gap-6 pt-8 text-zinc-500 justify-center md:justify-start relative">
            <div className="relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profileInfo.email);
                  alert('已复制');
                }}
                onMouseEnter={() => setHoveredIcon('email')}
                onMouseLeave={() => setHoveredIcon(null)}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </button>
              {hoveredIcon === 'email' && (
                <div className="absolute top-full left-0 mt-2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
                  {profileInfo.email}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profileInfo.phone);
                  alert('已复制');
                }}
                onMouseEnter={() => setHoveredIcon('phone')}
                onMouseLeave={() => setHoveredIcon(null)}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Phone className="w-6 h-6" />
              </button>
              {hoveredIcon === 'phone' && (
                <div className="absolute top-full left-0 mt-2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
                  {profileInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-1 order-1 md:order-2 w-full max-w-sm md:max-w-none">
          <motion.div 
            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/20 to-transparent z-10" />
            <img 
              src={profileInfo.photo} 
              alt={profileInfo.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        ref={projectsRef}
        id="projects"
        initial="hidden"
        animate={isProjectsInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-6xl mx-auto pt-32 pb-12"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">设计项目</h2>
<p className="text-zinc-500 text-lg">
  近三年以来，我的设计实践横跨工业设计、交互系统及实验性作品。
  <div className="h-1 m-0 p-0 leading-none"></div>
  我坚信设计的本质是相通的：不断更迭的技术是驱动生产的手段，而设计思维才是创新的内核。我始终坚定跟紧新技术浪潮，并通过设计寻找解决现实复杂问题的解决方案，在团队协作中持续进化设计思维。
</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {['全部', '交互设计', '工业设计', '实验性设计作品'].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white' 
                    : 'bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
  {filteredProjects.map((project) => {
    // 获取项目属性，默认 teamType 为 '团队'
    const teamType = project.teamType || '团队';
    
    return (
      <Link 
        to={`/project/${project.id}`} 
        key={project.id}
        className="group block"
      >
        {/* 图片容器 */}
        <motion.div 
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-6"
        >
          {/* 默认遮罩 */}
          <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors z-10" />
          
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* 图片悬停层 (Hover Overlay) - 已简化：只显示分类和标题 */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-8">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2">
                {project.category}
              </div>
              <h3 className="text-white text-2xl font-bold">{project.title}</h3>
            </div>
          </div>
        </motion.div>
        
        {/* 图片下方的文字信息区域 - 完整保留所有信息 */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 text-zinc-500">
              {/* 最左侧：团队/个人 标签 */}
              <span className="text-zinc-400 text-sm border border-zinc-300 dark:border-zinc-800 rounded-full px-2 py-1 leading-none">
                {teamType}
              </span>
              
              {/* 中间：分类 */}
              <span className="text-sm">{project.category}</span>
              
              {/* 右侧：日期 */}
              <span className="flex items-center gap-1 text-zinc-400 text-sm">
                <Calendar className="w-3 h-3" />
                {project.date}
              </span>
            </div>
          </div>
          
          {/* 右侧：箭头按钮 */}
          <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-all">
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
          </div>
        </div>
      </Link>
    );
  })}
</div>
      </motion.section>
    </div>
  );
}