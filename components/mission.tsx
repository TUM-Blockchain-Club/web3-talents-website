import { Lightbulb, ArrowRight } from "lucide-react"

export function Mission() {
  return (
    <section id="mission" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to educate and connect people from all backgrounds to build careers in Web3 and contribute to
                a decentralized, secure, and human-centered digital future.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <ArrowRight className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">A New Chapter</h3>
              <p className="text-muted-foreground leading-relaxed">
                Web3 Talents has found a new home. We send a big thank you to the Frankfurt School Blockchain Center for
                establishing this incredible format. Building on their foundation, we are starting this project with
                full motivation and fresh energy here at the TUM Blockchain Club.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
