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

export const speakersNote =
  "Andi Schmitt is confirmed for Topic 1. The other profiles feature speakers from previous cohorts; more upcoming speakers will be announced soon.";

export function SpeakerCards({
  prefix = "web3t-speaker",
}: {
  prefix?: "web3t-speaker" | "web3t-course-speaker";
}) {
  return <>
    <SpeakerCard
      prefix={prefix}
      name="Andi Schmitt"
      image="/speakers/andi.jpeg"
      imageAlt="Andi Schmitt"
      role="Co-founder"
      organization="@LightUpKryptos"
      topic="Topic 1: The Need for Decentralization & Digital Trust"
    />
    {previousSpeakers.map((speaker) => (
    <SpeakerCard
      key={speaker.name}
      {...speaker}
      prefix={prefix}
      imageAlt={speaker.name}
      topic={`Previous topic: "${speaker.topic}"`}
    />
    ))}
  </>;
}
