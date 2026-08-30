import { motion } from 'motion/react';
import { skills, education, certifications } from '../utils/data'; // <-- Update your imports

const About = () => {
  return (
    <section id="about" className="relative w-full py-32 px-6 flex justify-center border-b border-surface">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: The Narrative */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
            
        <h2 className="text-sm font-bold tracking-widest uppercase text-text-muted mb-4">
            About Me
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-text-main mb-6 leading-tight">
            Operational discipline meets architectural engineering.
          </h3>
          <p className="text-text-muted text-lg mb-6 leading-relaxed">
            I am a software engineer currently completing my BSc in Computing and IT (Computer Science) at The Open University.
          </p>
          <p className="text-text-muted text-lg leading-relaxed">
            My current focus lies in building full-stack applications, while exploring the intersection of data science and artificial intelligence to create predictive, intelligent platforms.
          </p>
        </motion.div>


        {/* Right Column: Skills & Split Certifications */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          {/* Skills Row */}
          <div className="mb-10">
            <h4 className="text-text-main font-semibold mb-6 text-xl">Skills</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 text-sm font-medium border border-surface-hover bg-surface/50 rounded-full text-text-muted hover:text-text-main hover:border-text-muted transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Formal Education (Pinned) */}
          <div className="mb-8">
            <h4 className="text-text-main font-semibold mb-4 text-xl">Education</h4>
            <ul className="space-y-3">
              {education.map((item, i) => (
                <li key={i} className="flex items-center gap-4 p-4 border border-surface-hover rounded-xl bg-surface/50">
                  <div className={`w-10 h-10 shrink-0 rounded-full bg-surface flex items-center justify-center font-bold text-sm ${item.color}`}>
                    {item.badge}
                  </div>
                  <div>
                    <p className="text-text-main font-medium leading-tight">{item.title}</p>
                    <p className="text-text-muted text-xs mt-1">{item.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications (Scrollable Widget) */}
          <div>
            <h4 className="text-text-main font-semibold mb-4 text-xl">Certifications</h4>
            
            {/* Changed h-64 to h-[360px] to reveal more items instantly */}
            <div className="relative h-[360px] border border-surface-hover rounded-xl bg-surface/50 overflow-hidden">
              
              {/* Gradient Fade Top */}
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-base-bg to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable List container with custom dark-theme scrollbar */}
              <ul 
              data-lenis-prevent="true"
              className="h-full overflow-y-auto p-4 space-y-3 
                [&::-webkit-scrollbar]:w-1.5 
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-surface-hover 
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-text-muted/50"
              >
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface/20 transition-colors">
                    <div className={`w-10 h-10 shrink-0 rounded-full bg-surface flex items-center justify-center font-bold text-sm ${cert.color}`}>
                      {cert.badge}
                    </div>
                    <div>
                      <p className="text-text-main text-sm font-medium leading-tight">{cert.title}</p>
                      <p className="text-text-muted text-xs mt-1">{cert.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Gradient Fade Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-base-bg to-transparent z-10 pointer-events-none" />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;