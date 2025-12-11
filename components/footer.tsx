import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">Ready to Start?</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Applications for the upcoming batch will open soon.
        </h2>
        <p className="text-muted-foreground mb-8">
          Join our community and be the first to know when applications open.
        </p>
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
