import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import SiteLayout from '../components/site-layout'
import Seo from '../components/seo'

const navItems = [
  { id: 'esemeny', label: 'Esemény' },
  { id: 'helyszin', label: 'Helyszín és szállás' },
  { id: 'program', label: 'Program' },
  { id: 'arak', label: 'Belépő' },
  { id: 'regisztracio', label: 'Jelentkezés' },
]

export default function UpcomingEvent() {
  return (
    <SiteLayout title="SÍBÁL 2026" year={2026} navItems={navItems} theme="alpine">
      <section id="esemeny" tabIndex={-1} className="event-panel event-hero">
        <p className="event-eyebrow">Közelgő esemény · Mátraháza</p>
        <h2 className="event-title">Síbál 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-start">
          <div>
            <p className="mb-6 event-lead">
              A Lifestyle Hotel Mátra szervezésében, a Sí Klaszter szakmai támogatásával
              idén is találkozhatnak a sísport és a havas hegyek szerelmesei,
              hogy együtt hangolódjanak a téli szezonra.
            </p>
            <p className="mb-4 font-semibold">Kedves Síbarátok!</p>
            <p className="mb-4">
              Szeretettel várunk mindenkit{' '}
              <time dateTime="2026-11-28T18:00:00+01:00" className="font-semibold">
                2026. november 28-án, 18:00 órától
              </time>{' '}
              a mátraházai Lifestyle Hotel Mátrában megrendezendő Síbálra!
            </p>
            <p className="mb-4">
              Egy közös vacsorával, zenével és tánccal töltött estére készülünk,
              ahol a találkozásé és a kötetlen beszélgetéseké a főszerep.
              A svédasztalos vacsora mellé élőzenével, az est további részében
              DJ-vel, táncos műsorral és tombolával készülünk.
            </p>
            <p className="event-date">Időpont: 2026. november 28., 18:00–24:00</p>
            <a href="#regisztracio" className="event-button mt-6">Jelentkezési információk <span aria-hidden="true">→</span></a>
          </div>
          <StaticImage
            src="../images/sibal_2026.jpeg"
            alt="Síbál 2026 meghívó"
            className="event-invitation"
            layout="constrained"
            width={960}
            formats={['auto', 'webp', 'avif']}
            loading="eager"
          />
        </div>
      </section>
      <section id="helyszin" tabIndex={-1} className="event-panel">
        <p className="event-eyebrow">Egy este a hegyekben</p>
        <h2 className="event-heading">Helyszín és szállás</h2>
        <h3 className="text-xl font-semibold mb-4">Lifestyle Hotel Mátra, Mátraháza</h3>
        <p className="event-price mb-6">
          <strong>Szálláslehetőség: 65.000 Ft/2 fő/1 éj</strong>
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Reggeli</li>
          <li>Késői kijelentkezés 12:00 óráig</li>
          <li>A wellnessrészleg használata 16:00 óráig</li>
        </ul>
        <p>
          Szálláslehetőséggel kapcsolatos érdeklődés:{' '}
          <a className="event-link break-words" href="mailto:sales@lifestylehotelmatra.hu">
            sales@lifestylehotelmatra.hu
          </a>.
        </p>
      </section>
      <section id="program" tabIndex={-1} className="event-panel">
        <p className="event-eyebrow">Vacsora · Zene · Találkozások</p>
        <h2 className="event-heading">Program</h2>
        <ul className="event-program">
          <li>Svédasztalos vacsora élőzenével</li>
          <li>DJ és tánc az est további részében</li>
          <li>Táncos műsor</li>
          <li>Tombola</li>
          <li>Kötetlen beszélgetések, találkozás a síbarátokkal</li>
        </ul>
        <p>A tombola nyereményeiről és az egyéb információkról a későbbiekben adunk tájékoztatást!</p>
      </section>
      <section id="arak" tabIndex={-1} className="event-panel event-ticket">
        <p className="event-eyebrow">Együtt a téli szezon előtt</p>
        <h2 className="event-heading">Belépő</h2>
        <p className="event-price mb-6">29.000 Ft/fő</p>
        <p className="mb-4">
          A belépő tartalmazza a svédasztalos vacsorát és a 6 órás korlátlan
          alkoholmentes italcsomagot.
        </p>
        <p>Alkoholos italok külön térítés ellenében fogyaszthatók.</p>
      </section>
      <section id="regisztracio" tabIndex={-1} className="event-panel">
        <p className="event-eyebrow">Találkozzunk a Síbálon</p>
        <h2 className="event-heading">Jelentkezés</h2>
        <p className="mb-4">
          Jelentkezni <time dateTime="2026-11-13" className="font-semibold">2026. november 13-ig</time> lehet a{' '}
          <a className="event-link break-words" href="mailto:sales@lifestylehotelmatra.hu">
            sales@lifestylehotelmatra.hu
          </a>{' '}
          e-mail-címen. A rendezvényre és a szállásra korlátozott számban állnak
          rendelkezésre férőhelyek, ezért érdemes mielőbb regisztrálni.
        </p>
        <p>Szeretettel várunk minden érdeklődőt egy hangulatos, síbarátokkal töltött estére!</p>
        <a className="event-button mt-6" href="mailto:sales@lifestylehotelmatra.hu">Jelentkezés e-mailben <span aria-hidden="true">↗</span></a>
      </section>
      <aside id="korabbi-sibalok" tabIndex={-1} className="event-panel event-archive" aria-labelledby="korabbi-sibalok-heading">
        <h2 id="korabbi-sibalok-heading" className="event-heading">Korábbi Síbálok</h2>
        <ul>
          <li>
            <Link to="/archivum/2024/" className="event-link">Síbál 2024</Link>
            <p className="mt-2">2024. november 30. – Schieszl Vendéglő és Borház Bortára</p>
          </li>
        </ul>
      </aside>
    </SiteLayout>
  )
}

export const Head = () => (
  <Seo
    title="Síbál 2026"
    description="Síbál 2026. november 28-án, 18:00–24:00 a mátraházai Lifestyle Hotel Mátrában. Belépő: 29.000 Ft/fő. Szállás: 65.000 Ft/2 fő/1 éj. Jelentkezés november 13-ig."
    pathname="/"
  />
)
