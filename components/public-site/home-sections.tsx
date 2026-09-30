import Link from "next/link";
import { ContentPlaceholder } from "./content-placeholder";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ParticleLogo } from "./particle-logo";
import { Carousel } from "./carousel";
import { ProgramCards } from "./program-cards";

export function HomeHero() {
  return (
    <section className="web3t-hero" aria-labelledby="web3t-hero-title">
      <ParticleLogo />
      <div className="web3t-rail web3t-hero__inner">
        <p className="web3t-hero__pill">
          Next cohort <strong>coming soon</strong>
        </p>
        <h1 id="web3t-hero-title">Your first steps into Web3 start here.</h1>
        <p className="web3t-hero__sub">Learn. Connect. Explore Web3.</p>
        <div className="web3t-hero__actions">
          <Link className="web3t-btn web3t-btn--primary" href="/courses">
            Explore Courses →
          </Link>
          <Link className="web3t-btn web3t-btn--outline" href="/community">
            Join the Community →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProgramSection() {
  return (
    <section
      className="web3t-program"
      id="program"
      aria-labelledby="web3t-program-title"
    >
      <div className="web3t-rail">
        <h2 id="web3t-program-title" className="web3t-h2">
          Our Upcoming Programs
        </h2>
        <p className="web3t-program__notice">
          <span
            className="web3t-program__notice-icon"
            aria-hidden="true"
          ></span>
          New courses and applications coming soon
        </p>
        <ProgramCards />
      </div>
    </section>
  );
}

export function LearningSteps() {
  return (
    <section
      className="web3t-steps"
      id="how"
      aria-labelledby="web3t-steps-title"
    >
      <div className="web3t-rail web3t-steps__head">
        <h2 id="web3t-steps-title" className="web3t-h2">
          How Our Courses Work
        </h2>
        <p className="web3t-steps__sub">
          The program format is being finalized. This section will outline the
          confirmed learning journey.
        </p>
      </div>
      <div className="web3t-steps__canvas">
        <div className="web3t-steps__art" aria-hidden="true"></div>
        <ol className="web3t-steps__list">
          <li className="web3t-step web3t-step--1">
            <span className="web3t-step__badge" data-step="1">
              1
            </span>
            <div className="web3t-step__text">
              <h3>Session format</h3>
              <p>Confirmed session formats will be described here.</p>
            </div>
          </li>
          <li className="web3t-step web3t-step--2">
            <span className="web3t-step__badge" data-step="2">
              2
            </span>
            <div className="web3t-step__text">
              <h3>Learning activities</h3>
              <p>
                Learning activities and participation details will be announced.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--3">
            <span className="web3t-step__badge" data-step="3">
              3
            </span>
            <div className="web3t-step__text">
              <h3>Peer collaboration</h3>
              <p>
                Collaboration opportunities will be shared with the course
                details.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--4">
            <span className="web3t-step__badge" data-step="4">
              4
            </span>
            <div className="web3t-step__text">
              <h3>Next steps</h3>
              <p>
                Program milestones and completion requirements are to be
                confirmed.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function HomeSpeakers() {
  return (
    <section
      className="web3t-speakers"
      id="speakers"
      aria-labelledby="web3t-speakers-title"
    >
      <div className="web3t-rail">
        <div className="web3t-speakers__head">
          <h2 id="web3t-speakers-title" className="web3t-h2">
            Speaker announcements
          </h2>
          <p className="web3t-speakers__sub">
            Confirmed speakers and session details will be published here.
          </p>
        </div>
        <ContentPlaceholder title="Speakers to be announced">
          Names, biographies, and photos will be added once participation is
          confirmed.
        </ContentPlaceholder>
      </div>
    </section>
  );
}

export function CourseValues() {
  return (
    <section className="web3t-values" aria-label="Why choose Web3 Talents">
      <div className="web3t-rail">
        <h2 className="web3t-h2 web3t-values__title">
          Program details to be confirmed
        </h2>
        <div className="web3t-values__grid">
          <article
            className="web3t-value-card web3t-value-card--certification"
            tabIndex={0}
          >
            <h3>Certification</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Certificate availability and requirements will be confirmed with
                each course.
              </p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--speakers"
            tabIndex={0}
          >
            <h3>Speakers</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>Confirmed speaker information will be published here.</p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--authentic"
            tabIndex={0}
          >
            <h3>Learning format</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Session formats and learning activities will be announced with
                the program.
              </p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--entrepreneurial"
            tabIndex={0}
          >
            <h3>Projects</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Project opportunities and requirements will be shared once
                confirmed.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function HomeCommunity() {
  return (
    <section
      className="web3t-community"
      id="community"
      aria-labelledby="web3t-community-title"
    >
      <div className="web3t-rail">
        <h2
          id="web3t-community-title"
          className="web3t-h2 web3t-community__title"
        >
          You don&rsquo;t just get a course. You get a{" "}
          <span className="web3t-grad">community</span>.
        </h2>
        <p className="web3t-community__lead">
          Web3 Talents welcomes everyone, whether you&rsquo;ve never heard of
          blockchain or you&rsquo;re already working in the space as a seasoned
          professional, our teaching platform ensures you&rsquo;ll always have
          something to contribute and something new to discover.
        </p>
        <Carousel
          className="web3t-community__carousel"
          scrollerClassName="web3t-community__scroller"
          label="Community updates"
        >
          <ContentPlaceholder
            className="web3t-testimonial"
            title="Participant feedback"
          >
            Verified feedback will be shared here when available. No
            testimonials are published yet.
          </ContentPlaceholder>
          <ContentPlaceholder
            className="web3t-testimonial"
            title="Community stories"
          >
            Approved community stories and photos will be added here.
          </ContentPlaceholder>
        </Carousel>
        <div className="web3t-community__actions">
          <a className="web3t-btn web3t-btn--primary" href="#how">
            Find out more
          </a>
          <a
            className="web3t-btn web3t-btn--outline"
            href="https://www.tum-blockchain.com"
          >
            Check out TUM Blockchain
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="web3t web3t-home" id="top">
      <SiteHeader home={true} />

      <HomeHero />

      <ProgramSection />

      <LearningSteps />

      <HomeSpeakers />

      <CourseValues />

      <HomeCommunity />

      <SiteFooter page="home" />
    </div>
  );
}
