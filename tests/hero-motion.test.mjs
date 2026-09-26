import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { test } from 'node:test'

const script = readFileSync(new URL('../public/app.js', import.meta.url), 'utf8')

function setup(matches) {
  const classes = new Set()
  const hero = {
    children: [],
    classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) },
    append(fragment) { this.children.push(...fragment.children) },
  }
  const media = { matches, addEventListener(event, fn) { this.change = fn } }
  const window = { matchMedia: () => media, addEventListener(event, fn) { this[event] = fn } }
  const document = {
    querySelectorAll: () => [],
    querySelector: () => hero,
    createDocumentFragment: () => ({ children: [], append(child) { this.children.push(child) } }),
    createElement: () => ({ style: { setProperty() {} }, addEventListener(event, fn) { this[event] = fn } }),
  }
  runInNewContext(script, { document, window })
  return { hero, media, classes, window }
}

test('hover scatters forty shards and pointer leave/cancel restores them', () => {
  const { hero, classes, window } = setup(true)
  assert.equal(hero.children.length, 41)
  const hit = hero.children.at(-1)
  for (const reset of [() => hit.pointerleave(), () => hit.pointercancel(), () => window.blur()]) {
    hit.pointerenter()
    assert.ok(classes.has('is-scattered'))
    reset()
    assert.ok(!classes.has('is-scattered'))
  }
})

test('touch/narrow/reduced-motion preferences leave original artwork untouched', () => {
  const { hero, classes } = setup(false)
  assert.equal(hero.children.length, 0)
  assert.ok(!classes.has('is-ready'))
})

test('preference changes reset hover without duplicating shards', () => {
  const { hero, media, classes } = setup(true)
  const hit = hero.children.at(-1)
  hit.pointerenter()
  media.matches = false
  media.change()
  hit.pointerenter()
  assert.ok(!classes.has('is-scattered'))
  media.matches = true
  media.change()
  assert.equal(hero.children.length, 41)
})

test('public pages no longer advertise old cohort or event dates', () => {
  for (const page of ['index', 'courses', 'course', 'community']) {
    const html = readFileSync(new URL(`../public/${page}.html`, import.meta.url), 'utf8')
    assert.doesNotMatch(html, /August 2026|July 15|JULY 2026|Dec 15|January 15th|June, 13|Jun-2024|17 days to apply|Applications Open/)
    assert.match(html, /coming soon/i)
  }
})
