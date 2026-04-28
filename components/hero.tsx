import { Calendar, Clock, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-24 pb-20 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="mb-8">
            <p className="text-muted-foreground font-bold text-sm tracking-widest uppercase inline-block">
              Applications for second iteration opens soon
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6 text-balance">
            Web3 Talents: Your Fully Online Journey into the Decentralized Future
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            A 20-week program to educate, connect, and build careers in Web3.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <div
                className="inline-flex w-fit max-w-full items-center justify-center bg-accent/12 text-foreground/75 px-8 py-5 rounded-lg text-xl font-bold cursor-not-allowed select-none border border-accent/25 text-center"
            >
              Applications for Second Iteration Open Soon
            </div>
          </div>

          {/* Program Details Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Part-Time Badge */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Format</p>
                <p className="text-foreground font-semibold">Part-Time, Fully Online</p>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Duration</p>
                <p className="text-foreground font-semibold text-sm">Jan 28 - Jun 17, 2026</p>
            </div>
          </div>

            {/* Time Commitment */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Time</p>
                <p className="text-foreground font-semibold">5-7 hours/week</p>
              </div>
                </div>

            {/* Schedule */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Schedule</p>
                <p className="text-foreground font-semibold text-sm">Wed, 5:30-7:30 PM</p>
                <p className="text-xs text-muted-foreground">Berlin Time</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
  )
}
