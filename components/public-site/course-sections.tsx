import Link from "next/link";
import { UnavailableAction } from "./unavailable-action";
import { ContentPlaceholder } from "./content-placeholder";
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
      <ContentPlaceholder title="Speakers to be announced">
        Confirmed names, biographies, and approved photos will be added here.
      </ContentPlaceholder>
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
        Participant feedback
      </h2>
      <ContentPlaceholder title="Verified feedback coming soon">
        No testimonials are published yet. Approved participant feedback will be
        added here when available.
      </ContentPlaceholder>
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
