import Link from "next/link";
import { UnavailableAction } from "./unavailable-action";

export function ProgramCards() {
  return (
    <div className="web3t-program__carousel">
      <div className="web3t-stack web3t-stack--single">
        <article className="web3t-course-card is-front">
          <div className="web3t-course-card__main">
            <h3>Blockchain Fundamentals 1</h3>
            <p className="web3t-course-card__body">
              Course details, topics, and learning outcomes will be published
              once confirmed.
            </p>
            <div className="web3t-course-card__actions">
              <UnavailableAction className="web3t-btn web3t-btn--primary web3t-btn--sm">
                Coming soon
              </UnavailableAction>
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
              <dd>TBD</dd>
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
