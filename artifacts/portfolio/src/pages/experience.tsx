import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import { EXPERIENCE } from "@workspace/portfolio-data";

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Experience</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A track record of building reliable, high-impact systems across cloud, AI, and full-stack engineering.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

        <div className="space-y-10">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative md:pl-24"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full hidden md:flex items-center justify-center" style={{ transform: 'translateX(-50%)' }}>
                <div className={`w-4 h-4 rounded-full neo-inset ${exp.current ? 'bg-primary' : 'bg-secondary'}`} />
              </div>

              <div className="neo-card p-5 sm:p-8 relative overflow-hidden">
                {exp.current && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-500">Current</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                  <div className="neo-inset p-3 rounded-xl text-primary shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                    <p className="text-primary font-medium">{exp.role}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex gap-3 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="neo-btn px-3 py-1 text-xs font-medium text-foreground cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
