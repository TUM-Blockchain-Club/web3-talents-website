import Image from "next/image"
import Link from "next/link"

interface Speaker {
  name: string
  role: string
  company: string
  week: string
  topic: string
  image: string
  linkedin?: string
}

export function Speakers() {

  const speakers: Speaker[] = [
    {
      name: "Dr. David An",
      role: "Partner",
      company: "Dracoon Ventures",
      week: "Week 1",
      topic: "Decentralization & Trust",

      image: "/speakers/David TUM Blockchain Conference.png",
      linkedin: "https://de.linkedin.com/in/davidan",
    },
    // Add more speakers here
    {
      name: "Jonas Gebele",
      role: "Research Associate",
      company: "Technical University of Munich",
      week: "Week 2",
      topic: "Cryptography and Hashing",
      image: "/speakers/csm_jonas-gebele_bfc36846d9.webp",
    }
  ]

  return (
      <section id="speakers" className="py-24 px-6 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">Industry Experts</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Meet Our Guest Speakers
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Learn directly from the builders and leaders shaping the Web3 ecosystem.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
                <div
                    key={index}
                    className="group bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all hover:-translate-y-1"
                >
                  {speaker.linkedin ? (
                      <Link href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                        <div className="mb-6 relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors cursor-pointer">
                          <Image
                              src={speaker.image}
                              alt={speaker.name}
                              fill
                              className="object-cover"
                          />
                        </div>
                      </Link>
                  ) : (
                      <div className="mb-6 relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
                        <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                        />
                      </div>
                  )}

                  <div className="text-center">
                    <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded mb-3">
                      {speaker.week}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{speaker.name}</h3>
                    <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    <p className="text-sm font-semibold text-foreground/80 mb-4">@{speaker.company}</p>

                    <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
                      Topic: "{speaker.topic}"
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}