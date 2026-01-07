"use client"

import { Calendar, Clock, Globe, BookOpen, ChevronDown, Shield, Lock, Wallet, Bitcoin, Cpu, Scale, Code, Coins, Rocket } from "lucide-react"
import { useState } from "react"

interface Week {
  week: string
  title: string
  icon: React.ElementType
  topics: string[]
  exercises?: string[]
  note?: string
}

interface Phase {
  phase: string
  title: string
  description: string
  weeks: Week[]
}

export function Curriculum() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)

  const facts = [
    { icon: Calendar, label: "Start Date", value: "January 28, 2026" },
    { icon: Calendar, label: "End Date", value: "June 17, 2026" },
    { icon: Clock, label: "Duration", value: "20 Weeks" },
    { icon: Globe, label: "Format", value: "100% Online" },
  ]

  const phases: Phase[] = [
    {
      phase: "Phase 1",
      title: "Foundational Trust",
      description: "Establish the need for blockchain by conceptually solving the double-spending problem, then introducing the mathematical concepts that make it possible.",
      weeks: [
        {
          week: "Topic 1",
          title: "The Need for Decentralization & Digital Trust",
          icon: Shield,
          topics: [
            "Introduction to centralized vs. decentralized systems",
            "Problems of centralized systems & advantages of decentralization",
            "The Double-Spending Problem",
            "Introduction to the concept of a shared, immutable ledger",
            "Basic overview of public vs. private ledgers"
          ]
        },
        {
          week: "Topic 2",
          title: "Cryptography / Keys & Hashing",
          icon: Lock,
          topics: [
            "Part A (Integrity): Hashing, mathematical trust and one-way functions",
            "How cryptographic primitives build the foundation of trust",
            "Part B (Identity): Basic cryptographic principles (Symmetric vs. Asymmetric)",
            "How public/private key pairs work",
            "Digital signatures for authorization"
          ],
        }
      ]
    },
    {
      phase: "Phase 2",
      title: "The Ledger Architecture",
      description: "Build the identity layer and then the data layer of the first major blockchain implementation (Bitcoin).",
      weeks: [
        {
          week: "Topic 3",
          title: "Wallets & Peer-to-Peer Networks & Propagation",
          icon: Wallet,
          topics: [
            "Wallet types (hot/cold, custodial/non-custodial)",
            "Key management best practices (MultiSig)",
            "Decentralized network communication",
            "Node roles (full, light, archival)",
            "Gossip protocols and how data propagates"
          ]
        },
        {
          week: "Topic 4",
          title: "Bitcoin: Data Structure & Transactions",
          icon: Bitcoin,
          topics: [
            "Structure of the Bitcoin block (Header, Transactions)",
            "Transaction flow: creation, signing, mempool, and confirmation",
            "UTXO model overview"
          ]
        }
      ]
    },
    {
      phase: "Phase 3",
      title: "Securing the State",
      description: "Focus on the mechanisms used to agree on the single, correct history of transactions.",
      weeks: [
        {
          week: "Topic 5",
          title: "Proof-of-Work, Mining, and Immutability",
          icon: Cpu,
          topics: [
            "Deep dive into Proof-of-Work (PoW)",
            "The role of the nonce and target difficulty",
            "Timestamping and the chaining mechanism that creates immutability",
            "Introduction to the concept of the 51% attack"
          ],
        },
        {
          week: "Topic 6",
          title: "Consensus Mechanisms: Beyond Proof-of-Work",
          icon: Scale,
          topics: [
            "Overview of other consensus models: Proof of Stake (PoS), Byzantine Fault Tolerance (BFT)",
            "Comparison of energy consumption, security assumptions, and centralization vectors",
            "Staking pools vs. mining pools",
            "The Blockchain Trilemma"
          ],
        }
      ]
    },
    {
      phase: "Phase 4",
      title: "The Programmable Layer",
      description: "Transition from a single-purpose ledger to a general-purpose blockchain and smart contracts.",
      weeks: [
        {
          week: "Topic 7",
          title: "Architectural Shift: The 'World Computer' (Ethereum)",
          icon: Code,
          topics: [
            "Transition from a single-purpose ledger to a general-purpose blockchain",
            "State Machine: From 'Who has money?' (Bitcoin) to 'What is the state of this application?' (Ethereum)",
            "Concept of the EVM (Ethereum Virtual Machine) as a shared, singleton state machine",
            "Account Model: Why Ethereum uses accounts instead of UTXO for programmability",
            "EVM Intro: The global computer that everyone runs simultaneously"
          ]
        },
        {
          week: "Topic 8",
          title: "Smart Contracts, Gas, Token Standards & Oracles",
          icon: Code,
          topics: [
            "Smart Contracts: The concept of 'Code is Law'",
            "The Fuel (Gas): Why computation costs money (Halting Problem protection)",
            "Gas Limit vs. Gas Price",
            "ERC-20 (Fungible): Creating 'Currency' or 'Shares' on top of Ethereum",
            "ERC-721 (Non-Fungible/NFT): Unique identifiers for digital art, certificates, or identity",
            "Oracles: The 'Walled Garden' problem and how blockchains access off-chain data (e.g., Chainlink)"
          ]
        }
      ]
    },
    {
      phase: "Phase 5",
      title: "The New Economy & Future Outlook",
      description: "Apply the programmable layer to Finance (DeFi) and the Real World.",
      weeks: [
        {
          week: "Topic 9",
          title: "The Financial Layer: Stablecoins, RWA & DeFi Intro",
          icon: Coins,
          topics: [
            "Stablecoins: The bridge between Fiat and Crypto",
            "Types: Fiat-backed (USDC/Tether) vs. Crypto-backed (DAI) vs. Algorithmic",
            "The 'Stablecoin Trilemma' (Stability, Capital Efficiency, Decentralization)",
            "Real World Assets (RWA): Tokenizing off-chain assets (Real Estate, T-Bills, Gold)",
            "DEX (Decentralized Exchange): Automated Market Makers (AMM) vs. Order Books",
            "Lending/Borrowing: Over-collateralized loans (Aave/Compound)"
          ]
        },
        {
          week: "Topic 10",
          title: "Future Outlook: Beyond Finance (DePIN, Identity & DAO)",
          icon: Rocket,
          topics: [
            "DePIN (Decentralized Physical Infrastructure Networks): Using tokens to incentivize real-world hardware networks",
            "Examples: Helium for WiFi, Hivemapper for mapping",
            "Digital Identity (SSI/DID): Self-Sovereign Identity and Soulbound Tokens (SBT)",
            "Zero Knowledge proofs high-level concept",
            "DAOs (Decentralized Autonomous Organizations): Governance without a CEO",
            "Voting mechanisms and treasury management"
          ]
        }
      ]
    }
  ]

  return (
    <section id="curriculum" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">What You'll Learn</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Curriculum & Key Facts</h2>
        <p className="text-muted-foreground mb-12 max-w-3xl">
          Our comprehensive 10-topic curriculum is designed to build your blockchain knowledge progressively,
          with each phase building upon concepts from previous weeks.
        </p>

        {/* Key Facts Card */}
        <div className="p-6 rounded-xl border border-border bg-card mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            Program Schedule
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <fact.icon className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="text-sm text-muted-foreground block">{fact.label}</span>
                  <span className={`font-semibold ${fact.label === "Format" ? "text-accent" : "text-foreground"}`}>
                    {fact.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Phases */}
        <div className="space-y-4">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="border border-border rounded-xl overflow-hidden bg-card">
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(expandedPhase === phaseIndex ? null : phaseIndex)}
                className="w-full p-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-accent font-mono text-sm font-semibold bg-accent/10 px-3 py-1 rounded-full">
                    {phase.phase}
                  </span>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-foreground">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{phase.description}</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedPhase === phaseIndex ? "rotate-180" : ""
                  }`} 
                />
              </button>

              {/* Phase Content */}
              {expandedPhase === phaseIndex && (
                <div className="px-6 pb-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mt-4 mb-6 sm:hidden">{phase.description}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {phase.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="p-5 rounded-lg border border-border bg-background/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <week.icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <span className="text-xs text-accent font-semibold uppercase tracking-wider">{week.week}</span>
                            <h4 className="text-foreground font-semibold">{week.title}</h4>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {week.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>

                        {week.exercises && week.exercises.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Group Exercises</p>
                            <ul className="space-y-1">
                              {week.exercises.map((exercise, exIndex) => (
                                <li key={exIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-accent">→</span>
                                  {exercise}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {week.note && (
                          <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
                            <p className="text-xs text-accent">💡 {week.note}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
