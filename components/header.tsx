import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent" fill="currentColor">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm leading-tight">WEB3</span>
              <span className="font-semibold text-foreground text-sm leading-tight">TALENTS</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#mission" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            About
          </Link>
          <Link href="#participants" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Program
          </Link>
          <Link href="#structure" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Structure
          </Link>
          <Link href="#curriculum" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Curriculum
          </Link>
        </nav>
      </div>
    </header>
  )
}
