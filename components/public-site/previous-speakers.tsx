import { SpeakerCard } from "./cards";

// One shared historical lineup for the homepage and course page.
const previousSpeakers = [
  {
    name: "Dr. David An",
    image: "/assets/speaker-1.png",
    role: "Partner",
    organization: "@Dracoon Ventures",
    topic: "Proof of Work, Mining, and Immutability",
  },
  {
    name: "Jonas Gebele",
    image: "/assets/speaker-2.png",
    role: "Research Associate",
    organization: "@Technical University of Munich",
    topic: "Cryptography and Hashing",
  },
  {
    name: "David Kurz",
    image: "/assets/speaker-3.png",
    role: "Business Development",
    organization: "@Bitvavo",
    topic: "Ethereum: The World Computer (Architecture)",
  },
];

export const previousSpeakersNote =
  "Speakers from previous cohorts. The upcoming cohort’s lineup will be announced separately.";

export function PreviousSpeakerCards({
  prefix = "web3t-speaker",
}: {
  prefix?: "web3t-speaker" | "web3t-course-speaker";
}) {
  return previousSpeakers.map((speaker) => (
    <SpeakerCard
      key={speaker.name}
      {...speaker}
      prefix={prefix}
      imageAlt={speaker.name}
      topic={`Previous topic: "${speaker.topic}"`}
    />
  ));
}
