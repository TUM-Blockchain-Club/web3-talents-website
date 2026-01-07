import { CourseStructureFlow } from "./course-structure-flow"

export function CourseStructure() {
  // ...existing code...

  return (
    <section id="structure" className="py-24 px-4 bg-card">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <p className="text-accent font-semibold text-base tracking-widest uppercase mb-8 text-center">FROM LEARNERS TO TEACHERS</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-12 text-center">Course Structure</h2>
        <div className="w-full flex flex-col items-center gap-0">
          {/* Week 1 */}
          <div className="relative w-full flex flex-col items-center">
            <div className="bg-gradient-to-r from-accent/80 to-accent/40 rounded-2xl shadow-lg px-8 py-6 mb-2 w-full max-w-md border border-accent">
              <div className="text-lg font-bold text-white mb-1">Week 1</div>
              <div className="text-xl font-semibold text-foreground mb-2">Lecture + Assignment</div>
              <div className="text-base text-muted-foreground">Establishment of <b>conceptual foundation</b> through lectures by <b>expert-speakers</b>. You are given a <b>practical assignment</b> to build your knowledge foundation in a <b>subtopic</b>.</div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-8 bg-accent rounded-full" />
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent" />
            </div>
          </div>
          {/* Week 2, 4, ... */}
          <div className="relative w-full flex flex-col items-center mt-2">
            <div className="bg-gradient-to-r from-accent/80 to-accent/40 rounded-2xl shadow-lg px-8 py-6 mb-2 w-full max-w-md border border-accent">
              <div className="text-lg font-bold text-white mb-1">Week 2, 4, ...</div>
              <div className="text-xl font-semibold text-foreground mb-2">Processing (Specialist Groups)</div>
              <div className="text-base text-muted-foreground">Meet peers in smaller <b>subgroups</b> where everyone <b>researches</b> and <b>discusses</b> the same subtopic derived from the lecture. The goal is for you to <b>become an expert</b> on that specific of the topic and <b>prepare a presentation</b>.</div>
            </div>
            {/* Arrow: more beautiful loop SVG */}
            <div className="flex flex-row items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 relative">
                <svg width="64" height="64" viewBox="0 0 64 64" className="absolute top-0 left-0">
                  <path d="M48 32a16 16 0 1 1-16-16" fill="none" stroke="#7c3aed" strokeWidth="4" />
                  <polygon points="48,32 40,28 40,36" fill="#7c3aed" />
                </svg>
              </div>
              <div className="w-16 h-16 relative">
                <svg width="64" height="64" viewBox="0 0 64 64" className="absolute top-0 left-0">
                  <path d="M16 32a16 16 0 1 0 16-16" fill="none" stroke="#7c3aed" strokeWidth="4" />
                  <polygon points="16,32 24,28 24,36" fill="#7c3aed" />
                </svg>
              </div>
            </div>
          </div>
          {/* Week 3, 5, ... */}
          <div className="relative w-full flex flex-col items-center mt-2">
            <div className="bg-gradient-to-r from-accent/80 to-accent/40 rounded-2xl shadow-lg px-8 py-6 mb-2 w-full max-w-md border border-accent">
              <div className="text-lg font-bold text-white mb-1">Week 3, 5, ...</div>
              <div className="text-xl font-semibold text-foreground mb-2">Group Teaching (Mixed Groups) &amp; Lecture + Assignment</div>
              <div className="text-base text-muted-foreground"><b>The specialist groups teach their subtopics</b> to the others groups. You <b>present your findings</b> to peers, and they teach you theirs – piecing together the full picture through <b>peer-to-peer teaching</b>. After, you receive <b>new input</b> through a lecture by an <b>expert speaker</b>.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
