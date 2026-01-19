import Link from "next/link"
import { Linkedin } from "lucide-react"

export function Footer() {
  return (
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
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