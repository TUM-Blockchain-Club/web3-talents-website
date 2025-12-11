import { Check } from "lucide-react"

export function Expectations() {
  const expectations = [
    {
      title: "Steep Learning Curve",
      description: "We take an entrepreneurial approach—learning by doing and moving fast.",
    },
    {
      title: "True Engagement",
      description: "Active participation is expected and will be rewarded.",
    },
    {
      title: "Communication Mastery",
      description: "You won't just learn the tech; you will learn how to explain it.",
    },
    {
      title: "Authentic Learning",
      description:
        "We focus on mitigating AI-generated homework. By prioritizing verbal presentations and live interaction, we ensure you build genuine, personal understanding.",
    },
    {
      title: "Top-Tier Speakers",
      description: "Gain insights directly from experts shaping the industry.",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">Challenging & Rewarding</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What Can You Expect?</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          This project is designed to be challenging and rewarding. Here is what you will experience:
        </p>

        <div className="space-y-6">
          {expectations.map((item) => (
            <div key={item.title} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
