// Whitespace and JSX text separators do not change the page's content.
const entities = { amp: '&', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', gt: '>', lt: '<', nbsp: ' ' };
const decode = text => text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) =>
  entity[0] === '#' ? String.fromCodePoint(entity[1] === 'x' ? parseInt(entity.slice(2), 16) : +entity.slice(1)) : entities[entity] ?? match);
export function inventory(html) {
  const body = html.includes('<body') ? html.split(/<body[^>]*>/)[1].split('<script')[0] : html;
  return {
    // New program navigation repeats existing titles but does not change page copy.
    text: decode(body.replace(/<div class="web3t-program-picker"[^>]*>[\s\S]*?<\/div>/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim(),
    images: [...body.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]),
    headings: [...body.matchAll(/<(h[123])\b[^>]*>([\s\S]*?)<\/\1>/g)].map(match => decode(match[2].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()),
  };
}
