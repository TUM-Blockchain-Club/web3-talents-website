# Public website usability review — 2 October 2026

Scope: `/`, `/courses`, `/course`, and `/community` on web3-talents.com.
Preserve the existing visual identity, artwork, page compositions, speakers,
testimonials, and interactive logo field. Moodle is out of scope.

## Research and applied findings

| Principle / common pitfall | Observed issue | Refinement |
| --- | --- | --- |
| Consistent, recognizable navigation | Header disappeared on long pages; desktop links were hidden below 1120px | Compact sticky header, explicit Home link, current-page indicator, desktop links from 800px |
| Keyboard navigation must be usable, not merely styled | No main landmark or skip link; menu stayed open when focus left | One focusable main per page, skip link, Escape/outside-click/focus-leave dismissal; native Tab order retained |
| Persistent UI must not hide focused content | Sticky headers can obscure anchors | Header-height scroll offsets and inset carousel focus outline |
| Controls should communicate availability | Login, Apply Now and Sign Up looked active but had no destinations | Visible coming-soon labels and a quieter unavailable treatment; no registration or Moodle connections added |
| Labels must match destinations | LinkedIn pointed to the club homepage; About Us varied by route | Verified official LinkedIn/contact destinations; consistent Community and FAQ links |
| Sufficient contrast and readable text | Gray metadata and course copy were faint over busy artwork | Brighter secondary text, quieter course background, improved line height and 16px testimonials |
| Content must not rely on hover or fixed-height clipping | Value-card copy was hover-only; desktop reviews had a 439px clipping limit | Descriptions remain visible; review section expands; speaker cards can grow |
| Responsive layout should reflow rather than crop | Fixed-width course speaker cards and absolute desktop hero content were fragile | Flexible card widths and natural hero copy/action flow; tabs have a clearer selected state |
| Touch targets need adequate space | Footer links and expand-all control were small | 44px targets for those controls; retain existing enlarged carousel targets |
| Reserve image space and defer below-fold loading | Speaker images loaded eagerly | Explicit dimensions, lazy loading and asynchronous decoding; artwork unchanged |

## Sources

- [Nielsen Norman Group: ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) — consistency, status visibility, recognition, and preventing misleading interactions.
- [W3C: disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) — ordinary site navigation does not need an application menu role; use expanded-state disclosure and predictable keyboard behavior.
- [W3C: bypass blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) — skip repetitive navigation.
- [W3C: focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) — persistent overlays should not hide keyboard focus.
- [W3C: target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — WCAG AA minimum is 24×24 CSS px with exceptions; this pass aims for 44px on key navigation controls.
- [W3C: contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — 4.5:1 for ordinary text, 3:1 for large text; solid-surface secondary color pairs covered by regression tests.
- [web.dev: optimize layout shift](https://web.dev/articles/optimize-cls) — reserve image space and avoid content unexpectedly moving.
- [TUM Blockchain Club official site](https://www.tum-blockchain.com/) — source of the footer LinkedIn and contact destinations, checked on the review date.

## Verification and boundaries

- Production build and TypeScript validation; 42 regression tests.
- Browser layout checks on all four routes at 320, 768, 1024 and 1440 CSS px:
  no document-level horizontal overflow, one main landmark, and correct responsive navigation.
- Manual keyboard checks for skip navigation, mobile Escape/focus return, and course tabs.
- Existing reduced-motion, animation cleanup, and particle-interaction tests retained.
- This is a focused usability pass, not an accessibility certification or a measured
  Core Web Vitals improvement. Real-user performance measurement, broader assistive
  technology testing, and further asset optimization remain future work.
- Course/event information remains placeholder content; restored testimonials and
  speakers were not independently verified or rewritten. Some quotes repeat in the
  existing content. Editorial approval is needed before replacing these statements.

Implementation: `public/usability.css` is a separate override layer to make these
refinements easy to adjust without replacing the original design stylesheet.
