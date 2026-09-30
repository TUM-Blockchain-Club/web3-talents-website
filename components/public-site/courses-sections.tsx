import { CourseCard } from "./cards";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Carousel } from "./carousel";

export function CoursesHero() {
  return (
    <section className="web3t-co-hero">
      <div className="web3t-co-hero__glow" aria-hidden="true"></div>
      <div className="web3t-rail">
        <h1 className="web3t-co-hero__title">
          Find your path into <span className="web3t-grad">Web3</span>
        </h1>
        <p className="web3t-co-hero__sub">
          Course information is being finalized. Titles, dates, and requirements
          will be published once confirmed.
        </p>
      </div>
    </section>
  );
}

export function CourseCatalog() {
  return (
    <section className="web3t-co-cardsec" aria-label="Available courses">
      <div className="web3t-rail">
        <Carousel
          className="web3t-co-cards-carousel"
          scrollerClassName="web3t-co-cards"
          label="Courses slider"
        >
          <CourseCard title={<>Course 01</>} variant="lilac" />
          <CourseCard title={<>Course 02</>} variant="blue" />
          <CourseCard title={<>Course 03</>} variant="cyan" />
        </Carousel>
      </div>
    </section>
  );
}

export function CourseStructure() {
  return (
    <section
      className="web3t-co-structure"
      aria-labelledby="web3t-co-structure-title"
    >
      <div className="web3t-rail">
        <div className="web3t-co-structure__head">
          <h2 id="web3t-co-structure-title" className="web3t-h2">
            Program information
          </h2>
          <p className="web3t-co-structure__sub">Details to be announced</p>
        </div>
        <div className="web3t-co-timeline">
          {[
            [
              "Curriculum",
              "Confirmed topics and learning outcomes will be listed here.",
            ],
            [
              "Format",
              "Session format, duration, and workload are to be confirmed.",
            ],
            [
              "Applications",
              "Eligibility and application instructions will be published when available.",
            ],
          ].map(([title, description], i) => (
            <div className="web3t-co-step" key={title}>
              <div className="web3t-co-step__rail">
                <span className="web3t-co-badge">{i + 1}</span>
              </div>
              <div className="web3t-co-scard web3t-co-scard--foundation">
                <p className="web3t-co-scard__heading">{title}</p>
                <p className="web3t-co-scard__body">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoursesPage() {
  return (
    <div className="web3t web3t-courses" id="top">
      <SiteHeader current="courses" />

      <CoursesHero />

      <CourseCatalog />

      <CourseStructure />

      <SiteFooter page="courses" />
    </div>
  );
}
