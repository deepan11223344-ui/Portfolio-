import { motion } from 'framer-motion';

const showcaseItems = [
  {
    type: 'highlight',
    title: 'Performance\nSupervision',
    span: false,
  },
  {
    type: 'text',
    title: 'for',
    subtitle: 'Developers',
    extra: '&',
    extra2: 'Designers',
    span: false,
  },
  {
    type: 'feature',
    title: 'Scroll-Driven\nAnimations',
    description: 'Every scroll tells a story. Precise, smooth, like orbiting through space.',
    span: false,
  },
  {
    type: 'feature',
    title: 'Cursor Tracking',
    description: 'Follow, respond, adapt. Like gravity pulling celestial bodies.',
    span: false,
  },
  {
    type: 'metric',
    value: '60fps',
    label: 'Smooth Animation',
    span: false,
  },
  {
    type: 'feature',
    title: 'Ultra Optimized',
    description: 'Zero layout shifts. Minimal re-renders. Maximum stellar impact.',
    span: false,
  },
  {
    type: 'metric',
    value: '<5kb',
    label: 'Bundle Size',
    span: false,
  },
  {
    type: 'feature',
    title: 'Position Sticky?\nOf course',
    description: 'Complex layouts made as effortless as zero gravity.',
    span: false,
  },
];

export default function Showcase() {
  return (
    <section className="relative py-32 md:py-48 section-glow">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#c8a96e] text-sm tracking-[0.3em] uppercase mb-4 font-light flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            What I <span className="font-serif italic gradient-text-space">Deliver</span>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="masonry-item"
            >
              <div
                className={`glass-card p-8 group ${
                  item.type === 'highlight' ? 'min-h-[200px]' : ''
                } ${item.type === 'metric' ? 'min-h-[180px]' : ''}`}
              >
                {item.type === 'highlight' && (
                  <div className="flex flex-col justify-between h-full min-h-[150px]">
                    <div className="w-8 h-8 rounded-full border border-[#c8a96e]/30 flex items-center justify-center mb-6 relative">
                      <div className="w-2 h-2 rounded-full bg-[#c8a96e]/60" />
                      <div className="absolute inset-0 rounded-full bg-[#c8a96e]/5 animate-ping" style={{ animationDuration: '4s' }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light whitespace-pre-line leading-tight group-hover:text-[#c8a96e] transition-colors duration-500">
                      {item.title}
                    </h3>
                  </div>
                )}

                {item.type === 'text' && (
                  <div className="flex flex-wrap items-center gap-3 py-4">
                    <span className="text-[#555] text-sm tracking-[0.2em] uppercase">{item.title}</span>
                    <span className="text-2xl font-light text-[#f0f0f0]">{item.subtitle}</span>
                    <span className="text-[#c8a96e] text-2xl font-serif italic">{item.extra}</span>
                    <span className="text-2xl font-light text-[#f0f0f0]">{item.extra2}</span>
                  </div>
                )}

                {item.type === 'feature' && (
                  <div>
                    <h3 className="text-lg font-light whitespace-pre-line mb-3 group-hover:text-[#c8a96e] transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#555] font-light leading-relaxed group-hover:text-[#7a8aaa] transition-colors">
                      {item.description}
                    </p>
                  </div>
                )}

                {item.type === 'metric' && (
                  <div className="flex flex-col justify-center items-center text-center min-h-[120px]">
                    <span className="text-4xl md:text-5xl font-light gradient-text-space mb-2">{item.value}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#555]">{item.label}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
