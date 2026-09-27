import assert from 'node:assert/strict'
import { test } from 'node:test'
import { pointerPosition, stepParticle, createRenderer, particleRadius, cellSize, motionQuery } from '../lib/hero-particles.mjs'

test('pointer coordinates track the exact hovered position in the artwork', () => {
  const bounds = { left: 300, top: 90, width: 1000, height: 600 }
  assert.deepEqual(pointerPosition({ clientX: 1050, clientY: 240 }, bounds), { x: 750, y: 150 })
  assert.deepEqual(pointerPosition({ clientX: 800, clientY: 390 }, bounds), { x: 500, y: 300 })
})

const makePixel = () => ({ homeX: 500, homeY: 250, x: 500, y: 250, vx: 0, vy: 0, seed: 1.3 })

test('nearby pixels physically separate and spring back to their exact origin', () => {
  const pixel = makePixel()
  for (let i = 0; i < 50; i++) stepParticle(pixel, { x: 490, y: 250 }, 16, i * 16)
  assert.ok(Math.hypot(pixel.x - pixel.homeX, pixel.y - pixel.homeY) > 15)
  let moving
  for (let i = 0; i < 150; i++) moving = stepParticle(pixel, null, 16, i * 16)
  assert.equal(moving, false)
  assert.ok(Math.hypot(pixel.x - pixel.homeX, pixel.y - pixel.homeY) < .15)
})

test('pixels outside the brush stay exactly still', () => {
  const pixel = makePixel()
  const original = { ...pixel }
  for (let i = 0; i < 100; i++) stepParticle(pixel, { x: 500 + particleRadius + 1, y: 250 }, 16, i * 16)
  assert.deepEqual(pixel, original)
  assert.ok(cellSize <= 3, 'Use tiny pixels, not large shards')
})

test('particle directly under cursor stays finite and moves outward', () => {
  const pixel = makePixel()
  stepParticle(pixel, { x: 500, y: 250 }, 5000, 0)
  assert.ok(Number.isFinite(pixel.x) && Number.isFinite(pixel.y))
  assert.ok(Math.hypot(pixel.vx, pixel.vy) > 0)
})

test('canvas absence falls back to the original image', () => {
  assert.equal(createRenderer({ getContext: () => null }, {}), null)
})

test('touch, narrow screens, and reduced-motion preferences exclude the effect', () => {
  for (const guard of ['min-width: 900px', 'hover: hover', 'pointer: fine', 'prefers-reduced-motion: no-preference']) {
    assert.ok(motionQuery.includes(guard))
  }
})
