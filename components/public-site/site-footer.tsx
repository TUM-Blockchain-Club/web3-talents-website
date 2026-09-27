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
          />
          <p className="web3t-footer__tagline">
            Free. Peer-led. No experience needed.
          </p>
          <UnavailableAction className="web3t-btn web3t-btn--primary web3t-footer__apply">
            Apply Now →
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
              <Link
                href={home || page === "community" ? "/courses" : "/#program"}
              >
                About Us
              </Link>
            </li>
            <li>
              <a href="https://www.tum-blockchain.com">TUM Blockchain Club</a>
            </li>
            <li>
              <Link
                href={
                  home
                    ? "/community"
                    : page === "community"
                      ? "#faq"
                      : "/community#faq"
                }
              >
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <div className="web3t-footer__social">
          <a href="https://www.tum-blockchain.com" aria-label="LinkedIn">
            <img
              src="/assets/social-linkedin.svg"
              alt=""
              className="web3t-footer__linkedin"
            />
          </a>
          <a
            className="web3t-footer__contact"
            href="https://www.tum-blockchain.com"
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
