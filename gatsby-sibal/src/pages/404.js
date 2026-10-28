import React from 'react'
import { Link } from 'gatsby'
import SiteLayout from '../components/site-layout'
import Seo from '../components/seo'

export default function NotFound() {
  return (
    <SiteLayout title="SÍBÁL" year={2026}>
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4 text-[#327bab]">Az oldal nem található</h2>
        <Link to="/" className="underline text-[#327bab]">Vissza a főoldalra</Link>
      </section>
    </SiteLayout>
  )
}

export const Head = () => <Seo title="Az oldal nem található – Síbál" description="A keresett oldal nem található." pathname="/404/" noIndex />
