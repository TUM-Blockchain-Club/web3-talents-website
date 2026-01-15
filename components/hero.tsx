import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, ArrowRight } from "lucide-react"

export function Hero() {
  return (
      //
      <section className="pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/*LEFT COLUMN: Main Hero Content*/}
          <div className="text-left">
            <p className="text-accent font-bold text-md tracking-widest uppercase mb-6 animate-pulse">
              Applications Open Now
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
              Web3 Talents: Your Fully Online Journey into the Decentralized Future
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl">
              A 20-week program to educate, connect, and build careers in Web3.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                  href="https://tally.so/r/xXV8WG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
              >
                <Button
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-10 py-7 text-2xl font-black w-full transition-all hover:scale-105 shadow-sm cursor-pointer"
                >
                  APPLY NOW!
                </Button>
              </Link>
            </div>

            {/* Program Details Badges */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-8">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Part-Time Program, Fully Online
            </span>
              <span className="text-border">|</span>
              <div className="flex items-center gap-3">
                <span>Jan 28, 2026 – June 17, 2026</span>
                <div className="border border-gray-400 bg-gray-50 text-black font-semibold shadow-sm px-3 py-1 rounded-md text-sm whitespace-nowrap">
                  5 to 7 hours per week expected
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-lg sm:text-xl font-bold text-accent border-l-4 border-accent pl-6 py-2">
                Every Wednesday, 5:30 PM - 7:30 PM (Berlin Time)
              </p>
            </div>
          </div>

          {/*RIGHT COLUMN: Info Session Card (Based on Flyer)*/}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto mt-12 lg:mt-0">
            {/* Purple Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur-2xl opacity-40 animate-pulse" />

            <div className="relative bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-6">
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Info Session
              </span>
                <span className="text-accent font-mono text-sm font-semibold">Live Event</span>
              </div>

              <h3 className="text-3xl font-black text-white mb-3 uppercase leading-tight">
                Web3 Talents <br/> Online Info Session
              </h3>
              <p className="text-muted-foreground mb-8 text-sm">
                <span className="text-accent font-bold">EDUCATE. CONNECT. BUILD.</span><br/>
                Join us to learn everything about the upcoming batch.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <Calendar className="w-6 h-6 text-accent mb-2" />
                  <p className="text-xs text-muted-foreground uppercase font-bold">Date</p>
                  <p className="text-white font-bold text-lg">Jan 16, 2026</p>
                  <p className="text-xs text-muted-foreground">Friday</p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <Clock className="w-6 h-6 text-accent mb-2" />
                  <p className="text-xs text-muted-foreground uppercase font-bold">Time</p>
                  <p className="text-white font-bold text-lg">19:00</p>
                  <p className="text-xs text-muted-foreground">UTC+1 (CET)</p>
                </div>
              </div>

              <Link
                  href="https://luma.com/chl01krp"
                  target="_blank"
                  className="w-full group flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all"
              >
                <Video className="w-5 h-5" />
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>
  )
}