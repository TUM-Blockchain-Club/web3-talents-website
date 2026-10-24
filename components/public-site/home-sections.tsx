import Link from "next/link";
import { TestimonialCard } from "./cards";
import {
  PreviousSpeakerCards,
  previousSpeakersNote,
} from "./previous-speakers";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ParticleLogo } from "./particle-logo";
import { Carousel } from "./carousel";
import { ProgramCards } from "./program-cards";
import { courseFacts } from "./course-content";

export function HomeHero() {
  return (
    <section className="web3t-hero" aria-labelledby="web3t-hero-title">
      <ParticleLogo />
      <div className="web3t-rail web3t-hero__inner">
        <p className="web3t-hero__pill">
          Next cohort starts <strong>{courseFacts.start}</strong>
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
          Our Upcoming Program
        </h2>
        <p className="web3t-program__notice">
          <span
            className="web3t-program__notice-icon"
            aria-hidden="true"
          ></span>
          Application deadline: {courseFacts.deadline}
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
          Our courses are built on a peer-teaching approach to ensure a thorough
          understanding of the material.
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
              <h3>Expert Input</h3>
              <p>
                An <strong>industry expert</strong> introduces the topic through
                a live lecture.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--2">
            <span className="web3t-step__badge" data-step="2">
              2
            </span>
            <div className="web3t-step__text">
              <h3>Become a Specialist</h3>
              <p>
                In <strong>teams of three</strong>, you research a subtopic and
                prepare a 10–15-minute presentation.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--3">
            <span className="web3t-step__badge" data-step="3">
              3
            </span>
            <div className="web3t-step__text">
              <h3>Teach your Peers</h3>
              <p>
                The following week, you <strong>present your findings</strong>{" "}
                to other groups and learn from their subtopics.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--4">
            <span className="web3t-step__badge" data-step="4">
              4
            </span>
            <div className="web3t-step__text">
              <h3>Build on What You Learn</h3>
              <p>
                The next <strong>lecture week</strong> introduces a new topic.
                Repeat this cycle across 10 topics in 20 weeks.
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
            Previous speakers
          </h2>
          <p className="web3t-speakers__sub">{previousSpeakersNote}</p>
        </div>
        <Carousel
          className="web3t-speakers__carousel"
          scrollerClassName="web3t-speakers__scroller"
          label="Speaker slider"
        >
          <PreviousSpeakerCards />
        </Carousel>
      </div>
    </section>
  );
}

export function CourseValues() {
  return (
    <section className="web3t-values" aria-label="Why choose Web3 Talents">
      <div className="web3t-rail">
        <h2 className="web3t-h2 web3t-values__title">What to expect</h2>
        <div className="web3t-values__grid">
          <article
            className="web3t-value-card web3t-value-card--certification"
            tabIndex={0}
          >
            <h3>Certification</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Eligible participants receive a PDF and NFT certificate after
                completing the cohort. Detailed eligibility criteria will be
                confirmed before the program begins.
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
              <p>
                Expert-led lectures introduce each topic, with time for
                questions and discussion.
              </p>
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
                Expert lectures, small-group research, and peer teaching help
                you build a thorough understanding of each topic.
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
          label="Testimonial slider"
        >
          <TestimonialCard
            className="web3t-testimonial"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
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

      <main id="main-content" tabIndex={-1}>
        <HomeHero />

        <ProgramSection />

        <LearningSteps />

        <HomeSpeakers />

        <CourseValues />

        <HomeCommunity />
      </main>
      <SiteFooter page="home" />
    </div>
  );
}
