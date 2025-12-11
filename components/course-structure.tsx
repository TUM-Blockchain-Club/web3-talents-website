export function CourseStructure() {
  const weeks = [
    {
      week: 1,
      title: "Lecture + Assignment",
      description:
        "You receive the core input through a lecture and are given a practical assignment to build your foundation.",
    },
    {
      week: 2,
      title: "Processing (Specialist Groups)",
      description:
        "You meet peers in smaller subgroups where everyone discusses the same subtopic derived from the lecture. The goal here is to refine your understanding and become an expert on that specific part of the topic.",
    },
    {
      week: 3,
      title: "Group Teaching (Mixed Groups)",
      description:
        "The groups are mixed. You enter a room where each person brings expertise on a different subtopic. You present your findings to your peers, and they teach you theirs—piecing together the full picture through peer-to-peer teaching.",
    },
  ]

  return (
    <section id="structure" className="py-24 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">From Learners to Teachers</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Course Structure</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          The project takes place fully online and follows a unique 3-week cycle designed to turn learners into
          teachers.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {weeks.map((item, index) => (
            <div key={item.week} className="relative">
              <div className="p-6 rounded-xl border border-border bg-background h-full">
                <div className="w-10 h-10 rounded-full bg-accent text-background font-bold flex items-center justify-center mb-4">
                  {item.week}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
              {index < weeks.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 text-accent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
