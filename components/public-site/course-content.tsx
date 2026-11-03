// Public-facing facts from the course team's Notion documents, with the session
// schedule confirmed by the course owner on October 26, 2026.
// Deadline timezone and eligibility thresholds remain unconfirmed.
export const courseFacts = {
  start: "December 2, 2026",
  deadline: "November 8, 2026 at 23:59",
  decisions: "November 22, 2026",
  sessionTime: "Wednesdays at 6 PM Berlin time",
  schedule: "Wednesdays at 6 PM Berlin time · 1.5-hour online sessions",
  applicationUrl: "https://tally.so/r/BE4l9Y",
};

// Full topic plan from the course team's "Fundamentals Course Topics" document.
// Lecturer-only planning notes (speaker selection, sponsor pitch slots) stay
// internal; notes that describe what students will experience are kept.
export type CurriculumPoint = {
  label?: string;
  text: string;
  note?: string;
  points?: CurriculumPoint[];
};

export type CurriculumTopic = {
  number: number;
  weeks: string;
  title: string;
  points: CurriculumPoint[];
};

export type CurriculumPhase = {
  title: string;
  summary: string;
  topics: CurriculumTopic[];
};

export const curriculumIntro =
  "Each topic builds on the ones before it. Lectures connect back to concepts from earlier weeks, so you can recall them, and point ahead to what is still to come.";

