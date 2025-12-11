import { Calendar, Clock, Globe, BookOpen } from "lucide-react"

export function Curriculum() {
  const facts = [
    { icon: Calendar, label: "Start Date", value: "January 28, 2026" },
    { icon: Calendar, label: "End Date", value: "June 17, 2026" },
    { icon: Clock, label: "Duration", value: "20 Weeks" },
    { icon: Globe, label: "Format", value: "100% Online" },
  ]

  return (
    <section id="curriculum" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">What You'll Learn</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12">Curriculum & Key Facts</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Blockchain Basics + DLT</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The curriculum covers Finance, Cryptography, and foundational Blockchain technology. Full content details
              coming soon.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Topics include consensus mechanisms, smart contracts, DeFi protocols, and real-world blockchain
              applications.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Project Schedule</h3>
            <div className="space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <fact.icon className="w-5 h-5 text-accent" />
                    <span className="text-muted-foreground">{fact.label}</span>
                  </div>
                  <span className={`font-semibold ${fact.label === "Format" ? "text-accent" : "text-foreground"}`}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
