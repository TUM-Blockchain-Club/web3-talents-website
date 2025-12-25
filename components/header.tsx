"use client";
import Link from "next/link"
import {Link as ScrollLink} from 'react-scroll'
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
                hashSpy={true}
                duration={500}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              About
            </ScrollLink>
            <ScrollLink
                to="participants"
                smooth={true}
                spy={true}
                hashSpy={true}
                duration={500}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-sm">
              Program
            </ScrollLink>
            <ScrollLink
                to="structure"
                smooth={true}
                spy={true}
                hashSpy={true}
                duration={500}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-sm">
              Structure
            </ScrollLink>
            <ScrollLink
                to="curriculum"
                smooth={true}
                spy={true}
                hashSpy={true}
                duration={500}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-sm">
              Curriculum
            </ScrollLink>
            <ScrollLink
                to="faq"
                smooth={true}
                spy={true}
                hashSpy={true}
                duration={500}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors text-sm">
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

            <Link
                href="https://tally.so/r/xXV8WG"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-sm"
            >
              Apply Now!
            </Link>
          </nav>
        </div>
      </header>
  )
}