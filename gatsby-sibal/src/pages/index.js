import * as React from "react"

import { CalendarIcon, MapPinIcon } from 'lucide-react'

export default function SibalLandingPage() {
  return (
    <div className="min-h-screen bg-blue-100 text-black flex flex-col items-center justify-center p-4">
      <main className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">Síbál 2024</h1>
        <h2 className="text-xl text-center text-blue-600 mb-6">I. Hagyományteremtő Szezonnyitó Síbál</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <CalendarIcon className="w-6 h-6 text-blue-500 mr-2" />
            <p>2024. november 30.</p>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-6 h-6 text-blue-500 mr-2" />
            <p>Schieszl Vendéglő és Borház (2011 Budakalász, Budai út 83.)</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-8">
          <h3 className="font-semibold text-lg mb-2">Esemény információk</h3>
          <p>
            Csatlakozz hozzánk az I. Hagyományteremtő Szezonnyitó Síbálon! Ez a rendezvény 
            tökéletes alkalom arra, hogy felkészüljünk az előttünk álló síszezonra, 
            találkozzunk régi barátokkal és új ismeretségeket kössünk a síelés szerelmeseivel.
          </p>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Regisztráció
          </button>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-blue-600">
        © 2024 Síbál Szervezők. Minden jog fenntartva.
      </footer>
    </div>
  )
}
