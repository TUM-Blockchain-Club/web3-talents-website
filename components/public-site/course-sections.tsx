import Link from "next/link";
import { UnavailableAction } from "./unavailable-action";
import { SpeakerCard, TestimonialCard } from "./cards";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AccordionItem, AccordionGroup, ExpandAll } from "./accordion";
import { CourseTabs, CourseTab, CoursePanel } from "./course-tabs";

export function CourseHero() {
  return (
    <section className="web3t-course-hero" aria-labelledby="web3t-course-title">
      <nav className="web3t-course-hero__breadcrumb" aria-label="Breadcrumb">
        <Link href="/courses">All Courses</Link>
        <span>&gt;&nbsp; Blockchain Fundamentals</span>
      </nav>
      <div className="web3t-course-hero__meta">
        <span className="web3t-course-hero__date">
          <span
            className="web3t-course-hero__calendar"
            aria-hidden="true"
          ></span>
          Next cohort coming soon
        </span>
        <span className="web3t-course-hero__chips">
          <span className="web3t-course-hero__chip">Beginner</span>
          <span className="web3t-course-hero__chip">Online</span>
        </span>
      </div>
      <h1 id="web3t-course-title" className="web3t-course-hero__title">
        Blockchain
        <br />
        Fundamentals
      </h1>
      <p className="web3t-course-hero__badge">Applications coming soon</p>
      <p className="web3t-course-hero__desc">
        Build a strong foundation in blockchain, smart contracts, and Web3
        through a structured 10-week learning experience.
      </p>
      <div className="web3t-course-hero__actions">
        <UnavailableAction className="web3t-btn web3t-btn--primary web3t-course-hero__apply">
          Apply now →
        </UnavailableAction>
        <a className="web3t-btn web3t-btn--outline" href="#students">
          See reviews →
        </a>
      </div>
    </section>
  );
}

