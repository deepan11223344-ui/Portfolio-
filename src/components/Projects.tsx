import { motion } from 'framer-motion';
import StringLine from './StringLine';

const projects = [
  {
    id: 1,
    title: 'Ai Automations',
    category: 'Automation',
    year: '2025',
    image: 'images/project1.jpg',
    description: 'Email Automation: Automatically reads, categorizes, and replies to mails using AI without any manual effort. Bitcoin Prediction: Fetches live crypto data and uses AI to predict Bitcoin price trends and send alerts.',
    tags: ['n8n', 'Make', 'Zapier'],
  },
  {
    id: 2,
    title: 'FULLSTACK DEVELOPER & QA TESTER',
    category: 'Full Stack',
    year: '2025',
    image: 'images/project2.jpg',
    description: 'Developed high-performance web applications with a focus on security and quality assurance testing. Implemented automated testing workflows to ensure robust software delivery.',
    tags: ['React Native', 'UI/UX', 'QA Testing'],
  },
  {
    id: 3,
    title: 'MACHINE LEARNING',
    category: 'AI/ML',
    year: '2024',
    image: 'images/project3.jpg',
    description: 'Demonstrated exemplary professional traits and effectively executed tasks, particularly in the project titled "BITCOIN PRICE PREDICTION USING MACHINE LEARNING".',
    tags: ['Python', 'Scikit-Learn', 'Next.js'],
  },
  {
    id: 4,
    title: 'WEB DEVELOPMENT',
    category: 'Frontend',
    year: '2024',
    image: 'images/project4.jpg',
    description: 'Built responsive and interactive web interfaces using modern frameworks. Focused on creating seamless user experiences with a clean and professional design.',
    tags: ['JavaScript', 'React', 'Tailwind', 'Html'],
  },
];

export default function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-light flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--color-text-primary)]"
            >
              Projects
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-[var(--color-text-muted)] text-sm tracking-[0.15em] uppercase"
          >
            04 Featured
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {index === 0 && <StringLine color="var(--color-border)" />}
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-16 cursor-pointer">
                <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-2' : ''} overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6 }}
                    className="relative aspect-[4/3] overflow-hidden glass-card"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-secondary)]">
                      {project.category}
                    </div>
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/30 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--color-accent)]/0 group-hover:border-[var(--color-accent)]/30 transition-colors duration-500" />
                  </motion.div>
                </div>

                <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-1' : ''} flex flex-col justify-center`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[var(--color-text-muted)] text-xs tracking-[0.2em] font-mono">0{project.id}</span>
                    <span className="w-8 h-[1px] bg-[var(--color-border)]" />
                    <span className="text-[var(--color-text-muted)] text-xs tracking-[0.2em]">{project.year}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-500 text-[var(--color-text-primary)]">
                    {project.title}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] font-light leading-relaxed max-w-lg mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] border border-[var(--color-border)] px-3 py-1.5 group-hover:border-[var(--color-accent)]/20 group-hover:text-[var(--color-text-secondary)] transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    <span className="text-xs tracking-[0.2em] uppercase">View Project</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              <StringLine color="var(--color-border)" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
