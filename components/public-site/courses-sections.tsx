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
          Cohort-based programs from beginner fundamentals to specialised
          tracks. Fully online, free, and peer-led.
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
          <CourseCard title={<>Blockchain Fundamentals</>} variant="lilac" />
          <CourseCard title={<>Web3 Applications</>} variant="blue" />
          <CourseCard title={<>Blockchain and AI</>} variant="cyan" />
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
            Every course follows the same structure
          </h2>
          <p className="web3t-co-structure__sub">
            So you always know what&rsquo;s next
          </p>
        </div>

        <div className="web3t-co-timeline">
          <div className="web3t-co-step web3t-co-step--foundation">
            <div className="web3t-co-step__rail">
              <span className="web3t-co-badge" data-n="1">
                1
              </span>
            </div>
            <div className="web3t-co-scard web3t-co-scard--foundation">
              <div className="web3t-co-scard__tags">
                <span className="web3t-co-pill">Foundation</span>
                <span className="web3t-co-scard__label">AT THE START</span>
              </div>
              <p className="web3t-co-scard__heading">
                <img
                  src="/assets/icon-lecture.svg"
                  alt=""
                  className="web3t-co-scard__icon"
                />
                Lecture + Assignment
              </p>
              <p className="web3t-co-scard__body">
                Build your conceptual foundation through a lecture from expert
                speakers, then apply it with a hands-on assignment in one
                subtopic.
              </p>
            </div>
          </div>

          <div className="web3t-co-cycle">
            <div className="web3t-co-cycle__head">
              <span className="web3t-co-pill web3t-co-pill--cycle">
                PROGRESSIVE LEARNING CYCLE
              </span>
              <p className="web3t-co-cycle__caption">
                Research and teaching alternate, repeating until you&#039;ve
                covered the whole topic.
              </p>
            </div>
            <div className="web3t-co-cycle__body">
              <div className="web3t-co-step web3t-co-step--research">
                <div className="web3t-co-step__rail">
                  <span className="web3t-co-badge" data-n="2">
                    2
                  </span>
                </div>
                <div className="web3t-co-scard web3t-co-scard--research">
                  <div className="web3t-co-scard__tags">
                    <span className="web3t-co-pill">Research</span>
                    <span className="web3t-co-scard__label">
                      IN SPECIALIST GROUPS
                    </span>
                  </div>
                  <p className="web3t-co-scard__heading">
                    <img
                      src="/assets/icon-research.svg"
                      alt=""
                      className="web3t-co-scard__icon"
                    />
                    Processing in Specialist Groups
                  </p>
                  <p className="web3t-co-scard__body">
                    Meet peers in small specialist subgroups. Everyone
                    researches the same subtopic from the lecture, becomes an
                    expert on it, and prepares a presentation.
                  </p>
                </div>
              </div>
              <div className="web3t-co-step web3t-co-step--teach">
                <div className="web3t-co-step__rail">
                  <span className="web3t-co-badge" data-n="3">
                    3
                  </span>
                </div>
                <div className="web3t-co-scard web3t-co-scard--teach">
                  <div className="web3t-co-scard__tags">
                    <span className="web3t-co-pill">Teach</span>
                    <span className="web3t-co-scard__label">
                      PEER-TO-PEER, THEN A NEW LECTURE
                    </span>
                  </div>
                  <p className="web3t-co-scard__heading">
                    <img
                      src="/assets/icon-teach.svg"
                      alt=""
                      className="web3t-co-scard__icon"
                    />
                    Group Teaching + New Lecture
                  </p>

                  <ol className="web3t-co-scard__list">
                    <li>
                      Specialist groups teach their subtopics to each other —
                      you present your findings and learn theirs, piecing
                      together the full picture through peer-to-peer teaching.
                    </li>
                    <li>
                      Then a new lecture from an expert speaker adds fresh input
                      — kicking off the next round of the cycle.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="web3t-co-loopback">
              <img
                src="/assets/icon-loopback.svg"
                alt=""
                className="web3t-co-loopback__icon"
              />
              <p>
                The new lecture loops you back to{" "}
                <span className="web3t-co-loopback__step">Step 2</span> - a
                fresh subtopic each round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoursesPage() {
  return (
    <div className="web3t web3t-courses" id="top">
      <SiteHeader home={false} />

      <CoursesHero />

      <CourseCatalog />

      <CourseStructure />

      <SiteFooter page="courses" />
    </div>
  );
}
