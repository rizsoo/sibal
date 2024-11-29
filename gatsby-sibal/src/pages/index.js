import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { Menu, X, MapPin, Wine, Clock, Music, Gift, Calendar, ParkingCircle, Music2, ListStart, DoorOpen, CheckCheck, Handshake, BookOpen, Microchip, VolumeIcon, Popcorn, GalleryHorizontal, Pizza, ChevronDown } from 'lucide-react'
import { Disclosure } from '@headlessui/react'
import { useForm, ValidationError } from '@formspree/react';
import { Helmet } from 'react-helmet';

import logo from '../images/logo_sibal_2.png'
import imageStanding from '../images/sibal_6.jpg'
import imageInside from '../images/sibal_5.jpg'
import nagyTerem from '../images/terem.jpg'

import donovaly from '../images/donovaly.png'
import klaszter from '../images/klaszter.jpg'
import mondial from '../images/mondial.png'
import msz from '../images/msz.png'
import osster from '../images/osster.png'
import skioutlet from '../images/skioutlet.png'
import smsz from '../images/smsz.png'
import tandt from '../images/tandtsport.jpg'
import vadon from '../images/vadon.png'
import fundango from '../images/fundango.png'
import mvsz from '../images/mvsz.jpg'
import nagyvillam from '../images/nagyvillam.png'
import polska from '../images/polska.jpg'
import sielok from '../images/sielok.jpg'
import sipark from '../images/sipark.jpg'
import evafest from '../images/eva.jpg'
import eleven from '../images/eleven.png'
import parksnow from '../images/parksnow.png'
import domex from '../images/domex.png'
import honda from '../images/honda.png'
import wax from '../images/wax.png'
import zemplen from '../images/zemplen.jpg'
import narad from '../images/narad.png'
import murau from '../images/murau.jpg'
import kreischberg from '../images/kreischberg.svg'


