import { useRef, useState, useMemo, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

// The 3D Background Component
const Contact3DBackground = () => {
  const particles = useMemo(() => {
    const symbols = ['?', '@', '✉', '💬', '//', '#'];
    const colors = ['#0ea5e9', '#a855f7', '#f59e0b', '#10b981'];

    return Array.from({ length: 25 }).map(() => ({
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: (Math.random() - 0.5) * 20, 
      y: (Math.random() - 0.5) * 20, 
      z: (Math.random() - 0.5) * 10 - 5, 
      speed: Math.random() * 1.5 + 0.5,
      scale: Math.random() * 1 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
    }));
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={2} floatIntensity={3}>
          <Text
            position={[p.x, p.y, p.z]}
            rotation={p.rotation}
            fontSize={p.scale}
            color={p.color}
            fillOpacity={0.15} 
            outlineWidth={0.02}
            outlineColor={p.color}
            outlineOpacity={0.3}
          >
            {p.symbol}
          </Text>
        </Float>
      ))}
    </group>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const serviceID = "service_ihy0n5k";
  const templateID = "template_1dh9lri";
  const publicKey = "1pPyjsRd00OsXgV84";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setStatusMessage(null);

    if (formRef.current) {
      emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
        .then(() => {
          setStatusMessage("Message sent successfully! I will get back to you soon.");
          formRef.current?.reset(); 
        })
        .catch((error) => {
          console.error(error);
          setStatusMessage("Something went wrong. Please try again later.");
        })
        .finally(() => {
          setIsSubmitting(false); 
        });
    }
  };

  return (
    // bg-base-bg is applied here so it hides the Hero background behind it
    <section id="contact" className="relative w-full py-32 px-6 flex flex-col items-center border-t border-surface overflow-hidden bg-base-bg">
      
      {/* The 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
          <Contact3DBackground />
        </Canvas>
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-2xl w-full text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-main mb-6">
          Let's Connect
        </h2>
        <p className="text-text-muted text-lg mb-8">
          Currently open for Internship opportunities in Software Development, AI and Data Science. 
          Send me a message and let's build something incredible.
        </p>

        {/* TEXT-ONLY SOCIAL LINKS */}
        <div className="flex items-center justify-center gap-6 text-sm font-bold tracking-widest uppercase">
          <a 
            href="https://www.linkedin.com/in/towhid-raihan-6bb535188" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-muted hover:text-text-main transition-colors border-b border-transparent hover:border-text-main pb-1"
          >
            LinkedIn
          </a>
          <span className="text-surface-hover">/</span>
          <a 
            href="https://github.com/towhidxraihan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-text-muted hover:text-text-main transition-colors border-b border-transparent hover:border-text-main pb-1"
          >
            GitHub
          </a>
        </div>
      </div>

      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="relative z-10 w-full max-w-xl flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-text-muted uppercase tracking-wider">Name</label>
          <input 
            type="text" 
            name="from_name" 
            required 
            className="w-full bg-surface/50 backdrop-blur-md border border-surface-hover rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-text-muted uppercase tracking-wider">Email</label>
          <input 
            type="email" 
            name="from_email" 
            required 
            className="w-full bg-surface/50 backdrop-blur-md border border-surface-hover rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-text-muted uppercase tracking-wider">Message</label>
          <textarea 
            name="message" 
            required 
            rows={5}
            className="w-full bg-surface/50 backdrop-blur-md border border-surface-hover rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="How can I help you?"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="w-full mt-2 bg-text-main text-base-bg font-bold py-4 rounded-lg hover:bg-text-muted transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {statusMessage && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center text-sm font-medium ${statusMessage.includes("successfully") ? "text-accent" : "text-red-500"}`}
          >
            {statusMessage}
          </motion.p>
        )}
      </form>
    </section>
  );
};

export default Contact;