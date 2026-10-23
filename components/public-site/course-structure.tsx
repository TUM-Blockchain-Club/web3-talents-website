import { courseFacts } from "./course-content";

export function CourseStructure() {
  return (
    <div className="web3t-courses web3t-course-structure">
      <section
        className="web3t-co-structure"
        aria-labelledby="web3t-co-structure-title"
      >
        <div className="web3t-rail">
          <div className="web3t-co-structure__head">
            <h3 id="web3t-co-structure-title" className="web3t-h2">
              How the learning cycle works
            </h3>
            <p className="web3t-co-structure__sub">
              {courseFacts.schedule}. Lecture and presentation weeks alternate.
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
                  <span className="web3t-co-scard__label">LECTURE WEEK</span>
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
                  Each topic spans two weeks: an expert lecture, then peer
                  presentations. The cycle repeats across 10 topics.
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
                      Work in a team of three to research one of four subtopics.
                      Prepare a 10–15-minute presentation with an original
                      diagram, timeline, or comparison table, using primary
                      sources.
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
                        PRESENTATION WEEK
                      </span>
                    </div>
                    <p className="web3t-co-scard__heading">
                      <img
                        src="/assets/icon-teach.svg"
                        alt=""
                        className="web3t-co-scard__icon"
                      />
                      Group Teaching
                    </p>

                    <ol className="web3t-co-scard__list">
                      <li>
                        Specialist groups teach their subtopics to each other —
                        you present your findings and learn theirs, piecing
                        together the full picture through peer-to-peer teaching.
                      </li>
                      <li>
                        The following week, a new lecture from an expert speaker
                        introduces the next topic and starts the next cycle.
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
                  The next topic starts again at{" "}
                  <span className="web3t-co-loopback__step">Step 1</span> — a
                  fresh subtopic each round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
