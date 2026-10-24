import { ApplicationLink } from "./application-link";
import { TestimonialCard } from "./cards";
import {
  PreviousSpeakerCards,
  previousSpeakersNote,
} from "./previous-speakers";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AccordionItem, AccordionGroup, ExpandAll } from "./accordion";
import { CourseTabs, CourseTab, CoursePanel } from "./course-tabs";
import { CourseArtwork } from "./course-artwork";
import { CourseStructure } from "./course-structure";
import {
  courseFacts,
  curriculum,
  applicationDetails,
  participationDetails,
} from "./course-content";

export function CourseHero() {
  return (
    <section className="web3t-course-hero" aria-labelledby="web3t-course-title">
      <div className="web3t-course-hero__meta">
        <span className="web3t-course-hero__date">
          Start date: {courseFacts.start}
        </span>
      </div>
      <h1 id="web3t-course-title" className="web3t-course-hero__title">
        Blockchain
        <br />
        Fundamentals 1
      </h1>
      <p className="web3t-course-hero__badge">Free · 20 weeks</p>
      <p className="web3t-course-hero__desc">
        Blockchain Fundamentals 1 is a free, 20-week program combining expert
        lectures, small-group research, and peer teaching across 10 topics. Join
        us online on Tuesdays, starting {courseFacts.start}.
      </p>
      <p className="web3t-course-hero__desc">
        Application deadline: {courseFacts.deadline}. Acceptance announcements:{" "}
        {courseFacts.decisions}.
      </p>
      <div className="web3t-course-hero__actions">
        <ApplicationLink className="web3t-btn web3t-btn--primary web3t-course-hero__apply" />
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
        From digital trust and Bitcoin to smart contracts, DeFi, and crypto
        taxation: build your understanding one topic at a time.
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
          <h3 className="web3t-course-about__description-heading">
            How you’ll learn
          </h3>
          <p className="web3t-course-about__desc">
            Lecture weeks and presentation weeks alternate. An industry expert
            introduces a topic in a live lecture with Q&amp;A. In{" "}
            <strong>small peer groups of three,</strong> you research one of
            four subtopics and prepare a
            <strong> 10–15-minute presentation.</strong> The following week, you
            teach your subtopic to other groups and learn from theirs — the
            jigsaw learning model. A new topic begins at the next lecture
            session.
          </p>
          <h3 className="web3t-course-about__description-heading">
            Sessions &amp; participation
          </h3>
          <p className="web3t-course-about__desc">
            Sessions last <strong>1.5 hours</strong> and take place online on{" "}
            <strong>Tuesdays.</strong> Teams rotate during the program so you
            can work with more peers. Use Moodle for materials and assignments,
            and Zoom for meetings; recordings and additional learning resources
            are provided. Cameras are required during sessions.
          </p>
          <h3 className="web3t-course-about__description-heading">
            Preparing your presentations
          </h3>
          <p className="web3t-course-about__desc">
            For each presentation, create an original diagram, timeline, or
            comparison table, and use primary sources such as whitepapers and
            developer documentation. Set aside additional time outside sessions
            for research and preparation.
          </p>
          <CourseStructure />
        </CoursePanel>
        <CoursePanel tab="curriculum">
          <AccordionGroup
            itemIds={curriculum.map((_, i) => `course-accordion-${i + 1}`)}
          >
            <p className="web3t-course-about__expand">
              <ExpandAll />
            </p>
            <ul className="web3t-course-about__phases">
              {curriculum.map(({ title, topics }, i) => (
                <AccordionItem
                  key={title}
                  itemId={`course-accordion-${i + 1}`}
                  as="li"
                  className="web3t-course-phase"
                  headClassName="web3t-course-phase__head"
                  bodyClassName="web3t-course-phase__body"
                  heading={
                    <>
                      <span className="web3t-course-phase__name">{title}</span>
                      <span
                        className="web3t-course-phase__chev"
                        aria-hidden="true"
                      />
                    </>
                  }
                >
                  {topics.map(([topic, description]) => (
                    <p key={topic}>
                      <strong>{topic}</strong>
                      <br />
                      {description}
                    </p>
                  ))}
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
              ["How much time is required?", participationDetails],
              ["How do I apply?", applicationDetails],
              [
                "What time are the sessions?",
                "Sessions take place on Tuesdays and last 1.5 hours. The planned start is between 5:00 and 5:30 PM; the exact time and timezone will be confirmed. The first session is December 1, 2026. Holiday-break dates and the final calendar will be shared separately.",
              ],
              [
                "Will I receive a certificate?",
                "Eligible participants receive a PDF and NFT certificate after the cohort. Detailed participation and points requirements will be confirmed before the program begins.",
              ],
            ].map(([question, answer], i) => (
              <AccordionItem
                key={`course-faq-${i}`}
                itemId={`course-accordion-${i + curriculum.length + 1}`}
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
        Previous speakers
      </h2>
      <p className="web3t-course-speakers__note">{previousSpeakersNote}</p>
      <div className="web3t-course-speakers__grid">
        <PreviousSpeakerCards prefix="web3t-course-speaker" />
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

      <main id="main-content" tabIndex={-1}>
        <div className="web3t-course__top">
          <CourseArtwork />

          <CourseHero />

          <CourseInformation />
        </div>

        <div className="web3t-course__lower">
          <div className="web3t-course__starfield" aria-hidden="true"></div>
          <span className="web3t-course__line" aria-hidden="true"></span>

          <CourseSpeakers />

          <StudentReviews />
        </div>
      </main>
      <SiteFooter page="course" />
    </div>
  );
}
