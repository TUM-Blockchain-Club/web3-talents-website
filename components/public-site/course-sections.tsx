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
        <span>&gt; Course preview</span>
      </nav>
      <div className="web3t-course-hero__meta">
        <span className="web3t-course-hero__date">Details to be announced</span>
      </div>
      <h1 id="web3t-course-title" className="web3t-course-hero__title">
        Course
        <br />
        preview
      </h1>
      <p className="web3t-course-hero__badge">Placeholder information</p>
      <p className="web3t-course-hero__desc">
        This page is reserved for confirmed course information. The title,
        curriculum, dates, format, and requirements are not yet announced.
      </p>
      <div className="web3t-course-hero__actions">
        <UnavailableAction className="web3t-btn web3t-btn--primary web3t-course-hero__apply">
          Applications unavailable
        </UnavailableAction>
      </div>
    </section>
  );
}

export function CourseInformation() {
  return (
    <section className="web3t-course-about" aria-labelledby="web3t-about-title">
      <h2 id="web3t-about-title" className="web3t-course-about__title">
        Course information
      </h2>
      <p className="web3t-course-about__learn">
        Learning outcomes will be published once confirmed.
      </p>
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
          </CourseTab>
        </div>
        <CoursePanel tab="desc">
          <p className="web3t-course-about__desc">
            The official course description and learning outcomes will appear
            here. This preview does not represent an announced course.
          </p>
        </CoursePanel>
        <CoursePanel tab="curriculum">
          <AccordionGroup
            itemIds={[
              "course-accordion-1",
              "course-accordion-2",
              "course-accordion-3",
            ]}
          >
            <p className="web3t-course-about__expand">
              <ExpandAll />
            </p>
            <ul className="web3t-course-about__phases">
              {["Topics", "Learning activities", "Schedule"].map((title, i) => (
                <AccordionItem
                  key={title}
                  itemId={`course-accordion-${i + 1}`}
                  as="li"
                  className="web3t-course-phase"
                  headClassName="web3t-course-phase__head"
                  bodyClassName="web3t-course-phase__body"
                  heading={
                    <>
                      <span className="web3t-course-phase__name">
                        {title} — to be confirmed
                      </span>
                      <span
                        className="web3t-course-phase__chev"
                        aria-hidden="true"
                      />
                    </>
                  }
                >
                  <p>
                    Confirmed {title.toLowerCase()} will be published with the
                    official course announcement.
                  </p>
                </AccordionItem>
              ))}
            </ul>
          </AccordionGroup>
        </CoursePanel>
        <CoursePanel tab="faq">
          <ul className="web3t-course-about__phases">
            {[
              [
                "Who can join?",
                "Eligibility and prerequisites will be confirmed with the course details.",
              ],
              [
                "How much time is required?",
                "Duration, session times, and workload are to be announced.",
              ],
              [
                "How do I apply?",
                "Application instructions and any fees will be published when confirmed. Applications are not available on this preview.",
              ],
            ].map(([question, answer], i) => (
              <AccordionItem
                key={question}
                itemId={`course-accordion-${i + 4}`}
                as="li"
                className="web3t-course-phase"
                headClassName="web3t-course-phase__head"
                bodyClassName="web3t-course-phase__body"
                heading={
                  <>
                    <span className="web3t-course-phase__name">{question}</span>
                    <span
                      className="web3t-course-phase__chev"
                      aria-hidden="true"
                    />
                  </>
                }
              >
                <p>{answer}</p>
              </AccordionItem>
            ))}
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
        Hear From the{" "}
        <span className="web3t-course-students__grad">Students</span>
      </h2>
      <div className="web3t-course-students__masonry">
        <div className="web3t-course-students__col">
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue"
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--purple"
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
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--violet"
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
            attribution={<>Course Participant, Cohort 1</>}
          >
            &ldquo;I joined the course with almost no prior knowledge of Web3,
            but the structure made it easy to follow. The sessions were
            beginner-friendly, and the community helped me feel more confident
            asking questions and exploring the topic further.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--violet"
            attribution={<>Course Participant, Cohort 3</>}
          >
            &ldquo;The group research format was useful because it made me go
            deeper into one topic instead of only listening passively.
            Presenting it to others also helped me understand where I still had
            gaps.&rdquo;
          </TestimonialCard>
          <TestimonialCard
            className="web3t-course-quote web3t-course-quote--blue"
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
