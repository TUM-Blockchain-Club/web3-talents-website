// Draws the Web3 Talents card on a canvas at its full export size. The preview
// on the page and the downloaded PNG are the same canvas.

export const cardFormats = {
  post: {
    label: "Post",
    width: 1080,
    height: 1350,
    margin: 64,
    logoY: 64,
    logoHeight: 56,
    headlineY: 164,
    headlineSize: 108,
    circle: { x: 716, y: 700, r: 300 },
    textWidth: 952,
    bottom: 64,
    nameSize: 92,
    scrim: true,
  },
  story: {
    label: "Story",
    width: 1080,
    height: 1920,
    margin: 64,
    logoY: 250,
    logoHeight: 56,
    headlineY: 350,
    headlineSize: 120,
    circle: { x: 696, y: 960, r: 320 },
    textWidth: 952,
    bottom: 300,
    nameSize: 96,
    scrim: true,
  },
  landscape: {
    label: "Landscape",
    width: 1920,
    height: 1080,
    margin: 96,
    logoY: 88,
    logoHeight: 64,
    headlineY: 220,
    headlineSize: 148,
    circle: { x: 1444, y: 540, r: 380 },
    textWidth: 920,
    bottom: 88,
    nameSize: 104,
    scrim: false,
  },
} as const;

export const cardArt = "/assets/hero-bg.png";

export type CardFormat = keyof typeof cardFormats;

export type CardAssets = {
  logo: HTMLImageElement;
  art: HTMLImageElement;
};

export type CardContent = {
  format: CardFormat;
  name: string;
  affiliation: string;
  program: string;
  start: string;
  photo: HTMLCanvasElement | null;
  zoom: number;
  offset: { x: number; y: number };
};

const DISPLAY = '"Space Grotesk", "Inter web3t", sans-serif';
const SANS = '"Inter web3t", "Helvetica Neue", Arial, sans-serif';
const ART_FOCUS_X = 0.72;
const MIN_NAME_SIZE = 44;
const META_SIZE = 30;

export const cardFonts = [`500 108px ${DISPLAY}`, `500 34px ${SANS}`];

function drawArt(ctx: CanvasRenderingContext2D, art: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / art.width, height / art.height);
  const drawnWidth = art.width * scale;
  const drawnHeight = art.height * scale;
  ctx.drawImage(art, (width - drawnWidth) * ART_FOCUS_X, (height - drawnHeight) / 2, drawnWidth, drawnHeight);
}

/** Keeps the photo covering the whole circle wherever it is dragged. */
export function clampOffset(
  photo: HTMLCanvasElement,
  format: CardFormat,
  zoom: number,
  offset: { x: number; y: number },
) {
  const { r } = cardFormats[format].circle;
  const scale = (Math.max((2 * r) / photo.width, (2 * r) / photo.height) || 1) * zoom;
  const roomX = Math.max(0, (photo.width * scale - 2 * r) / 2);
  const roomY = Math.max(0, (photo.height * scale - 2 * r) / 2);
  return {
    x: Math.min(roomX, Math.max(-roomX, offset.x)),
    y: Math.min(roomY, Math.max(-roomY, offset.y)),
  };
}

function drawCircle(ctx: CanvasRenderingContext2D, content: CardContent) {
  const { x, y, r } = cardFormats[content.format].circle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);

  if (content.photo) {
    const { photo, format, zoom } = content;
    const scale = Math.max((2 * r) / photo.width, (2 * r) / photo.height) * zoom;
    const width = photo.width * scale;
    const height = photo.height * scale;
    const offset = clampOffset(photo, format, zoom, content.offset);
    ctx.save();
    ctx.clip();
    ctx.drawImage(photo, x - width / 2 + offset.x, y - height / 2 + offset.y, width, height);
    ctx.restore();
  } else {
    ctx.fillStyle = "rgba(1, 6, 28, 0.55)";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

function drawText(ctx: CanvasRenderingContext2D, content: CardContent) {
  const layout = cardFormats[content.format];
  const left = layout.margin;
  const right = left + layout.textWidth;
  const metaY = layout.height - layout.bottom;
  const ruleY = metaY - 58;
  const affiliation = content.affiliation.trim();
  const nameY = ruleY - (affiliation ? 92 : 40);
  const name = content.name.trim() || "Your Name";

  let nameSize: number = layout.nameSize;
  ctx.font = `500 ${nameSize}px ${DISPLAY}`;
  while (nameSize > MIN_NAME_SIZE && ctx.measureText(name).width > layout.textWidth) {
    nameSize -= 2;
    ctx.font = `500 ${nameSize}px ${DISPLAY}`;
  }

  if (layout.scrim) {
    const top = nameY - nameSize - 260;
    const scrim = ctx.createLinearGradient(0, top, 0, nameY - nameSize + 40);
    scrim.addColorStop(0, "rgba(1, 6, 28, 0)");
    scrim.addColorStop(1, "rgba(1, 6, 28, 0.94)");
    ctx.fillStyle = scrim;
    ctx.fillRect(0, top, layout.width, layout.height - top);
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, left, nameY);

  if (affiliation) {
    ctx.font = `500 34px ${SANS}`;
    ctx.fillText(affiliation, left, ruleY - 36, layout.textWidth);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fillRect(left, ruleY, layout.textWidth, 2);

  ctx.font = `500 ${META_SIZE}px ${SANS}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(content.program, left, metaY);
  ctx.textAlign = "right";
  ctx.fillText(`Starts ${content.start}`, right, metaY);
  ctx.textAlign = "left";
}

export function drawCard(canvas: HTMLCanvasElement, assets: CardAssets, content: CardContent) {
  const layout = cardFormats[content.format];
  if (canvas.width !== layout.width) canvas.width = layout.width;
  if (canvas.height !== layout.height) canvas.height = layout.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#01061c";
  ctx.fillRect(0, 0, layout.width, layout.height);
  drawArt(ctx, assets.art, layout.width, layout.height);

  drawText(ctx, content);
  drawCircle(ctx, content);

  ctx.drawImage(
    assets.logo,
    layout.margin,
    layout.logoY,
    (assets.logo.width / assets.logo.height) * layout.logoHeight,
    layout.logoHeight,
  );

  ctx.font = `500 ${layout.headlineSize}px ${DISPLAY}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("I’m a Web3", layout.margin, layout.headlineY + layout.headlineSize);
  ctx.fillText("Talent.", layout.margin, layout.headlineY + layout.headlineSize * 2.06);
}
