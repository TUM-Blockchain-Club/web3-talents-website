"use client";
import Link from "next/link";
import { useState } from "react";
import { UnavailableAction } from "./unavailable-action";

const programs = [
  {
    title: "Blockchain Fundamentals",
    description:
      "Learn the foundations of blockchain technology and build the skills to understand, evaluate, and work with decentralized systems.",
    start: "Jan 2027",
  },
  {
    title: "Web3 Applications",
    description:
      "Explore how decentralized technologies are used to build products, communities, and real-world solutions.",
    start: "COMING SOON",
  },
];
export function ProgramCards() {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? selected;
  return (
    <div className="web3t-program__carousel" data-carousel="stack">
      <div className="web3t-stack" onPointerLeave={() => setPreview(null)}>
        {programs.map((program, i) => (
          <article
            key={program.title}
            className={`web3t-course-card ${active === i ? "is-front" : "is-back"}`}
            data-card=""
            tabIndex={active === i ? undefined : 0}
            role={active === i ? undefined : "button"}
            aria-label={active === i ? undefined : `Show ${program.title}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setPreview(i);
            }}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              if (
                event.target === event.currentTarget &&
                ["Enter", " "].includes(event.key)
              ) {
                event.preventDefault();
                setSelected(i);
                setPreview(null);
              }
            }}
          >
            <div className="web3t-course-card__main" inert={active !== i}>
              <h3>{program.title}</h3>
              <p className="web3t-course-card__body">{program.description}</p>
              <div className="web3t-course-card__actions">
                <UnavailableAction className="web3t-btn web3t-btn--primary web3t-btn--sm">
                  Apply Now
                </UnavailableAction>
                <Link
                  className="web3t-btn web3t-btn--outline web3t-btn--sm"
                  href="/courses"
                >
                  Course Details
                </Link>
              </div>
            </div>
            <div className="web3t-course-card__divider" aria-hidden="true" />
            <dl className="web3t-course-card__info" inert={active !== i}>
              <div>
                <dt>DURATION</dt>
                <dd>20 WEEKS</dd>
              </div>
              <div>
                <dt>FORMAT</dt>
                <dd>PEER-LEED · LIVE</dd>
              </div>
              <div>
                <dt>START DATE</dt>
                <dd>{program.start}</dd>
              </div>
              <div>
                <dt>COST</dt>
                <dd>FREE</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
