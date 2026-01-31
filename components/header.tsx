"use client";
import Link from "next/link"
import { Link as ScrollLink } from 'react-scroll'
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
            <ScrollLink
                to="mission"
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="!text-foreground !border-accent"
                className="cursor-pointer text-muted-foreground border-b-2 border-transparent hover:text-foreground transition-all py-1"
            >
              About
            </ScrollLink>

            <ScrollLink
                to="structure"
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="!text-foreground !border-accent"
                className="cursor-pointer text-muted-foreground border-b-2 border-transparent hover:text-foreground transition-all py-1"
            >
              Structure
            </ScrollLink>

            <ScrollLink
                to="curriculum"
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="!text-foreground !border-accent"
                className="cursor-pointer text-muted-foreground border-b-2 border-transparent hover:text-foreground transition-all py-1"
            >
              Curriculum
            </ScrollLink>

            {/* === SPEAKERS LINK (Moved here) === */}
            <ScrollLink
                to="speakers"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                activeClass="!text-foreground !border-accent"
                className="cursor-pointer text-muted-foreground border-b-2 border-transparent hover:text-foreground transition-all py-1"
            >
              Speakers
            </ScrollLink>

            <ScrollLink
                to="faq"
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="!text-foreground !border-accent"
                className="cursor-pointer text-muted-foreground border-b-2 border-transparent hover:text-foreground transition-all py-1"
            >
              FAQ
            </ScrollLink>

            <Link
                href="https://www.tum-blockchain.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-foreground/30 text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
            >
              TUM Blockchain
            </Link>

          </nav>
        </div>
      </header>
  )
}