const SibalWebsite = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  //const [success, setSuccess] = useForm(false);
  const [state, handleSubmit] = useForm("movqvreg");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    billing: '',
    plusOne: false,
    plusOneName: ''
  })
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

    window.scrollTo({ top: y, behavior: 'smooth' });
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (state.succeeded) {
    //setSuccess(true)
    alert("Sikeres regisztráció!")
  }

  return (
    <div className="min-h-screen bg-[#ebf2f9]">
      <Helmet>
        <title>Síbál 2024</title>
        {/* <meta name="description" content={page ? (page.description ? page.description.description : defaultDescription) : (event.description ? event.description.description : defaultDescription)} />
        <meta name="image" content={page ? (page.image ? page.image.url : `${siteUrl}${image}`) : event.featuredImage.url} />
        <meta name="title" content={page ? page.title : event.title} />
        <meta property="og:description" content={page ? (page.description ? page.description.description : defaultDescription) : (event.description ? event.description.description : defaultDescription)} />
        <meta property="og:image" content={page ? (page.image ? page.image.url : `${siteUrl}${image}`) : event.featuredImage.url} />
        <meta property="og:site_name" content={page ? page.title : event.title} />
        <meta property="og:title" content={page ? page.title : event.title} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={`${siteUrl}/${(page ? page.node_locale : event.node_locale)}/${(page ? (page.slug === "home" ? "" : page.slug) : event.slug)}`} /> */}
        {/* <SEO meta={page ? page : event} meta_image={event && event.featuredImage.url} /> */}
      </Helmet>
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
                  className={`px-3 py-2 rounded-md transition-colors ${activeSection === item.id
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
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${activeSection === item.id
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
            <div className="flex flex-col sm:flex-row gap-6 justify-top mb-8">
              <div>
                <p className="mb-4">
                  Örömmel tájékoztatjuk, hogy a Lavina-Sport Kft., amely immár 32 éve minden évben megszervezi az Országos Amatőr Gyermek Síbajnokságot, <b>2024. november 30-án</b>, szombaton megrendezi az első, Hagyományteremtő Szezonnyitó Síbált. Szeretettel várjuk Önt és barátait egy emlékezetes estére, hogy együtt indítsuk el az idei síszezont!
                </p>
                <p className="mb-4">
                  Fontos számunkra az értékteremtés, a régi kapcsolatok felélesztése,
                  egyben új kapcsolatok kiépítése. A rendezvény megszervezésével a hazai
                  sítársadalom összefogása az elsődleges célunk.
                </p>
                <p className="mb-2">
                  <b>Időpont:</b> 2024. november 30, szombat 18:00-tól
                </p>
                <p className="mb-2">
                  <b>Dress code: </b>Smart casual
                </p>
                <p className="mb-2">
                  <b>A síbál fővédnöke: </b>Szijjártó Péter külgazdasági és külügyminiszter, képviseletét Gyurta Dániel miniszteri főtanácsadó, olimpiai bajnok látja el.
                </p>
                <p className="mb-2">
                  <b>Az est műsorvezetője: </b>Klausmann Viktor
                </p>
                <p>
                  <b>A Síbálon átadásra kerülnek az alábbi díjak: </b>
                  <p>- Magyar Sí Szövetség részéről: "ÉV SÍZŐJE" díj</p>
                  <p>- Síoktatók Magyarországi Szövetsége részéről Hejhó síelni jó! Nyílt Sítanpályák Program 2023-2024"-ben legtöbb síeléssel összekötött osztálykirándulást lebonyolító sítanpályának.</p>
                  <p>- Chernel István Sí és Turisztikai Klaszter részéről Média Partneri díj</p>
                </p>
              </div>
              <div className="w-100 h-100 pl-4 pr-4 bg-white rounded-full flex items-baseline justify-center">
                <img src={logo} alt="Síbál 2024 Logo" />
              </div>
            </div>
          </section>

          <section id="helyszin" ref={sectionRefs.helyszin} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#327bab]">Helyszín</h2>
                <h3 className="text-2xl font-semibold mb-4 text-[#5091cb]">
                  Schieszl Vendéglő és Borház Bortára
                </h3>
                <p className="mb-4">
                  A vendéglő Budapest határában, Budakalászon található. A tulajdonos és családja igen nagy síelők. Schieszl Konrád, mielőtt átvette volna, a most már ötödik generációs éttermet, szakképzett kiképző síoktató volt.
                </p>
                <div className="flex items-center mb-2">
                  <MapPin size={20} className="text-[#5091cb] mr-2" />
                  <span className='underline'><a href="https://maps.app.goo.gl/LHd84KResA6fUNQQA" target="_blank">2011 Budakalász, Budai út 83.</a></span>
                </div>
                <div className="flex items-center">
                  <Wine size={20} className="text-[#5091cb] mr-2" />
                  <span>Tradicionális borház és étterem</span>
                </div>
                <div className="flex items-center mt-2">
                  <ParkingCircle size={20} className="text-[#5091cb] mr-2" />
                  <span>Ingyenes parkolás az étterem mögötti parkolóban</span>
                </div>
              </div>
              {/*<div className="w-full md:w-1/2">
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
                </div>*/}
              <img className='rounded-lg w-full md:w-1/2' src={nagyTerem} alt="Standing image" />
            </div>
          </section>

          <section id="program" ref={sectionRefs.program} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#327bab] text-center">Program</h2>
            <div className="space-y-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-[#327bab] bg-[#ebf2f9] rounded-lg hover:bg-[#d1e4f5] focus:outline-none focus-visible:ring focus-visible:ring-[#5091cb] focus-visible:ring-opacity-75">
                      <span className='text-xl'>Időrend</span>
                      <ChevronDown
                        className={`${open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-[#327bab]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="">
                          {[
                            { time: "18:00", event: "Kapunyitás", icon: <DoorOpen size={24} /> },
                            { time: "18:00 - 18:50", event: "Vendégvárás", icon: <Wine size={24} /> },
                            { time: "18:55 - 19:00", event: "Síbál megnyitója, Forbi Brass Zenei Köszöntő", icon: <GalleryHorizontal size={24} /> },
                            { time: "19:00 - 19:30", event: "Vendégek köszöntése", icon: <Handshake size={24} /> },
                            { time: "19:30 - 21:00", event: "Svédasztalos vacsora", icon: <Pizza size={24} /> },
                            //{ time: "21:00 - 21:40", event: "St Martin szaxofon és pánsípművész", icon: <Music2 size={24} /> },
                            { time: "21:00 - 23:40", event: "Forbi Brass Zenekar, díjátadók, táncmulatság DJ Vincze Tamás", icon: <Music2 size={24} /> },
                            //{ time: "22:40 - 23:40", event: "Zenei program", icon: <Music size={24} /> },
                            { time: "23:40", event: "Tombola", icon: <Gift size={24} /> },
                            { time: "24:00", event: "Az első téli nap köszöntése, a 2024/25-ös síszezon megnyitása, táncmulatság", icon: <Calendar size={24} /> },
                            { time: "01:00", event: "Bál zárása", icon: <Clock size={24} /> },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start mb-3">
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
                        <div className='w-100 rounded-lg'>
                          <img className='rounded-lg' src={imageStanding} alt="Standing image" />
                        </div>
                      </div>
                    </Disclosure.Panel>

                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-[#327bab] bg-[#ebf2f9] rounded-lg hover:bg-[#d1e4f5] focus:outline-none focus-visible:ring focus-visible:ring-[#5091cb] focus-visible:ring-opacity-75">
                      <span className='text-xl'>Menü</span>
                      <ChevronDown
                        className={`${open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-[#327bab]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="text-sm text-center">
                        <div className="mb-6">
                          <h4 className="text-xl font-semibold mb-2 text-[#5091cb]">Vendégvárás:</h4>
                          <p className="font-medium">Liget program (Időtartam: kb. 60 perc)</p>
                          <ul className="list-disc list-inside ml-4 mb-2">
                            <li>9 hónapig érlelt mangalica sonka</li>
                            <li>Zakuszka csatos üvegben, sajt, friss zöldségek</li>
                            <li>Friss házi  kenyér</li>
                          </ul>

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
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-[#327bab] bg-[#ebf2f9] rounded-lg hover:bg-[#d1e4f5] focus:outline-none focus-visible:ring focus-visible:ring-[#5091cb] focus-visible:ring-opacity-75">
                      <span className='text-xl'>Tombola</span>
                      <ChevronDown
                        className={`${open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-[#327bab]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>A bálbelépő ára 1 darab tombolaszelvényt/fő tartalmaz.</p>
                      <p>A tombolán 14 darab nagy értékű nyereményt sorsolunk ki, összesen kb. 2 millió forint értékben!</p>
                    </Disclosure.Panel>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 mb-3">
                      <p className='font-bold mb-3'>Fődíj:</p>
                      <ul>
                        <li>Freestyle Világkupa hétvége két fő részére Kreischberg/Murau régióban,
                          2025. január 10-12.
                          2 éjszaka félpanzióval, kétágyas szobában
                          <br/>
                        3 napos síbérlet Kreischberg/Lachtalra
                        <br/>
                        Belépés a VIP területre Snowboard Big World Cup 2025. január 11.</li>
                      </ul>
                    </Disclosure.Panel>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p className='font-bold mb-3'>Nyeremények:</p>
                      <ul>
                        <li>- Honda CR-V 2 hetes tesztelési lehetőség a téli szünetben</li>
                        <li>- Mátraszentistván 2024/2025 szezonbérlet 1 főre</li>
                        <li>- Mátraszentistván 2 napos síbérlet 4 fő részére (2 felnőtt, 2 gyerek)</li>
                        <li>- 100.000.- forintos vásárlási HEAD síléc utalvány a TandT üzletben</li>
                        <li>- Csáki-Maronyák Éva sítémájú festmény (kb. 100.000 forint értékben)</li>
                        <li>- Mondial Assistance: 2 darab nagy értékű utazóbőrönd</li>
                        <li>- Két darab Fundango (női és férfi) szabadon választható sídzseki</li>
                        <li>- 100.000.- forintos DOMEX szőnyegvásárlási utalvány</li>
                        <li>- Donovaly 4 főre szóló 1 napos síbérlet</li>
                        <li>- Nagyvillám Sípálya (Visegrád) 1 napos síbérlet 4 főre</li>
                        <li>- 10 db Zemplén Kalandpark Nemzeti összetartozás hídjára belépő (50.000,- forint)</li>
                        <li>- 1 db síoktatásra szóló utalvány a Wax Klub síiskolába (65.000,-forint)</li>
                        <li>- Hotel Narád (Mátraszentimre) félpanziós szállás 2 éjszaka 2 főre</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-[#327bab] bg-[#ebf2f9] rounded-lg hover:bg-[#d1e4f5] focus:outline-none focus-visible:ring focus-visible:ring-[#5091cb] focus-visible:ring-opacity-75">
                      <span className='text-xl'>Kiállítás</span>
                      <ChevronDown
                        className={`${open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-[#327bab]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>A Síbál napján a bálterem feletti galériában Csáki-Maronyák Éva
                        festőművész síelés tematikájú és havas tájképei lesznek megtekinthetőek.</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-[#327bab] bg-[#ebf2f9] rounded-lg hover:bg-[#d1e4f5] focus:outline-none focus-visible:ring focus-visible:ring-[#5091cb] focus-visible:ring-opacity-75">
                      <span className='text-xl'>Szálláslehetőségek a közelben</span>
                      <ChevronDown
                        className={`${open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-[#327bab]`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <b>Kati Zimmer</b>
                      <p>Budakalász</p>
                      <a className='underline' href='mailto:kati.zimmer.budakalasz@gmail.com'>kati.zimmer.budakalasz@gmail.com</a>
                      <p>Telefon: 06 26 341 290</p>
                      <br />
                      <b>Alfréd Panzió</b>
                      <p>Budakalász</p>
                      <a className='underline' target='_blank' href='https://maps.app.goo.gl/Lz7mULaLSM8u4SSFA'>1038 Budapest Vasút sor 20.</a>
                      <br /><a className='underline' href='mailto:info@alfredpanzio.hu'>info@alfredpanzio.hu</a>
                      <p>Telefon: 06 30 525 5832</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </section>

          <section id="tamogatokEsPartnerek" ref={sectionRefs.tamogatokEsPartnerek} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-[#327bab] text-center">Támogatók és Partnerek</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Chernel István Sí és Turisztikai Klaszter", url: "http://www.sieljitthon.hu/", img: klaszter },
                { name: "Magyar Sí Szövetség", url: "http://www.skihungary.hu/", img: msz },
                { name: "Honda", url: "http://www.honda.hu/", img: honda },
                { name: "Síoktatók Magyarországi Szövetsége", url: "https://sioktatas.hu/", img: smsz },
                { name: "Sípark Mátraszentistván", url: "https://sipark.hu/", img: sipark },
                { name: "Murau Steiermark", url: "https://www.steiermark.com/de/Murau", img: murau },
                { name: "Kreischberg Murau", url: "https://www.kreischberg.at/hu/", img: kreischberg },
                { name: "Skioutlet.hu", url: "https://www.skioutlet.hu/", img: skioutlet },
                { name: "PARKSNOW Donovaly", url: "https://www.parksnow.sk/teli/hu/park-snow-donovaly", img: parksnow },
                { name: "Marosport /FUNDANGO", url: "https://www.fundango.hu/", img: fundango },
                { name: "Tandtsport Sí és Snowboard Központ", url: "https://tandtsport.hu/", img: tandt },
                { name: "Csáki-Maronyák Éva festőművész", url: "https://www.csakimaronyak.hu/", img: evafest },
                { name: "Osztrák Idegenforgalmi Képviselet", url: "https://www.austria.info/hu", img: osster },
                //{ name: "Lengyel Idegenforgalmi Szervezet", url: "https://www.lengyelorszag.travel/hu", img: polska  },
                { name: "Mondial Assistance", url: "https://www.mondial-assistance.hu/", img: mondial },
                { name: "Síelők.hu", url: "https://sielok.hu/", img: sielok },
                { name: "Domex Laminált padló és szőnyeg áruház", url: "https://domexszonyeg.hu/", img: domex },
                //{ name: "Magyar Vitorlás Szövetség", url: "https://www.hunsail.hu/", img: mvsz  },
                { name: "Nagyvillám Visegrádi sípálya", url: "https://www.visegradsipalya.hu/", img: nagyvillam },
                { name: "Zemplén Kalandpark", url: "https://www.zemplenkalandpark.hu/", img: zemplen },
                { name: "Hotel Narád", url: "https://narad.accenthotels.com/hu", img: narad },
                { name: "Wax Klub", url: "https://waxklub.hu/", img: wax  },
                { name: "ELEVEN Sportclub Egyesület", url: "https://elevenhungary.hu/", img: eleven }
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center"
                >
                  <img src={partner.img} alt={`${partner.name} logo`} className="w-auto h-16 pl-4 pr-4 object-contain mb-2" />
                  <span className="text-[#5091cb] font-medium text-center text-sm">{partner.name}</span>
                </a>
              ))}
            </div>
          </section>

          <section id="arak" ref={sectionRefs.arak} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#327bab] text-center">Árak</h2>
            <div className="bg-[#8ab5dc] text-white rounded-lg p-8 shadow-lg">
              <p className="text-4xl font-bold mb-2 text-center">38.000 Ft</p>
              <p className="mb-3 text-center text-sm text-white-600">(Az ár tartalmazza az ÁFA-t)</p>
              <p className=" mb-6 text-center">A bálbelépő az alábbiakat tartalmazza</p>
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
                  <span>Svédasztalos vacsora</span>
                </div>
              </div>
            </div>
          </section>

          <section id="regisztracio" ref={sectionRefs.regisztracio} className="mb-12 bg-white rounded-lg shadow-md p-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#327bab]">Regisztráció</h2>
              {/*<p className="mt-4 text-xs text-gray-600 mb-2">Regisztrációs határidő: a létszámkapacitás beteltéig</p>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Név*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out"
                    />
                    <ValidationError
                      prefix="name"
                      field="name"
                      errors={state.errors}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail cím*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out"
                    />
                    <ValidationError
                      prefix="email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefonszám</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out"
                    />
                    <ValidationError
                      prefix="phone"
                      field="phone"
                      errors={state.errors}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="billing" className="block text-sm font-medium text-gray-700 mb-1">Számlázási cím (név, cím, adószám)</label>
                  <textarea
                    id="billing"
                    name="billing"
                    rows={3}
                    value={formData.billing}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out resize-none"
                  ></textarea>
                  <ValidationError
                    prefix="billing"
                    field="billing"
                    errors={state.errors}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="plusOne"
                      checked={formData.plusOne}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <ValidationError
                      prefix="plusOne"
                      field="name"
                      errors={state.errors}
                    />
                    <span className="text-sm font-medium text-gray-700">Plusz egy fő</span>
                  </label>
                </div>
                {formData.plusOne && (
                  <div>
                    <label htmlFor="plusOneName" className="block text-sm font-medium text-gray-700 mb-1">Plusz egy fő neve</label>
                    <input
                      type="text"
                      id="plusOneName"
                      name="plusOneName"
                      value={formData.plusOneName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#5091cb] focus:border-transparent transition duration-150 ease-in-out"
                    />
                    <ValidationError
                      prefix="plusOneName"
                      field="plusOneName"
                      errors={state.errors}
                    />
                  </div>
                )}
                <p className="mt-4 text-xs text-gray-600">
                  *Kötelező mező
                </p>
                <div className="flex justify-center">
                  <button type="submit" disabled={state.submitting} className="px-4 py-2 bg-[#5091cb] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-[#327bab] focus:outline-none focus:ring-2 focus:ring-[#5091cb] focus:ring-offset-2 transition duration-150 ease-in-out">
                    Regisztráció
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-xs text-gray-600">
              A regisztráció után a Schieszl Borház Kft. a számlát e-mailben küldi.
              </p>*/}
              A regisztráció lezárult.
              Esetleges kérdéseivel a feher@skioutlet.hu e-mail írhatnak.
            </div>
            <img src={imageInside} className='rounded-lg' alt="Inside image" />
          </section>

          <section id="kapcsolat" ref={sectionRefs.kapcsolat} className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4 text-[#327bab]">Kapcsolat</h2>
            <a href='https://skioutlet.hu' target="_blank"><h3 className="text-xl font-semibold mb-2">Lavina-Sport Kft.</h3></a>
            <p>1027 Budapest, Margit krt. 46.</p>
            <p>Email: info@skioutlet.hu</p>
            <p className="mt-4">Esetleges asztalültetési igényeket e-mailben kérjük jelezni.</p>
            <a href='https://schieszl.hu' target="_blank"><h3 className="text-xl font-semibold mt-6 mb-2">Schieszl Vendéglő és Borház</h3></a>
            <p>2011 Budakalász, Budai út 83.</p>
          </section>
        </main>
      </div>

      <div className="bg-[#327bab] text-white py-16 text-center">
        <div className="max-w-[1000px] mx-auto px-4">
          <p className="text-2xl font-bold mb-4">Síbál 2024</p>

          <p className="text-lg mb-2">A szervezők a programváltozás jogát fenntartják.</p>
          <p className="text-sm">© 2024 Lavina-Sport Kft. Minden jog fenntartva.</p>
        </div>
      </div>
    </div >
  )
}

export default SibalWebsite