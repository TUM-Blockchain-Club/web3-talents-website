import Link from "next/link";
import { ApplicationLink } from "./application-link";
import { courseFacts } from "./course-content";

export function ProgramCards() {
  return (
    <div className="web3t-program__carousel">
      <div className="web3t-stack web3t-stack--single">
        <article className="web3t-course-card is-front">
          <div className="web3t-course-card__main">
            <h3>Blockchain Fundamentals 1</h3>
            <p className="web3t-course-card__body">
              Explore 10 topics, from digital trust and Bitcoin to Ethereum,
              DeFi, and crypto taxation, through expert lectures and peer
              teaching.
            </p>
            <div className="web3t-course-card__actions">
              <ApplicationLink className="web3t-btn web3t-btn--primary web3t-btn--sm" />
              <Link
                className="web3t-btn web3t-btn--outline web3t-btn--sm"
                href="/courses"
              >
                Course Details
              </Link>
            </div>
          </div>
          <div className="web3t-course-card__divider" aria-hidden="true" />
          <dl className="web3t-course-card__info">
            <div>
              <dt>DURATION</dt>
              <dd>20 WEEKS</dd>
            </div>
            <div>
              <dt>FORMAT</dt>
              <dd>PEER-LED LEARNING</dd>
            </div>
            <div>
              <dt>START DATE</dt>
              <dd>{courseFacts.start}</dd>
            </div>
            <div>
              <dt>COST</dt>
              <dd>FREE</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  );
}
