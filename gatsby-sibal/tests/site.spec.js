const { test, expect } = require('@playwright/test')

const archivePath = '/archivum/2024/'

test('invitation theme works with both motion preferences and preserves the 40% image column', async ({ page }) => {
  await page.goto('/')
  for (const reducedMotion of ['no-preference', 'reduce']) {
    await page.emulateMedia({ reducedMotion })
    await expect(page.locator('nav')).toHaveCSS('background-color', 'rgb(16, 39, 31)')
    await expect(page.locator('#esemeny')).toHaveCSS('background-color', 'rgb(255, 252, 246)')
  }
  const imageRatio = await page.locator('#esemeny .grid').evaluate((grid) => {
    const [text, image] = [...grid.children].map((child) => child.getBoundingClientRect().width)
    return image / (text + image)
  })
  expect(imageRatio).toBeCloseTo(0.4, 2)
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.locator('#esemeny .grid').evaluate((grid) =>
    grid.children[1].getBoundingClientRect().top >= grid.children[0].getBoundingClientRect().bottom
  )).toBe(true)
  await page.goto(archivePath)
  await expect(page.locator('nav')).toHaveCSS('background-color', 'rgb(50, 123, 171)')
})

test('2026 home page uses email registration without old event details', async ({ page }) => {
  const formspreeRequests = []
  page.on('request', (request) => {
    if (request.url().includes('formspree')) formspreeRequests.push(request.url())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'SÍBÁL 2026', level: 1 })).toBeVisible()
  await expect(page.locator('#esemeny')).toContainText('Lifestyle Hotel Mátra szervezésében')
  await expect(page.locator('#esemeny')).toContainText('Sí Klaszter szakmai támogatásával')
  await expect(page.locator('#esemeny time')).toHaveAttribute('dateTime', '2026-11-28T18:00:00+01:00')
  await expect(page.locator('#esemeny')).toContainText('2026. november 28., 18:00–24:00')
  await expect(page.locator('#esemeny')).not.toContainText('november 18')
  await expect(page.locator('#helyszin')).toContainText('Lifestyle Hotel Mátra')
  await expect(page.locator('#helyszin a')).toHaveAttribute('href', 'mailto:sales@lifestylehotelmatra.hu')
  await expect(page.locator('#helyszin')).toContainText('Mátraháza')
  await expect(page.locator('#helyszin')).toContainText('65.000 Ft/2 fő/1 éj')
  await expect(page.locator('#helyszin li')).toHaveText([
    'Reggeli',
    'Késői kijelentkezés 12:00 óráig',
    'A wellnessrészleg használata 16:00 óráig',
  ])
  await expect(page.locator('#arak')).toContainText('29.000 Ft/fő')
  await expect(page.locator('#arak')).toContainText('6 órás korlátlan alkoholmentes italcsomagot')
  await expect(page.locator('#arak')).toContainText('Alkoholos italok külön térítés ellenében fogyaszthatók.')
  await expect(page.locator('#program li')).toHaveText([
    'Svédasztalos vacsora élőzenével',
    'DJ és tánc az est további részében',
    'Táncos műsor',
    'Tombola',
    'Kötetlen beszélgetések, találkozás a síbarátokkal',
  ])
  await expect(page.locator('#program')).toContainText('a későbbiekben adunk tájékoztatást')
  const registration = page.locator('#regisztracio')
  await expect(registration).toContainText('Jelentkezni 2026. november 13-ig lehet')
  await expect(registration.locator('time')).toHaveAttribute('dateTime', '2026-11-13')
  await expect(registration).toContainText('A rendezvényre és a szállásra korlátozott számban állnak rendelkezésre férőhelyek')
  for (const link of await registration.getByRole('link').all()) {
    await expect(link).toHaveAttribute('href', 'mailto:sales@lifestylehotelmatra.hu')
  }
  await expect(page.locator('form')).toHaveCount(0)
  await expect(page.getByText('38.000 Ft', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Schieszl Vendéglő és Borház Bortára', { exact: true })).toHaveCount(0)
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0)
  expect(formspreeRequests).toEqual([])
})

test('archive is linked both ways and preserves the 2024 event', async ({ page }) => {
  await page.goto('/')
  const previousEvents = page.getByRole('complementary', { name: 'Korábbi események' })
  await expect(previousEvents.getByRole('listitem')).toHaveCount(1)
  await expect(previousEvents.locator('a[href="/archivum/"]')).toHaveCount(0)
  await previousEvents.getByRole('link', { name: 'Síbál 2024', exact: true }).click()
  await expect(page).toHaveURL(/\/archivum\/2024\/$/)
  await expect(page).toHaveTitle('Síbál 2024 – Archívum')
  await expect(page.getByRole('complementary', { name: 'Archív esemény' })).toContainText('A rendezvény lezajlott')
  await expect(page.locator('#esemeny')).toContainText('2024. november 30')
  await expect(page.locator('#arak')).toContainText('38.000 Ft')
  await expect(page.locator('#regisztracio')).toContainText('A regisztráció lezárult.')
  await expect(page.locator('#tamogatokEsPartnerek a')).toHaveCount(21)
  await expect(page.getByRole('link', { name: 'sales@lifestylehotelmatra.hu' })).toHaveCount(0)
  await page.getByRole('link', { name: 'A közelgő Síbál 2026 megtekintése' }).click()
  await expect(page).toHaveTitle('Síbál 2026')
})

