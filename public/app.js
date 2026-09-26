/* Public-site buttons intentionally remain disconnected from Moodle.
 * Add approved destinations here when login/applications are ready to go live.
 */
for (const el of document.querySelectorAll('[data-login], [data-apply]')) {
    el.removeAttribute('href');
    el.setAttribute('role', 'link');
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('title', 'Not available yet');
    el.addEventListener('click', event => event.preventDefault());
}

// Reversible scatter effect: no animation loop, dependencies, or image edits.
// The invisible hit area stays still so moving shards cannot retrigger hover.
const heroArt = document.querySelector('[data-hero-art]');
const heroMotion = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (heroArt) {
    const resetHero = () => heroArt.classList.remove('is-scattered');
    const setupHero = () => {
        resetHero();
        if (!heroMotion.matches || heroArt.classList.contains('is-ready')) return;
        const fragments = document.createDocumentFragment();
        // Forty triangular shards cover just the right half of the artwork.
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 4; col++) {
                const x = 50 + col * 12.5;
                const y = row * 20;
                const points = [
                    `${x}% ${y}%, ${x + 12.5}% ${y}%, ${x}% ${y + 20}%`,
                    `${x + 12.5}% ${y}%, ${x + 12.5}% ${y + 20}%, ${x}% ${y + 20}%`,
                ];
                points.forEach((polygon, side) => {
                    const shard = document.createElement('span');
                    shard.className = 'web3t-hero__fragment';
                    shard.style.setProperty('--clip', `polygon(${polygon})`);
                    shard.style.setProperty('--origin', `${x + 6.25}% ${y + 10}%`);
                    shard.style.setProperty('--dx', `${(col - 1.5) * 32 + (side ? 14 : -14)}px`);
                    shard.style.setProperty('--dy', `${(row - 2) * 24 + (side ? 12 : -12)}px`);
                    shard.style.setProperty('--rotation', `${((row * 3 + col * 5 + side * 7) % 17) - 8}deg`);
                    shard.style.setProperty('--delay', `${(row + col + side) * 12}ms`);
                    fragments.append(shard);
                });
            }
        }
        const hitArea = document.createElement('span');
        hitArea.className = 'web3t-hero__art-hit';
        hitArea.addEventListener('pointerenter', () => {
            if (heroMotion.matches) heroArt.classList.add('is-scattered');
        });
        hitArea.addEventListener('pointerleave', resetHero);
        hitArea.addEventListener('pointercancel', resetHero);
        fragments.append(hitArea);
        heroArt.append(fragments);
        heroArt.classList.add('is-ready');
    };
    heroMotion.addEventListener('change', setupHero);
    window.addEventListener('blur', resetHero);
    setupHero();
}
