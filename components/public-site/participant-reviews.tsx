import { TestimonialCard } from "./cards";

// Named wording and attribution approved by participants, as confirmed by the site owner.
export const participantReviews = [
  {
    name: "Anna",
    quote: "I joined the course with almost no prior knowledge of Web3, but the structure made it easy to follow. The sessions were beginner-friendly, and the community helped me feel more confident asking questions and exploring the topic further.",
  },
  {
    name: "Anoushk",
    quote: "I liked that the course didn't assume everyone already knew the terminology. It started with the basics and then slowly connected the topics, which made the more technical parts easier to understand.",
  },
  {
    name: "Adam",
    quote: "The group research format was useful because it made me go deeper into one topic instead of only listening passively. Presenting it to others also helped me understand where I still had gaps.",
  },
  {
    name: "Anonymous",
    // Verbatim excerpt from the final-feedback form; no identity was collected.
    quote: "The diversity of the cohort. There was a lot to learn from everyone.",
  },
] as const;

export function ParticipantReview({
  review,
  className,
}: {
  review: (typeof participantReviews)[number];
  className: string;
}) {
  return (
    <TestimonialCard
      className={className}
      attribution={
        <>
          <strong>{review.name}</strong>
          <br />
          Course participant
        </>
      }
    >
      &ldquo;{review.quote}&rdquo;
    </TestimonialCard>
  );
}
