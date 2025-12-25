import Link from "next/link"
import { Linkedin } from "lucide-react"

export function Footer() {
  return (
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            Ready to Start?
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Applications are open now!
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Don't miss your chance to join the 2026 batch. Click below to start your application on Tally.
          </p>

          <div className="mb-12">
            <Link
                href="https://tally.so/r/xXV8WG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
            >
              Apply Now!
            </Link>
          </div>

          <div className="flex items-center justify-center mb-8">
            <Link
                href="https://www.linkedin.com/company/web-3-talents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#0A66C2] bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all font-semibold"
            >
              <Linkedin className="w-6 h-6" />
              <span>Follow us on LinkedIn</span>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground/60 flex items-center justify-center gap-2">
            Powered by{" "}
            <Link
                href="https://www.tum-blockchain.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground/10 text-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
            >
              TUM Blockchain Club
            </Link>
          </p>
        </div>
      </footer>
  )
}