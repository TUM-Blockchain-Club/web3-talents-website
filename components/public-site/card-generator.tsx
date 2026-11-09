"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, DragEvent, KeyboardEvent, PointerEvent } from "react";
import { courseFacts } from "./course-content";
import {
  cardArt,
  cardFonts,
  cardFormats,
  clampOffset,
  drawCard,
  type CardAssets,
  type CardFormat,
} from "./card-drawing";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const PROGRAM = "Blockchain Fundamentals 1";
const MAX_PHOTO_SIDE = 1600;
const NUDGE = 12;
const NO_OFFSET = { x: 0, y: 0 };

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("We could not read this image. Please try a JPG or PNG."));
    image.src = src;
  });

async function loadCardAssets(): Promise<CardAssets> {
  const [logo, art] = await Promise.all([
    loadImage("/assets/logo.png"),
    loadImage(cardArt),
    ...cardFonts.map((font) => document.fonts.load(font)),
  ]);
  return { logo, art } as CardAssets;
}

/** Phone photos are far larger than the card needs. */
async function readPhoto(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = await loadImage(url);
    const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(image.width, image.height));
    const photo = document.createElement("canvas");
    photo.width = Math.round(image.width * scale);
    photo.height = Math.round(image.height * scale);
    photo.getContext("2d")?.drawImage(image, 0, 0, photo.width, photo.height);
    return photo;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function CardGeneratorPage() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [assets, setAssets] = useState<CardAssets | null>(null);
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [format, setFormat] = useState<CardFormat>("post");
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState(NO_OFFSET);
  const [error, setError] = useState("");
  const [dropping, setDropping] = useState(false);

  useEffect(() => {
    let live = true;
    loadCardAssets()
      .then((loaded) => live && setAssets(loaded))
      .catch(() => live && setError("The card artwork did not load. Please reload the page."));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!canvas.current || !assets) return;
    drawCard(canvas.current, assets, {
      format,
      name,
      affiliation,
      program: PROGRAM,
      start: courseFacts.start,
      photo,
      zoom,
      offset,
    });
  }, [assets, format, name, affiliation, photo, zoom, offset]);

  const addPhoto = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    try {
      setPhoto(await readPhoto(file));
      setZoom(1);
      setOffset(NO_OFFSET);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
    }
  };

  const moveBy = (dx: number, dy: number) => {
    if (!photo) return;
    setOffset((current) => clampOffset(photo, format, zoom, { x: current.x + dx, y: current.y + dy }));
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropping(false);
    addPhoto(event.dataTransfer.files[0]);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !canvas.current) return;
    const scale = cardFormats[format].width / canvas.current.getBoundingClientRect().width;
    const dx = (event.clientX - drag.current.x) * scale;
    const dy = (event.clientY - drag.current.y) * scale;
    drag.current = { x: event.clientX, y: event.clientY };
    moveBy(dx, dy);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = {
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
    }[event.key];
    if (!step) return;
    event.preventDefault();
    moveBy(step[0], step[1]);
  };

  const download = () => {
    if (!canvas.current || !photo) return;
    canvas.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const link = document.createElement("a");
      link.href = url;
      link.download = `web3-talents-${slug || "card"}-${format}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const layout = cardFormats[format];
  const { circle } = layout;
  const circleArea: CSSProperties = {
    left: `${((circle.x - circle.r) / layout.width) * 100}%`,
    top: `${((circle.y - circle.r) / layout.height) * 100}%`,
    width: `${((2 * circle.r) / layout.width) * 100}%`,
  };
  const fileInput = (
    <input
      type="file"
      accept="image/*"
      onChange={(event) => {
        addPhoto(event.target.files?.[0]);
        event.target.value = "";
      }}
    />
  );

  return (
    <div className="web3t web3t-cardgen" id="top">
      <link rel="stylesheet" href="/card.css" precedence="default" />
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="web3t-cardgen__main">
        <div className="web3t-cardgen__grid">
          <div
            className={`web3t-cardgen__stage web3t-cardgen__stage--${format}${dropping ? " is-over" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setDropping(true);
            }}
            onDragLeave={() => setDropping(false)}
            onDrop={onDrop}
          >
            <canvas
              ref={canvas}
              width={cardFormats.post.width}
              height={cardFormats.post.height}
              className="web3t-cardgen__canvas"
              role="img"
              aria-label="Preview of your card"
            />
            {photo ? (
              <div
                className="web3t-cardgen__circle"
                style={circleArea}
                role="application"
                tabIndex={0}
                aria-label="Your photo. Drag or use the arrow keys to move it inside the circle."
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={() => (drag.current = null)}
                onPointerCancel={() => (drag.current = null)}
                onKeyDown={onKeyDown}
              />
            ) : (
              <label className="web3t-cardgen__circle web3t-cardgen__circle--empty" style={circleArea}>
                {fileInput}
                Add your photo
              </label>
            )}
          </div>

          <div className="web3t-cardgen__form">
            <h1>Your Web3 Talents card</h1>
            <p className="web3t-cardgen__lead">Add your photo and name, then download your card.</p>

            <label className="web3t-btn web3t-btn--outline web3t-cardgen__upload">
              {fileInput}
              {photo ? "Change photo" : "Upload photo"}
            </label>
            <p className="web3t-cardgen__status" role="status">{error}</p>

            {photo && (
              <div className="web3t-cardgen__size">
                <label htmlFor="card-zoom">Zoom</label>
                <input
                  id="card-zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={zoom}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setZoom(next);
                    setOffset((current) => clampOffset(photo, format, next, current));
                  }}
                />
              </div>
            )}

            <label className="web3t-cardgen__field">
              Name
              <input
                value={name}
                maxLength={40}
                autoComplete="name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="web3t-cardgen__field">
              University or company (optional)
              <input
                value={affiliation}
                maxLength={48}
                autoComplete="organization"
                onChange={(event) => setAffiliation(event.target.value)}
              />
            </label>

            <div className="web3t-cardgen__formats" role="group" aria-label="Format">
              {(Object.keys(cardFormats) as CardFormat[]).map((id) => (
                <button key={id} type="button" aria-pressed={format === id} onClick={() => setFormat(id)}>
                  {cardFormats[id].label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="web3t-btn web3t-btn--primary web3t-cardgen__download"
              disabled={!photo}
              onClick={download}
            >
              Download PNG
            </button>
          </div>
        </div>
      </main>

      <SiteFooter page="community" />
    </div>
  );
}