export function CourseInformation() {
  return (
    <section className="web3t-course-about" aria-labelledby="web3t-about-title">
      <h2 id="web3t-about-title" className="web3t-course-about__title">
        About Course
      </h2>
      <p className="web3t-course-about__learn">What you&rsquo;ll learn:</p>
      <ul className="web3t-course-about__tags">
        <li className="web3t-course-tag web3t-course-tag--bright">
          Smart Contracts
        </li>
        <li className="web3t-course-tag web3t-course-tag--bright">
          Bitcoin Transactions
        </li>
        <li className="web3t-course-tag">Decentralization &amp; Trust</li>
        <li className="web3t-course-tag">Crypto Wallets</li>
        <li className="web3t-course-tag">Cryptography Basics</li>
        <li className="web3t-course-tag">Ethereum Architecture</li>
      </ul>
      <CourseTabs>
        <div
          className="web3t-course-about__tabs"
          role="tablist"
          aria-label="Course information"
        >
          <CourseTab tab="desc" className="web3t-course-tab">
            Course Description
          </CourseTab>
          <CourseTab tab="curriculum" className="web3t-course-tab">
            Curriculum
          </CourseTab>
          <CourseTab
            tab="faq"
            className="web3t-course-tab web3t-course-tab--faq"
          >
            FAQ
            <span className="web3t-course-tab__help" aria-hidden="true"></span>
          </CourseTab>
        </div>

        <CoursePanel tab="desc">
          <p className="web3t-course-about__desc">
            This 10-week cohort takes you from the fundamentals of cryptography
            and consensus through to smart contracts and the wider Web3 economy.
            Each phase pairs an expert-led lecture with hands-on group work, so
            you learn by building — not just watching.
          </p>
        </CoursePanel>

        <CoursePanel tab="curriculum">
          <AccordionGroup
            itemIds={[
              "course-accordion-1",
              "course-accordion-2",
              "course-accordion-3",
              "course-accordion-4",
              "course-accordion-5",
            ]}
          >
            <p className="web3t-course-about__expand">
              <ExpandAll />
            </p>
            <ul className="web3t-course-about__phases">
              <AccordionItem
                itemId="course-accordion-1"
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__num">Phase 1</span>
                    <span className="web3t-course-phase__name">
                      Cryptography / Keys &amp; Hashing
                    </span>
                    <img
                      className="web3t-course-phase__arrow"
                      src="/assets/icon-arrow-down-1.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>
                  Hashing, keys and digital signatures — the cryptographic
                  primitives that make blockchains trustworthy.
                </p>
              </AccordionItem>
              <AccordionItem
                itemId="course-accordion-2"
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__num">Phase 2</span>
                    <span className="web3t-course-phase__name">
                      The Ledger Architecture
                    </span>
                    <img
                      className="web3t-course-phase__arrow"
                      src="/assets/icon-arrow-down-2.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>
                  How blocks, chains and consensus keep a distributed ledger
                  consistent without a central authority.
                </p>
              </AccordionItem>
              <AccordionItem
                itemId="course-accordion-3"
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__num">Phase 3</span>
                    <span className="web3t-course-phase__name">
                      Securing the State
                    </span>
                    <img
                      className="web3t-course-phase__arrow"
                      src="/assets/icon-arrow-down-3.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>
                  Wallets, transactions and the security practices that protect
                  on-chain state and user funds.
                </p>
              </AccordionItem>
              <AccordionItem
                itemId="course-accordion-4"
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__num">Phase 4</span>
                    <span className="web3t-course-phase__name">
                      The Programmable Layer
                    </span>
                    <img
                      className="web3t-course-phase__arrow"
                      src="/assets/icon-arrow-down-1.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>
                  Smart contracts and the programmable layer — how applications
                  run logic directly on-chain.
                </p>
              </AccordionItem>
              <AccordionItem
                itemId="course-accordion-5"
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__num">Phase 5</span>
                    <span className="web3t-course-phase__name">
                      The New Economy &amp; Future Outlook
                    </span>
                    <img
                      className="web3t-course-phase__arrow web3t-course-phase__arrow--big"
                      src="/assets/icon-arrow-down-4.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>
                  Tokens, DeFi and where the ecosystem is heading — from
                  real-world assets to decentralised identity.
                </p>
              </AccordionItem>
            </ul>
          </AccordionGroup>
        </CoursePanel>

        <CoursePanel tab="faq">
          <ul className="web3t-course-about__phases">
            <AccordionItem
              itemId="course-accordion-6"
              as="li"
              className="web3t-course-phase"
              headClassName="web3t-course-phase__head"
              bodyClassName="web3t-course-phase__body"
              heading={
                <>
                  <span className="web3t-course-phase__name">
                    Do I need prior experience?
                  </span>
                  <span
                    className="web3t-course-phase__chev"
                    aria-hidden="true"
                  ></span>
                </>
              }
            >
              <p>
                No — the course starts from first principles and is designed for
                complete beginners.
              </p>
            </AccordionItem>
            <AccordionItem
              itemId="course-accordion-7"
              as="li"
              className="web3t-course-phase"
              headClassName="web3t-course-phase__head"
              bodyClassName="web3t-course-phase__body"
              heading={
                <>
                  <span className="web3t-course-phase__name">
                    How much time per week should I expect?
                  </span>
                  <span
                    className="web3t-course-phase__chev"
                    aria-hidden="true"
                  ></span>
                </>
              }
            >
              <p>
                Around 3–4 hours: one live session plus some group work and a
                short assignment.
              </p>
            </AccordionItem>
            <AccordionItem
              itemId="course-accordion-8"
              as="li"
              className="web3t-course-phase"
              headClassName="web3t-course-phase__head"
              bodyClassName="web3t-course-phase__body"
              heading={
                <>
                  <span className="web3t-course-phase__name">
                    Is the course really free?
                  </span>
                  <span
                    className="web3t-course-phase__chev"
                    aria-hidden="true"
                  ></span>
                </>
              }
            >
              <p>
                Yes — every cohort is free, thanks to the TUM Blockchain Club
                and our partners.
              </p>
            </AccordionItem>
          </ul>
        </CoursePanel>
      </CourseTabs>
    </section>
  );
}

