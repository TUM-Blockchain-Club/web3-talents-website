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
