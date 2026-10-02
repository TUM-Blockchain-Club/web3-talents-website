"use client";
import Link from "next/link";
import { useState } from "react";
import { UnavailableAction } from "./unavailable-action";
import { programPreviewAtPoint } from "../../lib/program-hover.mjs";

const programs = [
  {
    title: "Course 01",
    description:
      "Course title, topics, and learning outcomes will be published once confirmed.",
    start: "TO BE ANNOUNCED",
  },
  {
    title: "Course 02",
    description:
      "Further course information will be added here. This is a placeholder, not an announced program.",
    start: "TO BE ANNOUNCED",
  },
];
export function ProgramCards() {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? selected;
  return (
    <div className="web3t-program__carousel" data-carousel="stack">
      <div
        className="web3t-program-picker"
        role="group"
        aria-label="Choose a program"
      >
        {programs.map((program, i) => (
          <button
            key={program.title}
            type="button"
            aria-pressed={active === i}
            onClick={() => {
              setSelected(i);
              setPreview(null);
            }}
          >
            {program.title}
          </button>
        ))}
      </div>
      <div
        className="web3t-stack"
        onPointerLeave={() => setPreview(null)}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setPreview(
            programPreviewAtPoint({
              x: event.clientX - bounds.left,
              y: event.clientY - bounds.top,
              width: bounds.width,
              height: bounds.height,
              selected,
              pointerType: event.pointerType,
            }),
          );
        }}
      >
        {programs.map((program, i) => (
          <article
            key={program.title}
            className={`web3t-course-card ${active === i ? "is-front" : "is-back"}`}
            data-card=""
            tabIndex={active === i ? undefined : 0}
            role={active === i ? undefined : "button"}
            aria-label={active === i ? undefined : `Show ${program.title}`}
            onClick={() => {
              setSelected(preview ?? i);
              setPreview(null);
            }}
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
                  Coming soon
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
                <dd>TO BE CONFIRMED</dd>
              </div>
              <div>
                <dt>FORMAT</dt>
                <dd>TO BE CONFIRMED</dd>
              </div>
              <div>
                <dt>START DATE</dt>
                <dd>{program.start}</dd>
              </div>
              <div>
                <dt>COST</dt>
                <dd>TO BE CONFIRMED</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