test('section links preserve history and keep headings below the sticky header', async ({ page }) => {
  await page.goto(archivePath)
  const nav = page.getByRole('navigation', { name: 'Fő navigáció' })
  for (const id of ['esemeny', 'helyszin', 'program']) {
    const link = nav.locator(`a[href="#${id}"]:visible`)
    await link.click()
    await expect(page).toHaveURL(new RegExp(`#${id}$`))
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect.poll(async () => page.evaluate((sectionId) => {
      const top = document.getElementById(sectionId).getBoundingClientRect().top
      const headerBottom = document.querySelector('nav').getBoundingClientRect().bottom
      return top >= headerBottom && top <= headerBottom + 32
    }, id)).toBe(true)
    await expect(page.locator(`#${id}`)).toBeFocused()
  }
  await page.goBack()
  await expect(page).toHaveURL(/#helyszin$/)
  await expect(nav.locator('a[href="#helyszin"]:visible')).toHaveAttribute('aria-current', 'location')
  await page.reload()
  await expect.poll(async () => page.locator('#helyszin').evaluate((section) =>
    section.getBoundingClientRect().top >= document.querySelector('nav').getBoundingClientRect().bottom
  )).toBe(true)
})

test('active section stays correct inside an expanded, long program', async ({ page }) => {
  await page.goto(`${archivePath}#program`)
  const program = page.locator('#program')
  for (const button of await program.getByRole('button').all()) {
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
  }
  const height = await program.evaluate((section) => section.getBoundingClientRect().height)
  expect(height).toBeGreaterThan(1800)
  await program.evaluate((section) => {
    window.scrollTo(0, window.scrollY + section.getBoundingClientRect().top + 800)
  })
  await expect(page.locator('nav a[href="#program"]:visible')).toHaveAttribute('aria-current', 'location')
  await page.locator('nav a[href="#tamogatokEsPartnerek"]:visible').click()
  await expect(page.locator('nav a[href="#tamogatokEsPartnerek"]:visible')).toHaveAttribute('aria-current', 'location')
})

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('has accessible state, Escape restores focus, and section links close the menu', async ({ page }) => {
    await page.goto(archivePath)
    const toggle = page.getByRole('button', { name: 'Menü megnyitása' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation')
    await toggle.click()
    const close = page.getByRole('button', { name: 'Menü bezárása' })
    await expect(close).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await page.locator('#mobile-navigation a[href="#program"]').click()
    await expect(page).toHaveURL(/#program$/)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#program')).toBeFocused()
    await expect.poll(async () => page.locator('#program').evaluate((section) => {
      const top = section.getBoundingClientRect().top
      const bottom = document.querySelector('nav').getBoundingClientRect().bottom
      return top >= bottom && top <= bottom + 32
    })).toBe(true)
    await toggle.click()
    await expect(close).toHaveAttribute('aria-expanded', 'true')
    await page.setViewportSize({ width: 1440, height: 900 })
    await expect(page.locator('button[aria-controls="mobile-navigation"]')).toHaveAttribute('aria-expanded', 'false')
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
})

test('production HTML includes metadata, language and only confirmed event data', async ({ request }) => {
  for (const [path, title] of [
    ['/', 'Síbál 2026'],
    ['/archivum/', 'Síbál – Archívum'],
    [archivePath, 'Síbál 2024 – Archívum'],
  ]) {
    const response = await request.get(path)
    expect(response.ok()).toBe(true)
    const html = await response.text()
    expect(html).toMatch(/<html[^>]+lang="hu"/)
    expect(html).toContain(`<title data-gatsby-head="true">${title}</title>`)
    expect(html).toContain(`href="https://www.sibal.hu${path}"`)
    expect(html).toMatch(/name="description" content="[^"]+"/)
    expect(html).toMatch(/property="og:image" content="https:\/\/www.sibal.hu\/static\/[^"]+\.png"/)
    expect(html).not.toContain('formspree')
  }
  const archive = await request.get(archivePath)
  expect(await archive.text()).toContain('2024-11-30T18:00:00+01:00')
})

test('partner images use small responsive modern formats', async ({ page, request }) => {
  await page.goto(archivePath)
  const image = page.getByRole('img', { name: 'Murau Steiermark logó', exact: true })
  await image.scrollIntoViewIfNeeded()
  await expect(image).toHaveAttribute('loading', 'lazy')
  await expect(image).toHaveAttribute('srcset', /320w/)
  await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
  const source = await image.evaluate((img) => ({
    url: img.currentSrc,
    width: img.naturalWidth,
    formats: [...img.closest('picture').querySelectorAll('source')].map((node) => node.type),
  }))
  expect(source.width).toBeLessThanOrEqual(320)
  expect(source.formats).toEqual(expect.arrayContaining(['image/avif', 'image/webp']))
  const response = await request.get(source.url)
  expect(response.ok()).toBe(true)
  expect((await response.body()).byteLength).toBeLessThan(50000)
})

test('pages hydrate without browser errors or invalid nested paragraphs', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  for (const path of ['/', '/archivum/', archivePath]) {
    await page.goto(path)
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('p p')).toHaveCount(0)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  }
  expect(errors).toEqual([])
})

test('404 page, robots and sitemap are generated', async ({ page, request }) => {
  const missing = await page.goto('/this-page-does-not-exist/')
  expect(missing.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Az oldal nem található', exact: true })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('https://www.sibal.hu/sitemap-index.xml')
  const sitemap = await request.get('/sitemap-0.xml')
  expect(sitemap.ok()).toBe(true)
  const xml = await sitemap.text()
  for (const path of ['/', '/archivum/', archivePath]) {
    expect(xml).toContain(`<loc>https://www.sibal.hu${path}</loc>`)
  }
  expect(xml).not.toContain('/404')
})
