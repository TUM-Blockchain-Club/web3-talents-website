import { SpeakerCard } from "./cards";

// One shared historical lineup for the homepage and course page.
const previousSpeakers = [
  {
    name: "Dr. David An",
    image: "/speakers/David TUM Blockchain Conference.png",
    role: "Partner",
    organization: "@Dracoon Ventures",
    topic: "Decentralization & Trust",
  },
  {
    name: "Jonas Gebele",
    image: "/speakers/csm_jonas-gebele_bfc36846d9.webp",
    role: "Research Associate",
    organization: "@Technical University of Munich",
    topic: "Cryptography and Hashing",
  },
  {
    name: "Laurent Castillo",
    image: "/speakers/Laurent.png",
    role: "VP of Architecture",
    organization: "@Ledger",
    topic: "Wallets & Peer-to-Peer Networks & Propagation",
  },
  {
    name: "Andi Schmitt",
    image: "/speakers/andi.jpeg",
    role: "Co-founder",
    organization: "@LightUpKryptos",
    topic: "Bitcoin Data Structure and Transactions",
  },
  {
    name: "Gopi Mehta",
    image: "/speakers/Gopi_yig.png",
    role: "Ex-President, Head of Education Research",
    organization: "@TUM Blockchain Club",
    topic: "Proof of Work, Mining, and Immutability",
  },
  {
    name: "Filip Rezabek",
    image: "/speakers/Filip.jpeg",
    role: "Co-Founder SpaceComputer, Researcher",
    organization: "@SpaceComputer, FlashBots, TUM",
    topic: "Consensus Mechanisms: Beyond Proof-of-Work",
  },
  {
    name: "David Kurz",
    image: "/speakers/davidkurz.jpg",
    role: "Business Development",
    organization: "@Bitvavo",
    topic: "Ethereum: The World Computer (Architecture)",
  },
  {
    name: "Julian Hötzel",
    image: "/speakers/julian.hötzel.png",
    role: "Business Development",
    organization: "@Bitvavo",
    topic: "Ethereum: The World Computer (Architecture)",
  },
  {
    name: "Rafael Kaaz",
    image: "/speakers/rafael.png",
    role: "Head of Operations",
    organization: "@CashLink",
    topic: "Smart Contracts & Applications (The Software)",
  },
  {
    name: "Prof. Dr. Philipp Maume",
    image: "/speakers/maume.jpg",
    role: "Professor of Law",
    organization: "@Technical University of Munich",
    topic: "The Financial Layer: Stablecoins, RWA & DeFi Intro",
  },
  {
    name: "Dr. Christian Ziegler",
    image: "/speakers/cz.jpg",
    role: "CTO",
    organization: "@Stealth Startup",
    topic: "Future Outlook: Beyond Finance (DePIN, Identity & DAO)",
  },
  {
    name: "Felix Hoops",
    image: "/speakers/felix.png",
    role: "PhD Candidate - Self Sovereign Identity",
    organization: "@Technical University of Munich",
    topic: "Future Outlook: Beyond Finance (DePIN, Identity & DAO)",
  },
  {
    name: "Gaurav Sharma",
    image: "/speakers/gs.jpeg",
    role: "CEO/CTO",
    organization: "@IO.net",
    topic: "Future Outlook: Beyond Finance (DePIN, Identity & DAO)",
  },
];

type SpeakerCardsProps = {
  prefix?: "web3t-speaker" | "web3t-course-speaker";
};

export function PlannedSpeakerCards({
  prefix = "web3t-speaker",
}: SpeakerCardsProps) {
  return (
    <SpeakerCard
      prefix={prefix}
      name="Andi Schmitt"
      image="/speakers/andi.jpeg"
      imageAlt="Andi Schmitt"
      role="Co-founder"
      organization="@LightUpKryptos"
      topic="Topic 1: The Need for Decentralization & Digital Trust"
    />
  );
}

export function PastSpeakerCards({
  prefix = "web3t-speaker",
}: SpeakerCardsProps) {
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
