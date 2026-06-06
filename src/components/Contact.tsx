import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import StringLine from './StringLine';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${formData.name}%0AEmail: ${formData.email}%0AProject Type: ${formData.projectType}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/919150450767?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 section-glow">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] bg-[#a0b4ff] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-light flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              Get in Touch
            </motion.p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8">
              <TextReveal text="Let's create" />
              <br />
              <span className="font-serif italic gradient-text-space">
                <TextReveal text="together" delay={0.3} />
              </span>
            </h2>

            <div className="space-y-6 mb-12">
              <StringLine color="var(--color-border)" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] w-20">Email</span>
                <a href="mailto:deepan11223344@gmail.com" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors string-line pb-1">
                  deepan11223344@gmail.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] w-20">Social</span>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/deepan11223344-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors string-line pb-1"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/deepan-a-35b585281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors string-line pb-1"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
              <StringLine color="var(--color-border)" />
            </div>
          </div>

          {/* Right side - form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 md:p-10"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block mb-3">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] pb-3 text-[var(--color-text-primary)] placeholder-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-light text-lg"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block mb-3">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] pb-3 text-[var(--color-text-primary)] placeholder-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-light text-lg"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block mb-3">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] pb-3 text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-light text-lg appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#040408]">Select a type</option>
                  <option value="web" className="bg-[#040408]">Web Development</option>
                  <option value="app" className="bg-[#040408]">App Design</option>
                  <option value="brand" className="bg-[#040408]">Branding</option>
                  <option value="other" className="bg-[#040408]">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] block mb-3">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] pb-3 text-[var(--color-text-primary)] placeholder-[var(--color-border-light)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-light text-lg resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 border border-[var(--color-accent)]/30 text-sm tracking-[0.2em] uppercase text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] transition-all duration-500 group flex items-center justify-center gap-3"
              >
                <span>Send Message</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
