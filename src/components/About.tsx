import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from './TextReveal';

const stats = [
  { number: '1+', label: 'Years Experience' },
  { number: '10+', label: 'Projects Completed' },
  { number: '3+', label: 'Internships' },
  { number: '100k', label: 'Lines of Code' },
];

const skills = [
  'React', 'TypeScript', 'Next.js', 'Node.js',
  'Python', 'Machine Learning', 'Cyber Security', 'Full Stack',
  'Tailwind CSS', 'Git', 'Automation', 'AI Tools',
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-48 z-[10]">
      {/* Subtle accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-accent)]/10 to-transparent ml-6 md:ml-12 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Image column */}
          <motion.div className="lg:col-span-5 relative" style={{ y: imageY }}>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src="images/portrait.jpg"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[var(--color-accent)]/10 -z-10" />

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass-card px-6 py-4"
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-1">Available for</p>
                <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-accent)]">Opportunities</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-light flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              About Me
            </motion.p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8">
              <TextReveal text="DEEPAN A" />
              <br />
              <span className="font-serif italic text-[var(--color-text-secondary)]">
                <TextReveal text="Build the Future With AI " delay={0.3} />
              </span>
            </h2>

            <div className="space-y-8 mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[var(--color-text-secondary)] font-light leading-relaxed text-lg"
              >
                I am an aspiring computer science engineer with a strong foundation in
                machine learning, web development, and full-stack technologies. My
                experience includes internships that honed my skills in implementing
                practical solutions, including automation workflows and project
                development.
              </motion.p>

              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">Education</p>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="border-l border-[var(--color-accent)]/30 pl-4"
                >
                  <p className="text-[var(--color-text-primary)] text-sm tracking-wide">Bachelor of Engineering in Computer Science</p>
                  <p className="text-[var(--color-text-secondary)] text-xs">Sri Sairam Institute of Technology</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="border-l border-[var(--color-accent)]/30 pl-4"
                >
                  <p className="text-[var(--color-text-primary)] text-sm tracking-wide">Diploma in Computer Science and Engineering</p>
                  <p className="text-[var(--color-text-secondary)] text-xs">Sri Sairam Polytechnic College</p>
                </motion.div>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-8 border-t border-b border-[var(--color-border)]"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <p className="text-3xl md:text-4xl font-light text-[var(--color-text-primary)] mb-1 gradient-text-space">
                    {stat.number}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-6">Technologies & Tools</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    whileHover={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                    className="text-xs tracking-[0.15em] uppercase text-[var(--color-text-secondary)] border border-[var(--color-border)] px-4 py-2 hover:bg-[var(--color-accent)]/5 transition-all duration-300 cursor-default glass-card"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
