import Link from "next/link";
import { UnavailableAction } from "./unavailable-action";

export function SiteFooter({
  page,
}: {
  page: "home" | "courses" | "course" | "community";
}) {
  const home = page === "home";
  return (
    <footer className="web3t-footer" aria-label="Site footer">
      <div className="web3t-footer__bg" aria-hidden="true" />
      <div className="web3t-footer__inner">
        <div className="web3t-footer__brand">
          <img
            src="/assets/logo.png"
            alt="Web3 Talents"
            className="web3t-footer__logo"
            width={900}
            height={162}
            loading="lazy"
            decoding="async"
          />
          <p className="web3t-footer__tagline">Learn. Connect. Explore Web3.</p>
          <UnavailableAction className="web3t-btn web3t-btn--primary web3t-footer__apply">
            Applications coming soon
          </UnavailableAction>
        </div>
        <nav className="web3t-footer__nav" aria-label="Footer">
          <ul>
            <li>
              <Link href={home ? "#top" : "/"}>Home</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
            <li>
              <Link href={home ? "#speakers" : "/#speakers"}>Speakers</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/community">About Us</Link>
            </li>
            <li>
              <a href="https://www.tum-blockchain.com">TUM Blockchain Club</a>
            </li>
            <li>
              <Link href={page === "community" ? "#faq" : "/community#faq"}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="web3t-footer__social">
          <a
            href="https://www.linkedin.com/company/tum-blockchain-club/"
            aria-label="TUM Blockchain Club on LinkedIn"
          >
            <img
              src="/assets/social-linkedin.svg"
              alt=""
              className="web3t-footer__linkedin"
            />
          </a>
          <a
            className="web3t-footer__contact"
            href="https://forms.tum-blockchain.com/contact"
          >
            Contact Us
          </a>
        </div>
      </div>
      <div className="web3t-footer__bar">
        <span>Powered by</span>{" "}
        <a
          className="web3t-footer__poweredby"
          href="https://www.tum-blockchain.com"
        >
          TUM Blockchain Club
        </a>
      </div>
    </footer>
  );
}
