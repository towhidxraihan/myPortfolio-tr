import { motion } from 'motion/react';
import { projects } from '../utils/data';

const Projects = () => {
  return (
    <section id="projects" className="relative w-full py-32 px-6 flex justify-center border-b border-surface">
      <div className="max-w-5xl w-full flex flex-col">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-text-muted mb-4">
            My Projects
          </h2>
          <h3 className="text-3xl md:text-10xl font-semibold text-text-main tracking-tight">
            Area under development. Check back later for all project links and source code updates!
          </h3>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              // As a featured project (ThermalUK), it must span both columns on large screens
              className={`group relative flex flex-col justify-between p-8 rounded-2xl border border-surface-hover bg-surface/10 hover:bg-surface/30 transition-colors ${
                project.featured ? "md:col-span-2 md:flex-row md:items-center gap-8" : "gap-6"
              }`}
            >
              <div className="flex-1">
                {project.featured && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-base-bg bg-accent rounded-full">
                    Flagship Project
                  </span>
                )}
                <h4 className="text-2xl font-bold text-text-main mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium border border-surface-hover rounded-full text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className={`flex gap-4 ${project.featured ? "md:flex-col" : "items-center"}`}>
                <a href={project.live} className="px-5 py-2 text-sm font-semibold bg-text-main text-base-bg rounded-full hover:bg-text-muted transition-colors text-center">
                  Live Demo
                </a>
                <a href={project.github} className="px-5 py-2 text-sm font-semibold border border-surface-hover text-text-main rounded-full hover:bg-surface transition-colors text-center">
                  Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