export const curriculum: CurriculumPhase[] = [
  {
    title: "Phase 1: Foundational Trust · Weeks 1–4",
    summary:
      "The goal here is to establish the need for blockchain by conceptually solving the double-spending problem, then introducing the mathematical concepts that make it possible.",
    topics: [
      {
        number: 1,
        weeks: "1–2",
        title: "The Need for Decentralization & Digital Trust",
        points: [
          {
            label: "Centralized vs. Decentralized Systems",
            text: "An introduction to centralized and decentralized systems. The problems of centralized systems and the advantages of decentralization.",
          },
          {
            label: "The Double-Spending Problem",
            text: "Why digital money needs a trusted party, and what breaks without one.",
          },
          {
            label: "The Shared Ledger",
            text: "An introduction to the concept of a shared, immutable ledger, with a basic overview of public vs. private ledgers.",
          },
        ],
      },
      {
        number: 2,
        weeks: "3–4",
        title: "Cryptography: Hashing, Keys & Signatures",
        points: [
          {
            label: "Part A (Integrity)",
            text: "Hashing, mathematical trust and one-way functions. How these primitives build the foundation of trust, and how they connect to the bigger picture of blockchain and to Topic 1.",
            note: "Hands-on: see a hash function in action. Change the input and watch how the output changes.",
          },
          {
            label: "Part B (Identity)",
            text: "Basic cryptographic principles (symmetric vs. asymmetric). How public/private key pairs work, and how digital signatures are used for authorization.",
            note: "Explained intuitively, with everyday examples, so no technical background is needed.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase 2: The Ledger Architecture · Weeks 5–8",
    summary:
      "This phase builds the identity layer and then the data layer of the first major blockchain implementation: Bitcoin.",
    topics: [
      {
        number: 3,
        weeks: "5–6",
        title: "Wallets, Peer-to-Peer Networks & Propagation",
        points: [
          {
            label: "Wallets",
            text: "Wallet types (hot/cold, custodial/non-custodial) and key management best practices (MultiSig).",
          },
          {
            label: "The Network",
            text: "Decentralized network communication and node roles (full, light, archival).",
          },
          {
            label: "Propagation",
            text: "Gossip protocols, and how data such as transactions and blocks propagates across the network.",
          },
        ],
      },
      {
        number: 4,
        weeks: "7–8",
        title: "Bitcoin: Data Structure & Transactions",
        points: [
          {
            label: "Block Structure",
            text: "The structure of a Bitcoin block: header and transactions.",
          },
          {
            label: "Transaction Flow",
            text: "Creation, signing, the mempool, and confirmation.",
          },
          {
            label: "UTXO Model",
            text: "How the unspent transaction output model works.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase 3: Securing the State · Weeks 9–12",
    summary:
      "This phase focuses on the mechanisms used to agree on the single, correct history of transactions, and then on what that agreed state can hold once the ledger becomes programmable.",
    topics: [
      {
        number: 5,
        weeks: "9–10",
        title: "Proof-of-Work, Proof-of-Stake & the Blockchain Trilemma",
        points: [
          {
            label: "Recap",
            text: "Why immutability required a costly puzzle, bridging from Topic 4’s UTXO model and block structure.",
          },
          {
            label: "PoW Core Loop",
            text: "Hash-below-target, the nonce, halving, and why scarcity is engineered.",
          },
          {
            label: "The 51% Attack",
            text: "An economic argument, not just a technical one.",
          },
          {
            label: "PoS as an Alternative",
            text: "Bonding capital instead of burning energy, the validator lifecycle, and slashing as the “cost of cheating”.",
          },
          {
            label: "The Blockchain Trilemma",
            text: "The unifying lens: PoW, PoS, DPoS (TRON/EOS) and BFT (Cosmos) plotted on the same triangle.",
          },
        ],
      },
      {
        number: 6,
        weeks: "11–12",
        title: "Architectural Shift: The “World Computer” (Ethereum)",
        points: [
          {
            label: "The Transition",
            text: "From a single-purpose ledger to a general-purpose blockchain.",
          },
          {
            label: "State Machine",
            text: "Moving from “Who has money?” (Bitcoin) to “What is the state of this application?” (Ethereum), and the EVM (Ethereum Virtual Machine) as a shared, singleton state machine.",
          },
          {
            label: "Account Model",
            text: "Why Ethereum uses accounts (like a bank) instead of UTXOs for programmability.",
          },
          {
            label: "EVM Intro",
            text: "The global computer that everyone runs simultaneously.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase 4: The Programmable Layer · Weeks 13–16",
    summary:
      "This phase covers what runs on top of the world computer, smart contracts and tokens, and how to judge the economics of those tokens.",
    topics: [
      {
        number: 7,
        weeks: "13–14",
        title: "Smart Contracts, Gas, Token Standards & Oracles",
        points: [
          {
            label: "Smart Contracts",
            text: "The concept of “Code is Law”.",
          },
          {
            label: "The Fuel (Gas)",
            text: "Why computation costs money (protection against the Halting Problem), and gas limit vs. gas price.",
          },
          {
            label: "Token Standards (The Primitives)",
            text: "The building blocks for assets on Ethereum:",
            points: [
              {
                label: "ERC-20 (Fungible)",
                text: "Creating “currency” or “shares” on top of Ethereum.",
              },
              {
                label: "ERC-721 (Non-Fungible/NFT)",
                text: "Unique identifiers for digital art, certificates, or identity.",
              },
            ],
          },
          {
            label: "Oracles",
            text: "The “walled garden” problem, and how blockchains access off-chain data (e.g. Chainlink) to trigger contracts.",
          },
        ],
      },
      {
        number: 8,
        weeks: "15–16",
        title: "Tokenomics",
        points: [
          {
            label: "Why Tokenomics Matters",
            text: "Tokens have no agreed valuation standard like equity. The market built its own metrics instead, and this lecture teaches how to read them.",
          },
          {
            label: "Market Cap",
            text: "Price × circulating supply: what the market currently values the tradeable tokens at.",
          },
          {
            label: "FDV (Fully Diluted Valuation)",
            text: "Price × max supply: the valuation if every token that will ever exist were already circulating.",
          },
          {
            label: "The Gap Between Them (Low Float Trap)",
            text: "A big MC/FDV gap means most of the supply hasn’t hit the market yet, so dilution is coming.",
          },
          {
            label: "NVT Ratio",
            text: "Network Value to Transactions. Like a P/E ratio, it compares market cap to actual on-chain usage.",
          },
          {
            label: "Connecting the Dots",
            text: "Links back to Topic 7’s token standards (supply parameters live in the contract) and Topic 5’s staking (staked supply shrinks the effective float).",
          },
        ],
      },
    ],
  },
  {
    title: "Phase 5: The New Economy · Weeks 17–20",
    summary:
      "Applying the programmable layer to finance (DeFi), and the rules that come with it.",
    topics: [
      {
        number: 9,
        weeks: "17–18",
        title: "The Financial Layer: Stablecoins, Real World Assets & DeFi Intro",
        points: [
          {
            label: "Stablecoins",
            text: "The bridge between fiat and crypto.",
            points: [
              {
                label: "Types",
                text: "Fiat-backed (USDC/Tether) vs. crypto-backed (DAI) vs. algorithmic.",
              },
              {
                label: "The Stablecoin Trilemma",
                text: "Stability, capital efficiency, and decentralization.",
              },
            ],
          },
          {
            label: "Real World Assets (RWA)",
            text: "Tokenizing off-chain assets such as real estate, T-bills, and gold, and the legal and technical challenges of enforcing on-chain ownership of off-chain assets.",
          },
          {
            label: "DeFi Intro",
            text: "Finance without intermediaries:",
            points: [
              {
                label: "DEX (Decentralized Exchange)",
                text: "Automated Market Makers (AMM) vs. order books, and how Uniswap works without a middleman.",
              },
              {
                label: "Lending/Borrowing",
                text: "Over-collateralized loans (Aave/Compound): “Be your own bank.”",
              },
            ],
          },
        ],
      },
      {
        number: 10,
        weeks: "19–20",
        title: "Taxation in Crypto",
        points: [
          {
            label: "The Shift",
            text: "Crypto’s “nobody’s watching” era is ending. Learn which actions trigger tax.",
          },
          {
            label: "Regulation",
            text: "MiCA (the EU-wide license) and DAC8 (the EU version of CARF), which has collected transaction data since January 1, 2026, with the first cross-border exchange between tax authorities in 2027.",
          },
          {
            label: "One Investor’s Year",
            text: "Buy, swap into DeFi, stake, sell: every tax trigger is flagged live on Blockpit’s tracker.",
          },
          {
            label: "Germany Basics",
            text: "Crypto as a private asset (§23 EStG), the one-year holding period (Spekulationsfrist), and the €1,000 Freigrenze.",
          },
          {
            label: "Connecting the Dots",
            text: "Staking rewards are taxed differently than the underlying asset, and swaps and LP moves in DeFi each carry their own tax event.",
          },
        ],
      },
    ],
  },
];

export const applicationDetails = (
  <>
    Apply through the <a href={courseFacts.applicationUrl}>application form</a>.
    {` Applications run from October 12 to ${courseFacts.deadline}. Acceptance announcements: ${courseFacts.decisions}. The deadline timezone is still to be confirmed.`}
  </>
);
export const participationDetails = `The free, 20-week program starts on ${courseFacts.start}. Join a 1.5-hour online session on ${courseFacts.sessionTime}, alternating lecture and presentation weeks. Allow additional time for group research and preparation; that workload is not yet specified.`;