export function CourseSpeakers() {
  return (
    <section
      className="web3t-course-speakers"
      id="speakers"
      aria-labelledby="web3t-course-speakers-title"
    >
      <h2
        id="web3t-course-speakers-title"
        className="web3t-course-speakers__title"
      >
        Speakers
      </h2>
      <div className="web3t-course-speakers__grid">
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-david-an.png"
          imageAlt="Dr. David An"
          name={<>Dr. David An</>}
          role={<>Partner</>}
          organization={<>@Dragon Ventures</>}
          topic={<>Topic: &quot;Blockchain Fundamentals&quot;</>}
        />
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-2.png"
          imageAlt="Jonas Gebele"
          name={<>Jonas Gebele</>}
          role={<>Research Associate</>}
          organization={<>@Technical University of Munich</>}
          topic={<>Topic: &quot;Cryptography &amp; Hashing&quot;</>}
        />
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-placeholder.svg"
          imageAlt="Andi Schmitt"
          name={<>Andi Schmitt</>}
          role={<>Co-founder</>}
          organization={<>@LightUpKryptos</>}
          topic={
            <>Topic: &quot;Bitcoin Data Structure and Transactions&quot;</>
          }
        />
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-placeholder.svg"
          imageAlt="Profesor Dr. Philip Maume"
          name={<>Profesor Dr. Philip Maume</>}
          role={<>Professor of Law</>}
          organization={<>@Technical University of Munich</>}
          topic={<>Topic: &quot;The Financial Layer: Stablecoins, RWA&quot;</>}
        />
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-placeholder.svg"
          imageAlt="Dr. Christian Ziegler"
          name={<>Dr. Christian Ziegler</>}
          role={<>CTO</>}
          organization={<>@Stealth Startup</>}
          topic={
            <>
              Topic: &quot;Future Outlook: Beyond Finance DePIN Identity &amp;
              DAO&quot;
            </>
          }
        />
        <SpeakerCard
          prefix="web3t-course-speaker"
          image="/assets/speaker-3.png"
          imageAlt="David Kurz"
          name={<>David Kurz</>}
          role={<>Business Development</>}
          organization={<>@Bitvavo</>}
          topic={
            <>Topic: &quot;Ethereum: The World Computer (Architecture)&quot;</>
          }
        />
      </div>
    </section>
  );
}

export function StudentReviews() {
  return (
    <section
      className="web3t-course-students"
      id="students"
      aria-labelledby="web3t-course-students-title"
    >
      <h2
        id="web3t-course-students-title"
        className="web3t-course-students__title"
      >
        Here From the{" "}
        <span className="web3t-course-students__grad">Students</span>
      </h2>
      <div className="web3t-course-students__masonry">
        <div className="web3t-course-students__col">
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue"
            avatar="/assets/testimonial-avatar-1.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--purple"
            avatar="/assets/testimonial-avatar-2.png"
            attribution={<>Course Participant, Cohort 2</>}
          >
            &ldquo;It was a good starting point if you&#039;re curious about
            blockchain but don&#039;t know where to begin. Some topics were
            challenging, but the structure made them manageable. Before joining,
            I had heard about Bitcoin, Ethereum, and DeFi, but I didn&#039;t
            really understand how they connected. The course helped me build a
            clearer mental map of the Web3 ecosystem.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue"
            avatar="/assets/testimonial-avatar-3.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--violet"
            avatar="/assets/testimonial-avatar-6.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
        </div>
        <div className="web3t-course-students__col">
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue web3t-course-quote--noavatar"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I liked that the course didn&#039;t assume everyone already
            knew the terminology. It started with the basics and then slowly
            connected the topics, which made the more technical parts easier to
            understand.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--purple"
            avatar="/assets/testimonial-avatar-4.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--violet"
            avatar="/assets/testimonial-avatar-5.png"
            attribution={<>Course Participant, Cohort 3</>}
          >
            &ldquo;The group research format was useful because it made me go
            deeper into one topic instead of only listening passively.
            Presenting it to others also helped me understand where I still had
            gaps.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue"
            avatar="/assets/testimonial-avatar-1.png"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
        </div>
      </div>
    </section>
  );
}

export function CoursePage() {
  return (
    <div className="web3t web3t-course" id="top">
      <SiteHeader current="courses" />

      <div className="web3t-course__top">
        <div className="web3t-course__cubes" aria-hidden="true"></div>

        <CourseHero />

        <CourseInformation />
      </div>

      <div className="web3t-course__lower">
        <div className="web3t-course__starfield" aria-hidden="true"></div>
        <span className="web3t-course__line" aria-hidden="true"></span>

        <CourseSpeakers />

        <StudentReviews />
      </div>

      <SiteFooter page="course" />
    </div>
  );
}
