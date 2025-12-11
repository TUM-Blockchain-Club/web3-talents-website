import { GraduationCap, Briefcase, Sparkles } from "lucide-react"

export function ParticipantTypes() {
  const types = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Eager to specialize in blockchain and Web3 technologies",
    },
    {
      icon: Briefcase,
      title: "Industry Professionals",
      description: "Looking to pivot or upskill into the decentralized space",
    },
    {
      icon: Sparkles,
      title: "Interested Minds",
      description: "With a passion for technology and innovation",
    },
  ]

  return (
    <section id="participants" className="py-24 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">Diversity is Key</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Who Are We Looking For?</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          We are looking for a vibrant mix of participants to create the best possible learning environment.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {types.map((type) => (
            <div
              key={type.title}
              className="p-6 rounded-xl border border-border bg-background hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <type.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{type.title}</h3>
              <p className="text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-12 max-w-2xl">
          We believe the best growth happens when people of different backgrounds—from developers to finance
          experts—learn from one another.
        </p>
      </div>
    </section>
  )
}
