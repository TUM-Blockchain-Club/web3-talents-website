import { BookOpen, Users, Presentation, ArrowDown, RotateCw } from "lucide-react"

export function CourseStructure() {
  return (
    <section id="structure" className="py-24 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            FROM LEARNERS TO TEACHERS
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Course Structure
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent to-accent/20 transform -translate-x-1/2" />

          {/* Week 1 */}
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16">
            <div className="flex-1 md:text-right order-2 md:order-1">
              <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 shadow-xl shadow-accent/5 hover:shadow-accent/10 hover:border-accent/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4 md:justify-end">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent">
                    Week 1
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  Lecture + Assignment
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Establishment of <span className="text-accent font-medium">conceptual foundation</span> through lectures by <span className="text-accent font-medium">expert-speakers</span>. You are given a <span className="text-accent font-medium">practical assignment</span> to build your knowledge foundation in a <span className="text-accent font-medium">subtopic</span>.
                </p>
              </div>
            </div>
            
            {/* Center icon */}
            <div className="relative z-10 order-1 md:order-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/30 rotate-3 hover:rotate-0 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1 order-3 hidden md:block" />
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8 md:mb-16">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Week 2, 4, ... */}
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-16">
            <div className="flex-1 order-2 hidden md:block" />
            
            {/* Center icon */}
            <div className="relative z-10 order-1 md:order-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 -rotate-3 hover:rotate-0 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1 order-2 md:order-3">
              <div className="bg-card/80 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                    Week 2, 4, ...
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors">
                  Processing (Specialist Groups)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Meet peers in smaller <span className="text-blue-400 font-medium">subgroups</span> where everyone <span className="text-blue-400 font-medium">researches</span> and <span className="text-blue-400 font-medium">discusses</span> the same subtopic. The goal is for you to <span className="text-blue-400 font-medium">become an expert</span> on that specific topic and <span className="text-blue-400 font-medium">prepare a presentation</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Cycle indicator */}
          <div className="flex justify-center items-center gap-4 mb-8 md:mb-16">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-emerald-500/10 border border-accent/20">
              <RotateCw className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-sm text-muted-foreground font-medium">Iterative Learning Cycle</span>
              <RotateCw className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
            </div>
          </div>

          {/* Week 3, 5, ... */}
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1 md:text-right order-2 md:order-1">
              <div className="bg-card/80 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 shadow-xl shadow-emerald-500/5 hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4 md:justify-end">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                    Week 3, 5, ...
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-emerald-400 transition-colors">
                  Group Teaching & New Lecture
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-emerald-400 font-medium">Specialist groups teach their subtopics</span> to other groups. You <span className="text-emerald-400 font-medium">present your findings</span> to peers, and they teach you theirs – piecing together the full picture through <span className="text-emerald-400 font-medium">peer-to-peer teaching</span>. After, you receive <span className="text-emerald-400 font-medium">new input</span> through a lecture by an <span className="text-emerald-400 font-medium">expert speaker</span>.
                </p>
              </div>
            </div>
            
            {/* Center icon */}
            <div className="relative z-10 order-1 md:order-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 rotate-3 hover:rotate-0 transition-transform">
                <Presentation className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1 order-3 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
