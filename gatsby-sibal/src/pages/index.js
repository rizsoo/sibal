import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { Menu, X, MapPin, Wine, Clock, Music, Gift, Calendar } from 'lucide-react'
import logo from '../images/logo_sibal_2.png'

const SibalWebsite = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sectionRefs = {
    esemeny: useRef(null),
    helyszin: useRef(null),
    program: useRef(null),
    tamogatokEsPartnerek: useRef(null),
    arak: useRef(null),
    regisztracio: useRef(null),
    kapcsolat: useRef(null),
  }

  const scrollToSection = (sectionId) => {
    const yOffset = -90;
    const element = sectionRefs[sectionId].current;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { id: 'esemeny', label: 'Esemény' },
    { id: 'helyszin', label: 'Helyszín' },
    { id: 'program', label: 'Program' },
    { id: 'tamogatokEsPartnerek', label: 'Támogatók és Partnerek' },
    { id: 'arak', label: 'Árak' },
    { id: 'regisztracio', label: 'Regisztráció' },
    { id: 'kapcsolat', label: 'Kapcsolat' },
  ]

  return (
    <div className="min-h-screen bg-[#ebf2f9]">
      <nav className="sticky top-0 bg-[#327bab] shadow-md z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="">
              <h1 className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">SÍBÁL 2024</h1>
            </div>
            <div className="hidden md:flex justify-end items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    activeSection === item.id
                      ? 'bg-white text-[#327bab]'
                      : 'text-white hover:bg-[#5091cb]'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#b1cee8] focus:outline-none focus:text-[#b1cee8]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.id
                      ? 'bg-white text-[#327bab]'
                      : 'text-white hover:bg-[#5091cb]'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-[1000px] mx-auto">
        <main className="container mx-auto px-4 py-8">

          <section id="esemeny" ref={sectionRefs.esemeny} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4 text-[#327bab]">Esemény</h2>
          <div className="flex justify-top mb-8">
            <div>
            <p className="mb-4">
              Örömmel tájékoztatjuk, hogy a Lavina-Sport Kft, mely már 32 éve minden egyes esztendőben megszervezi az Országos Amatőr Gyermek Síbajnokságot, 2024. november 30-án, szombaton életre hívja a remélhetőleg valóban Hagyományteremtő Szezonnyitó Síbált, melyre Önt szeretettel várjuk.
            </p>
            <p>
              A gálavacsora és bál kiemelt célja a szabadidő,- és a hazai versenysportbarátok közös találkozója. Fontos az értékteremtés, régi kapcsolatok felélesztése, egyben új kapcsolatok kiépítése. A rendezvény megszervezésével a hazai sítársadalom valamiféle összefogása az elsődleges cél.
            </p>
            </div>
            <div className="w-100 h-100 pl-4 pr-4 ml-6 bg-white rounded-full flex items-baseline justify-center">
              {/* Logo */}
              <img src={logo} alt="Síbál 2024 Logo" />
            </div>
          </div>
          </section>

          <section id="helyszin" ref={sectionRefs.helyszin} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#327bab]">Helyszín</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 text-[#5091cb]">
                  Schieszl Vendéglő és Borház Bortára
                </h3>
                <p className="mb-4">
                  Budapest határában, Budakalászon. A tulajdonos és családja igen nagy síelő. Schieszl Konrád, mielőtt átvette volna, a most már ötödik generációs éttermet, szakképzett kiképző síoktató volt.
                </p>
                <div className="flex items-center mb-2">
                  <MapPin size={20} className="text-[#5091cb] mr-2" />
                  <span>2011 Budakalász, Budai út 83.</span>
                </div>
                <div className="flex items-center">
                  <Wine size={20} className="text-[#5091cb] mr-2" />
                  <span>Tradicionális borház és étterem</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-[#5091cb] text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Térkép</h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5378.897149828747!2d19.047556!3d47.617411!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d771640910df%3A0x6f30246b78c03cec!2zU2NoaWVzemwgVmVuZMOpZ2zFkSDDqXMgQm9yaMOheg!5e0!3m2!1sen!2sus!4v1729422098505!5m2!1sen!2sus" 
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }}
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="program" ref={sectionRefs.program} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#327bab] text-center">Program</h2>
            <div className="grid grid-cols-1 gap-8">

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#327bab] bg-[#ebf2f9] p-3 rounded-lg">Időrend</h3>
                <div className=" grid grid-cols-2 gap-8">
                  {[
                    { time: "18:00", event: "Kapunyitás", icon: <Calendar size={24} /> },
                    { time: "18:00 - 18:50", event: "Fogadás - Liget program", icon: <Wine size={24} /> },
                    { time: "18:55 - 19:00", event: "Síbál megnyitója", icon: <Music size={24} /> },
                    { time: "19:00 - 19:30", event: "Vendégek köszöntője", icon: <Music size={24} /> },
                    { time: "19:30 - 21:00", event: "Díszvacsora", icon: <Wine size={24} /> },
                    { time: "22:10 - 22:30", event: "Műsor (díjátadók...)", icon: <Gift size={24} /> },
                    { time: "22:30 - 23:00", event: "Tombola", icon: <Gift size={24} /> },
                    { time: "23:00", event: "Táncmulatság", icon: <Music size={24} /> },
                    { time: "24:00", event: "Az első téli nap köszöntése, a 2024/25-ös szezon megnyitása", icon: <Calendar size={24} /> },
                    { time: "01:00", event: "Bál zárása", icon: <Clock size={24} /> },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-[#5091cb] text-white p-3 rounded-full mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{item.time}</p>
                        <p className="text-gray-600">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#327bab] bg-[#ebf2f9] p-3 rounded-lg">Menü</h3>
                <div className="text-sm text-center">
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-[#5091cb]">Vendégvárás:</h4>
                    <p className="font-medium">Liget program (Időtartam: kb. 60 perc)</p>
                    <ul className="list-disc list-inside ml-4 mb-2">
                      <li>9 hónapig érlelt mangalica sonka</li>
                      <li>Zakuszka csatos üvegben, sajt, friss zöldségek</li>
                      <li>Friss házi kenyér</li>
                    </ul>
                    <p>(Berkel-sonka szeletelő látványelemként)</p>
                    <p>Ital: korlátlanul az italcsomag szerint, habzóbor</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 text-[#5091cb]">Büfévacsora</h4>
                    <h5 className="text-lg font-medium mb-1">Leves</h5>
                    <ul className="list-disc list-inside ml-4 mb-2">
                      <li>Halászlé, pontyhússal</li>
                      <li>Vegán és minden mentes édesburgonya krémleves</li>
                    </ul>

                    <h5 className="text-lg font-medium mb-1">Főételek</h5>
                    <ul className="list-disc list-inside ml-4 mb-2">
                      <li>Rántott tengeri süllőfilé, pirított petrezselymes rák, fokhagymás aioli</li>
                      <li>Kacsamell falatok, körte, kéksajt</li>
                      <li>Nógrádi szarvaspörkölt, sült szilva</li>
                      <li>Préselt egész csirke</li>
                      <li>Vegán töltött sütőtök zöldségekkel, tofu, narancsos lencse</li>

                      <li>Héjas, zöldfűszeres burgonya, rakott spätzle, zöldséges Jázmin rizs</li>
                    </ul>

                    <h5 className="text-lg font-medium mb-1">Desszertek</h5>
                    <ul className="list-disc list-inside ml-4 mb-2">
                      <li>Mákos-almás lepény, málnalekvár</li>
                      <li>Csokoládé láva</li>
                      <li>Bögrés süti aszalt gyümölcsökkel, maracujás öntettel</li>
                      <li>Kávé és mascarpone, mandularopogós (pohárkrém)</li>
                      <li>Málnás tápióka puding</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-[#5091cb]">Italcsomag:</h4>
                    <p>Korlátlan italfogyasztás 18.00-01.00 időtartamra, mely a röviditalt nem tartalmazza. (szénsavas és rostos üdítő italok, szénsavas és mentes ásványvíz, standard fehér, rosé és vörösborok, alkoholos és mentes sör, kávé, capuccino).</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-[#327bab] bg-[#ebf2f9] p-3 rounded-lg">Tombola</h3>
                <p>A bálbelépő ára tartalmaz 1 darab tombolaszelvényt.</p>
                <p>A tombola 8-10 nagy értékű (100.000,-forint körüli) nyeremény, összesen 1 millió forint értékben.</p>
              </div>
            </div>
          </section>

          <section id="tamogatokEsPartnerek" ref={sectionRefs.tamogatokEsPartnerek} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-[#327bab] text-center">Támogatók és Partnerek</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Magyar Sí Szövetség", url:  "https://www.sielok.hu/" },
                { name: "Síoktatók Magyarországi Szövetsége", url: "https://www.sioktatok.hu/" },
                { name: "Sípark Mátraszentitván", url: "https://sipark.hu/" },
                { name: "Skioutlet.hu", url: "https://www.skioutlet.hu/" },
                { name: "Vadon  Sport",   url: "https://www.vadonsport.hu/" },
                { name: "Marosport /FUNDANGO", url: "https://www.fundango.hu/" },
                { name: "Tandtsport Sí és Snowboard Központ", url: "https://tandtsport.hu/" },
                { name: "Csáki-Maronyák Éva festőművész", url: "#" },
                { name: "Osztrák Idegenforgalmi Képviselet", url: "https://www.austria.info/hu" },
                { name: "Lengyel Idegenforgalmi Szervezet", url: "https://www.lengyelorszag.travel/hu" },
                { name: "Mondial Assistance", url: "https://www.mondial-assistance.hu/" },
                { name: "Síelők.hu", url: "https://sielok.hu/" },
                { name: "Magyar Vitorlás Szövetség", url: "https://www.hunsail.hu/" },
                { name: "Nagyvillám Visegrádi sípálya", url: "https://nagyvillam.hu/" }
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <span className="text-[#5091cb] font-medium text-center text-sm">{partner.name}</span>
                </a>
              ))}
            </div>
              <p className="mt-6 text-center text-xs text-gray-600">Szeretne a támogatónk lenni? Írjon az info@skioutlet.hu -ra!</p>
          </section>

          <section id="arak" ref={sectionRefs.arak} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#327bab] text-center">Árak</h2>
            <div className="bg-[#8ab5dc] text-white rounded-lg p-8 shadow-lg">
              <p className="text-4xl font-bold mb-2 text-center">38.000 Ft</p>
              <p className="mb-3 text-center text-sm text-white-600">(Az ár tartalmazza az ÁFA-t)</p>
              <p className="text-xl mb-6 text-center">Gálavacsora és bálbelépő az alábbiakat tartalmazza</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center">
                  <Gift className="mr-2" size={24} />
                  <span>Tombolajegy</span>
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="mr-2" size={24} />
                  <span>Teljes estés program</span>
                </div>
                <div className="flex items-center justify-center">
                  <Wine className="mr-2" size={24} />
                  <span>Exkluzív gálavacsora</span>
                </div>
              </div>
            </div>
          </section>

          <section id="regisztracio" ref={sectionRefs.regisztracio} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#327bab] text-center">Regisztráció</h2>
            <p className="mt-4 text-center text-xs text-gray-600"> Regisztrációs határidő: 2024. november 15.</p>
            <form className="space-y-4 max-w-md mx-auto">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Név</label>
                  <input type="text" id="name" name="name" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail cím</label>
                  <input type="email" id="email" name="email" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefonszám</label>
                  <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out" />
                </div>
              </div>
              <div>
                <label htmlFor="billing" className="block text-sm font-medium text-gray-700 mb-1">Számlázási cím (név, cím, adószám)</label>
                <textarea id="billing" name="billing" rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out resize-none"></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-[#5091cb] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-[#327bab] focus:outline-none focus:ring-2 focus:ring-[#5091cb] focus:ring-offset-2 transition duration-150 ease-in-out">
                  Regisztráció
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-xs text-gray-600">
              A regisztráció után a Schieszl Borház Kft. számlát e-mailben megküldi. A számla kiegyenlítése előre szükséges november 22-ig.
            </p>
          </section>

          <section id="kapcsolat" ref={sectionRefs.kapcsolat} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4 text-[#327bab]">Kapcsolat</h2>
            <h3 className="text-xl font-semibold mb-2">Lavina-Sport Kft.</h3>
            <p>1027 Budapest, Margit krt. 46.</p>
            <p>Email: info@skioutlet.hu</p>
            <p className="mt-4">Esetleges asztalültetési igényeket e-mailben kérjük jelezni.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Schieszl Vendéglő és Borház</h3>
            <p>2011 Budakalász, Budai út 83.</p>
          </section>
        </main>
      </div>

      <div className="bg-[#327bab] text-white py-16 text-center">
        <div className="max-w-[1000px] mx-auto px-4">
          <p className="text-2xl font-bold mb-4">Síbál 2024</p>
          <p className="text-lg mb-2">Lavina-Sport Kft.</p>
          <p className="text-sm">© 2024 Lavina-Sport Kft. Minden jog fenntartva.</p>
        </div>
      </div>
    </div>
  )
}

export default SibalWebsite