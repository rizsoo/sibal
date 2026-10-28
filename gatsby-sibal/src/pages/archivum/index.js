import React from 'react'
import { Link } from 'gatsby'
import SiteLayout from '../../components/site-layout'
import Seo from '../../components/seo'

export default function Archive() {
  return (
    <SiteLayout title="SÍBÁL – ARCHÍVUM" year={2026}>
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4 text-[#327bab]">Korábbi események</h2>
        <ul>
          <li>
            <Link to="/archivum/2024/" className="text-xl underline text-[#327bab]">Síbál 2024</Link>
            <p className="mt-2">2024. november 30. – Schieszl Vendéglő és Borház Bortára</p>
            <p className="mt-2">Lezajlott esemény. Program, támogatók és sajtóbeszámolók.</p>
          </li>
        </ul>
      </section>
    </SiteLayout>
  )
}

export const Head = () => (
  <Seo title="Síbál – Archívum" description="Korábbi Síbálok: eseményadatok, programok, támogatók és beszámolók." pathname="/archivum/" />
)
