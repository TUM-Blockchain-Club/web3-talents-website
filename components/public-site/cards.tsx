import type { ReactNode } from "react";

// Native images deliberately preserve the exported design's sizing and asset URLs.
export function SpeakerCard({
  prefix = "web3t-speaker",
  image,
  imageAlt,
  name,
  role,
  organization,
  topic,
}: {
  prefix?: "web3t-speaker" | "web3t-course-speaker";
  image: string;
  imageAlt: string;
  name: ReactNode;
  role: ReactNode;
  organization: ReactNode;
  topic: ReactNode;
}) {
  return (
    <article className={prefix}>
      <img className={`${prefix}__photo`} src={image} alt={imageAlt} />
      <h3 className={`${prefix}__name`}>{name}</h3>
      <p className={`${prefix}__role`}>{role}</p>
      <p className={`${prefix}__org`}>{organization}</p>
      <p className={`${prefix}__topic`}>{topic}</p>
    </article>
  );
}

export function TestimonialCard({
  className,
  avatar,
  attribution,
  children,
}: {
  className: string;
  avatar?: string;
  attribution: ReactNode;
  children: ReactNode;
}) {
  const prefix = className.split(" ")[0];
  return (
    <figure
      className={`${className}${avatar ? "" : " web3t-quote--text-only"}`}
    >
      {avatar && <img className={`${prefix}__avatar`} src={avatar} alt="" />}
      <blockquote>
        <p>{children}</p>
        <figcaption>{attribution}</figcaption>
      </blockquote>
    </figure>
  );
}

export function CourseCard({
  title,
  variant,
  level = "COURSE PREVIEW",
  status = "Coming Soon",
  subtitle = "Title and curriculum to be confirmed",
  date = "Dates coming soon",
}: {
  title: ReactNode;
  variant: "lilac" | "blue" | "cyan";
  level?: string;
  status?: string;
  subtitle?: string;
  date?: string;
}) {
  return (
    <article className={`web3t-co-card web3t-co-card--${variant}`}>
      <span className="web3t-co-card__glow" aria-hidden="true" />
      <div className="web3t-co-card__top">
        <p className="web3t-co-card__eyebrow">{level}</p>
        <span className="web3t-co-card__badge">{status}</span>
      </div>
      <h3 className="web3t-co-card__title">{title}</h3>
      <span className="web3t-co-card__underline" aria-hidden="true" />
      <p className="web3t-co-card__sub">{subtitle}</p>
      <hr className="web3t-co-card__divider" />
      <p className="web3t-co-card__date">
        <img
          src="/assets/icon-calendar.svg"
          alt=""
          className="web3t-co-card__cal"
        />
        {date}
      </p>
    </article>
  );
}

export function ClubEventCard({
  title,
  variant,
  children,
}: {
  title: ReactNode;
  variant: "lt" | "rt" | "lb" | "rb";
  children: ReactNode;
}) {
  return (
    <div className={`web3t-cm-piece web3t-cm-piece--${variant}`}>
      <img
        className="web3t-cm-piece__img"
        src={`/assets/puzzle-${variant}.svg`}
        alt=""
        aria-hidden="true"
      />
      <div className="web3t-cm-piece__text">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function DiversityCard({
  title,
  icon,
  children,
}: {
  title: ReactNode;
  icon: string;
  children: ReactNode;
}) {
  return (
    <article className="web3t-cm-dcard">
      {["tl", "tr", "bl", "br"].map((corner) => (
        <span
          key={corner}
          className={`web3t-cm-dcard__c web3t-cm-dcard__c--${corner}`}
        />
      ))}
      <img src={icon} alt="" className="web3t-cm-dcard__icon" />
      <h3 className="web3t-cm-dcard__title">{title}</h3>
      <p className="web3t-cm-dcard__body">{children}</p>
    </article>
  );
}
