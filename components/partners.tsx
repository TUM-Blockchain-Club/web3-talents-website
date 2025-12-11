export function Partners() {
  const partners = [
    "Frankfurt School",
    "Ethereum Foundation",
    "Polkadot",
    "Solana",
    "Chainlink",
    "Filecoin",
    "NEAR Protocol",
    "Avalanche",
  ]

  return (
    <section className="py-20 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-12">Collaborated With</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center h-12 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <span className="text-lg font-semibold tracking-wide">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
