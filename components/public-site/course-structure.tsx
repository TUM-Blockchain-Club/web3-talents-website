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
              One topic. Two weeks.
            </h3>
            <p className="web3t-co-structure__sub">
              {courseFacts.schedule}. Research and preparation happen between
              the two sessions.
            </p>
          </div>
          <ol
            className="web3t-co-timeline"
            aria-label="Two-week learning cycle"
          >
            <li className="web3t-co-week web3t-co-step--foundation web3t-co-scard">
              <div className="web3t-co-week__head">
                <span className="web3t-co-pill">Week 1</span>
                <h4>Learn &amp; prepare</h4>
              </div>
              <div className="web3t-co-week__activity">
                <p className="web3t-co-scard__heading">
                  <img src="/assets/icon-lecture.svg" alt="" />
                  Expert lecture
                </p>
                <p className="web3t-co-scard__body">
                  An industry expert introduces the topic in a live lecture with
                  Q&amp;A.
                </p>
              </div>
              <div className="web3t-co-week__activity">
                <p className="web3t-co-scard__heading">
                  <img src="/assets/icon-research.svg" alt="" />
                  Research &amp; prepare
                </p>
                <p className="web3t-co-scard__body">
                  After the lecture, work in a team of three to research one of
                  four subtopics. Prepare a 10–15-minute presentation with an
                  original diagram, timeline, or comparison table, using primary
                  sources.
                </p>
                <p className="web3t-co-week__timing">
                  Between sessions — not a separate week.
                </p>
              </div>
            </li>
            <li className="web3t-co-week web3t-co-step--teach web3t-co-scard">
              <div className="web3t-co-week__head">
                <span className="web3t-co-pill">Week 2</span>
                <h4>Present &amp; exchange</h4>
              </div>
              <div className="web3t-co-week__activity">
                <p className="web3t-co-scard__heading">
                  <img src="/assets/icon-teach.svg" alt="" />
                  Peer teaching
                </p>
                <p className="web3t-co-scard__body">
                  Present your subtopic to other groups and learn from theirs.
                  Together, piece together the full topic through the jigsaw
                  learning model.
                </p>
              </div>
              <p className="web3t-co-week__timing">
                The following week, a new expert lecture begins the next topic.
              </p>
            </li>
          </ol>
          <div className="web3t-co-loopback">
            <img
              src="/assets/icon-loopback.svg"
              alt=""
              className="web3t-co-loopback__icon"
            />
            <p>
              Repeat with the next topic ·{" "}
              <strong>10 topics over 20 weeks.</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
