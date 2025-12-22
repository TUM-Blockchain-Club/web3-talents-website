import Link from "next/link"

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

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground/60">Powered by TUM Blockchain Club</p>
        </div>
      </footer>
  )
}