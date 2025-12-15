import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/black background/small.png"
              alt="Web3 Talents"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
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
