// Public-facing facts confirmed from the course team's Notion documents.
// Exact session time, timezone and eligibility thresholds
// are not yet confirmed; do not infer them from examples or internal notes.
export const courseFacts = {
  start: "December 1, 2026",
  deadline: "November 8, 2026 at 23:59",
  decisions: "November 22, 2026",
  schedule: "Tuesdays · 1.5-hour online sessions",
  applicationUrl: "https://tally.so/r/BE4l9Y",
};

export const curriculum = [
  {
    title: "Foundational Trust · Weeks 1–4",
    topics: [
      [
        "Weeks 1–2: Decentralization & Digital Trust",
        "Why decentralization matters, the double-spending problem, and shared ledgers.",
      ],
      [
        "Weeks 3–4: Cryptography, Hashing, Keys & Signatures",
        "How hashes protect integrity, and how public/private keys and digital signatures establish identity.",
      ],
    ],
  },
  {
    title: "The Ledger Architecture · Weeks 5–8",
    topics: [
      [
        "Weeks 5–6: Wallets & Peer-to-Peer Networks",
        "Wallet types, key management, node roles, and how transactions and blocks travel across a network.",
      ],
      [
        "Weeks 7–8: Bitcoin Data Structure & Transactions",
        "Block structure, the UTXO model, and the journey from signing a transaction to confirmation.",
      ],
    ],
  },
  {
    title: "Securing the State · Weeks 9–12",
    topics: [
      [
        "Weeks 9–10: Proof-of-Work, Proof-of-Stake & the Blockchain Trilemma",
        "Mining, validators, incentives, and the trade-offs between security, scalability, and decentralization.",
      ],
      [
        "Weeks 11–12: Ethereum — The World Computer",
        "The move to programmable blockchains, accounts, application state, and the Ethereum Virtual Machine.",
      ],
    ],
  },
  {
    title: "The Programmable Layer · Weeks 13–16",
    topics: [
      [
        "Weeks 13–14: Smart Contracts, Gas, Token Standards & Oracles",
        "How smart contracts execute, why gas is needed, and how tokens and off-chain data fit into applications.",
      ],
      [
        "Weeks 15–16: Tokenomics",
        "Token supply, market capitalization, fully diluted valuation, and metrics for understanding token economics.",
      ],
    ],
  },
  {
    title: "The New Economy · Weeks 17–20",
    topics: [
      [
        "Weeks 17–18: Stablecoins, Real World Assets & DeFi",
        "Stablecoin models, tokenized assets, decentralized exchanges, and lending and borrowing protocols.",
      ],
      [
        "Weeks 19–20: Taxation in Crypto",
        "An introduction to crypto taxation and regulation, with practical examples and a focus on Germany.",
      ],
    ],
  },
];

export const applicationDetails = (
  <>
    Apply through the <a href={courseFacts.applicationUrl}>application form</a>.
    {` Applications run from October 12 to ${courseFacts.deadline}. Acceptance announcements: ${courseFacts.decisions}. The deadline timezone is still to be confirmed.`}
  </>
);
export const participationDetails = `The free, 20-week program starts on ${courseFacts.start}. Join a 1.5-hour online session on Tuesdays, alternating lecture and presentation weeks. Allow additional time for group research and preparation; that workload is not yet specified. The exact start time and timezone are still to be confirmed.`;
