import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Calendar, Tag, Code, ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { projects, Project } from '../data';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id) as Project | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-zinc-50 dark:bg-zinc-950">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">项目未找到</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pt-32 pb-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation back */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">返回项目列表</span>
        </Link>
        
        {/* Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-blue-600 dark:text-blue-400">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-current" />
            <span>{project.date}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-full leading-relaxed">
            {project.intro.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < project.intro.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>
        
        {/* Main Image */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl bg-zinc-200 dark:bg-zinc-800"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Content Details */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <div className="md:col-span-2 space-y-12">
            {project.id !== '10' && (
              <section className="space-y-4">
                <h2 className="text-3xl font-bold">设计背景</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.background.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < project.background.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </section>
            )}
            
            <section className="space-y-4">
              <h2 className="text-3xl font-bold">设计方案</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.solution.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < project.solution.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              
              {project.designImages && project.designImages.length > 0 ? (
                <div className="mt-8 w-full space-y-4 rounded-2xl overflow-hidden">
                  {project.designImages.map((img, i) => (
                    <img 
                      key={i}
                      src={img} 
                      alt={`Design ${i + 1}`} 
                      className="w-full rounded-xl"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <img src={project.image} alt="Detail view" className="w-full h-full object-cover scale-150 origin-top-left" />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <img src={project.image} alt="Detail view" className="w-full h-full object-cover scale-150 origin-bottom-right" />
                  </div>
                </div>
              )}
            </section>
          </div>
          
          <div className="space-y-8 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-fit sticky top-32">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                <Code className="w-4 h-4" /> 技术
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <hr className="border-zinc-200 dark:border-zinc-800" />
            
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                <Tag className="w-4 h-4" /> 角色
              </h3>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {project.role}
              </p>
            </div>
            
            <hr className="border-zinc-200 dark:border-zinc-800" />
            
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                <Calendar className="w-4 h-4" /> 时间
              </h3>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {project.date}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Next Project (Optional Footer) */}
        <div className="mt-32 pt-16 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
          <Link 
            to="/" 
            className="group flex flex-col items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <span className="text-sm font-medium text-zinc-500 tracking-wider uppercase">更多项目</span>
            <div className="flex items-center gap-4 text-3xl font-bold">
              查看更多作品 <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}