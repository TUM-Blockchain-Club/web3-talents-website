import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { pointerPosition, settle, createRenderer, fragmentSource, motionQuery } from '../public/hero-motion.js'

test('pointer coordinates track the exact hovered position in the artwork', () => {
  const bounds = { left: 300, top: 90, width: 1000, height: 600 }
  assert.deepEqual(pointerPosition({ clientX: 1050, clientY: 240 }, bounds), [.75, .75])
  assert.deepEqual(pointerPosition({ clientX: 800, clientY: 390 }, bounds), [.5, .5])
})

test('distortion ramps up and settles completely after leaving', () => {
  let strength = 0
  for (let i = 0; i < 40; i++) strength = settle(strength, 1, 16)
  assert.ok(strength > .99 && strength <= 1)
  for (let i = 0; i < 50; i++) strength = settle(strength, 0, 16)
  assert.ok(strength < .002 && strength >= 0)
})

test('shader changes sample coordinates only inside the cursor radius', () => {
  assert.match(fragmentSource, /vec2 sampleUV = uv;/)
  assert.match(fragmentSource, /if \(distance < radius && strength > 0.0\)/)
  assert.match(fragmentSource, /1.0 - smoothstep\(0.0, radius, distance\)/)
})

test('WebGL absence falls back to the original image', () => {
  assert.equal(createRenderer({ getContext: () => null }, {}), null)
})

test('touch, narrow screens, and reduced-motion preferences exclude the effect', () => {
  for (const guard of ['min-width: 900px', 'hover: hover', 'pointer: fine', 'prefers-reduced-motion: no-preference']) {
    assert.ok(motionQuery.includes(guard))
  }
})

test('public pages no longer advertise old cohort or event dates', () => {
  for (const page of ['index', 'courses', 'course', 'community']) {
    const html = readFileSync(new URL(`../public/${page}.html`, import.meta.url), 'utf8')
    assert.doesNotMatch(html, /August 2026|July 15|JULY 2026|Dec 15|January 15th|June, 13|Jun-2024|17 days to apply|Applications Open/)
    assert.match(html, /coming soon/i)
  }
})
