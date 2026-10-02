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
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = matchMedia("(min-width: 800px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className={`web3t-nav${open ? " is-open" : ""}`}
      data-nav=""
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a
        className="web3t-skip-link"
        href="#main-content"
        onClick={() => setOpen(false)}
      >
        Skip to content
      </a>
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
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="public-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
      </button>
      <div className="web3t-nav__menu" id="public-navigation">
        <nav className="web3t-nav__links" aria-label="Primary">
          <Link
            href={home ? "#top" : "/"}
            aria-current={home ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
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
            <span className="web3t-action-status">Coming soon</span>
          </UnavailableAction>
        </div>
      </div>
    </header>
  );
}
