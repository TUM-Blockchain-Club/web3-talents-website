"use client";
import Link from "next/link";
import { useState } from "react";
import { UnavailableAction } from "./unavailable-action";

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`web3t-nav${open ? " is-open" : ""}`} data-nav="">
      <Link
        className="web3t-nav__brand"
        href={home ? "#top" : "/"}
        onClick={() => setOpen(false)}
      >
        <img
          src="/assets/logo.png"
          alt="Web3 Talents"
          className="web3t-nav__logo"
        />
      </Link>
      <button
        className="web3t-nav__burger"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="public-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
      </button>
      <div className="web3t-nav__menu" id="public-navigation">
        <nav className="web3t-nav__links" aria-label="Primary">
          <Link href="/courses" onClick={() => setOpen(false)}>
            Courses
          </Link>
          <Link href="/community" onClick={() => setOpen(false)}>
            Community
          </Link>
        </nav>
        <div className="web3t-nav__actions">
          <UnavailableAction
            className="web3t-btn web3t-btn--ghost"
            kind="login"
          >
            Login
          </UnavailableAction>
        </div>
      </div>
    </header>
  );
}
