import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'
import config from '../next.config.mjs'

const publicDir = new URL('../public/', import.meta.url)
const readPage = name => readFileSync(new URL(`${name}.html`, publicDir), 'utf8')

test('course wrappers match their scoped styles', () => {
  const css = readFileSync(new URL('styles.css', publicDir), 'utf8')
  for (const page of ['courses', 'course']) {
    assert.ok(readPage(page).includes(`class="web3t web3t-${page}"`))
    assert.ok(css.includes(`.web3t-${page}`))
  }
})

test('public pages use clean local navigation and existing static assets', () => {
  for (const page of ['index', 'courses', 'course', 'community']) {
    const html = readPage(page)
    assert.doesNotMatch(html, /href="[^"\s]*\.html(?:[#?"])/)
    for (const [, asset] of html.matchAll(/(?:src|href)="\/(assets\/[^"?#]+|styles\.css|app\.js|hero-motion\.js)"/g)) {
      assert.ok(existsSync(new URL(asset, publicDir)), `${page}: missing ${asset}`)
    }
  }
})

test('every legacy URL redirects to a route that serves its original file', async () => {
  const { beforeFiles } = await config.rewrites()
  for (const redirect of await config.redirects()) {
    assert.equal(redirect.permanent, true)
    assert.ok(beforeFiles.some(rewrite =>
      rewrite.source === redirect.destination && rewrite.destination === redirect.source))
  }
})

test('login and application buttons remain disconnected from Moodle', () => {
  const js = readFileSync(new URL('app.js', publicDir), 'utf8')
  assert.ok(js.includes("el.removeAttribute('href')"))
  assert.ok(js.includes("el.setAttribute('aria-disabled', 'true')"))
  for (const page of ['index', 'courses', 'course', 'community']) {
    assert.doesNotMatch(readPage(page), /(?:href|src)="[^"\s]*(?:130\.61\.104\.92|login\/index\.php)/)
  }
})
