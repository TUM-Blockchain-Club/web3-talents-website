"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { initPageInteractions } from "../../lib/page-interactions.mjs";
import { UnavailableAction } from "./unavailable-action";

export function SiteHeader({
  home = false,
  current,
}: {
  home?: boolean;
  current?: "courses" | "community";
}) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const root = header.current?.parentElement;
    if (root) return initPageInteractions(root);
  }, []);
  return (
    <header
      ref={header}
      className={`web3t-nav${open ? " is-open" : ""}`}
      data-nav=""
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link
        className="web3t-nav__brand"
        aria-label="Web3 Talents home"
        href={home ? "#top" : "/"}
        onClick={() => setOpen(false)}
      >
        <span className="web3t-nav__blue-symbol" aria-hidden="true" />
        <span className="web3t-nav__wordmark" aria-hidden="true" />
      </Link>
      <button
        ref={toggle}
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
          <Link
            href="/courses"
            aria-current={current === "courses" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Courses
          </Link>
          <Link
            href="/community"
            aria-current={current === "community" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
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
