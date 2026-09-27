import Link from "next/link";
import { SpeakerCard, TestimonialCard } from "./cards";
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
        <p className="web3t-hero__sub">
          Free. Peer-led. For every skill level.
        </p>
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
          Our 20 Week Online Program
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
          Our courses are build on a peer teaching style to ensure a thourough
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
                In small <strong>peer groups</strong>, you research, discuss and
                prepare a presentation on a subtopic.
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
                You <strong>present your findings</strong> to other groups and
                they teach you theirs.
              </p>
            </div>
          </li>
          <li className="web3t-step web3t-step--4">
            <span className="web3t-step__badge" data-step="4">
              4
            </span>
            <div className="web3t-step__text">
              <h3>Expert Validation</h3>
              <p>
                A <strong>second expert lecture</strong> connects all the pieces
                and deepens your understanding.
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
            Meet Our Speakers
          </h2>
          <p className="web3t-speakers__sub">
            Learn directly from the builders and leaders shaping the Web3
            ecosystem.
          </p>
        </div>
        <Carousel
          className="web3t-speakers__carousel"
          scrollerClassName="web3t-speakers__scroller"
          label="Speaker slider"
        >
          <SpeakerCard
            prefix="web3t-speaker"
            image="/assets/speaker-1.png"
            imageAlt="Dr. David An"
            name={<>Dr. David An</>}
            role={<>Partner</>}
            organization={<>@Dracoon Ventures</>}
            topic={
              <>Topic: &quot;Proof of Work, Mining, and Immutability&quot;</>
            }
          />
          <SpeakerCard
            prefix="web3t-speaker"
            image="/assets/speaker-2.png"
            imageAlt="Jonas Gebele"
            name={<>Jonas Gebele</>}
            role={<>Research Associate</>}
            organization={<>@Technical University of Munich</>}
            topic={<>Topic: &quot;Cryptography and Hashing&quot;</>}
          />
          <SpeakerCard
            prefix="web3t-speaker"
            image="/assets/speaker-3.png"
            imageAlt="David Kurz"
            name={<>David Kurz</>}
            role={<>Business Development</>}
            organization={<>@Bitvavo</>}
            topic={
              <>
                Topic: &quot;Ethereum: The World Computer (Architecture)&quot;
              </>
            }
          />
        </Carousel>
      </div>
    </section>
  );
}

export function CourseValues() {
  return (
    <section className="web3t-values" aria-label="Why choose Web3 Talents">
      <div className="web3t-rail">
        <h2 className="web3t-h2 web3t-values__title">
          For every course we ensure
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
                Earn a recognised certificate on completion to showcase your
                Web3 skills.
              </p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--speakers"
            tabIndex={0}
          >
            <h3>Top Tier Speakers</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Learn directly from industry experts and founders shaping the
                Web3 ecosystem.
              </p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--authentic"
            tabIndex={0}
          >
            <h3>Authentic Learning</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Hands-on, peer-led sessions built around real understanding, not
                memorisation.
              </p>
            </div>
          </article>
          <article
            className="web3t-value-card web3t-value-card--entrepreneurial"
            tabIndex={0}
          >
            <h3>Fast &amp; Entrepreneurial</h3>
            <span className="web3t-value-card__icon" aria-hidden="true"></span>
            <div className="web3t-value-card__reveal">
              <p>
                Move quickly from fundamentals to building and shipping your own
                ideas.
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
            avatar="/assets/testimonial-avatar-1.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            avatar="/assets/testimonial-avatar-2.png"
            attribution={<>Course Participant, Cohort 2</>}
          >
            &ldquo;The group research format was useful because it made me go
            deeper into one topic instead of only listening passively.
            Presenting it to others also helped me understand where I still had
            gaps.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            avatar="/assets/testimonial-avatar-3.png"
            attribution={<>Course Participant, Cohort 2</>}
          >
            &ldquo;The group research format was useful because it made me go
            deeper into one topic instead of only listening passively.
            Presenting it to others also helped me understand where I still had
            gaps.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            avatar="/assets/testimonial-avatar-4.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-testimonial"
            avatar="/assets/testimonial-avatar-5.png"
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
