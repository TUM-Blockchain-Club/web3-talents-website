# Card generator

`/card` lets accepted participants make a personal Web3 Talents card. It is
unlisted: no link in the navigation or footer, and `noindex` in its metadata.

- `components/public-site/card-generator.tsx` is the page, and
  `card-drawing.ts` draws the card on a canvas at export size (1080 x 1350,
  1080 x 1920 or 1920 x 1080). The start date comes from `courseFacts`.
- The photo sits in a circle and can be dragged and resized inside it. It stays
  in the browser; nothing is uploaded.
- Styles live in `public/card.css`, loaded by this page alone.
