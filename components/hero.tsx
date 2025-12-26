import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent font-bold text-md tracking-widest uppercase mb-6">
            Applications Open Now
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 max-w-4xl text-balance">
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
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-10 py-7 text-2xl font-black w-full"
              >
                APPLY NOW!
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Fully Online
          </span>
            <span className="text-border">|</span>
            <span>Jan 28, 2026 – June 17, 2026</span>
          </div>
        </div>
      </section>
  )
}