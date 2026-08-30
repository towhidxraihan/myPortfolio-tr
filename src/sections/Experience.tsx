import { motion } from 'motion/react';
import { experience } from '../utils/data';

const Experience = () => {
  return (
    <section id="experience" className="relative w-full py-32 px-6 flex justify-center border-b border-surface">
      <div className="max-w-3xl w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest uppercase text-text-muted mb-4">
            Trajectory
          </h2>
          <h3 className="text-3xl md:text-5xl font-semibold text-text-main tracking-tight">
            Experience & Education.
          </h3>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-surface-hover ml-3 md:ml-4">
          
          {experience.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
            >
              {/* The Timeline Dot */}
              <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                item.highlight ? 'bg-accent shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-surface-hover group-hover:bg-text-muted'
              }`} />

              {/* Content Card */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2 sm:gap-4">
                <h4 className={`text-xl md:text-2xl font-bold ${item.highlight ? 'text-text-main' : 'text-text-muted group-hover:text-text-main transition-colors'}`}>
                  {item.role}
                </h4>
                <span className="text-sm font-medium text-text-muted/70 whitespace-nowrap">
                  {item.date}
                </span>
              </div>
              
              <h5 className="text-lg font-medium text-text-muted mb-4">
                {item.entity}
              </h5>
              
              <p className="text-text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;