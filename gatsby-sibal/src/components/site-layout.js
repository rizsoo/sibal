import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'lucide-react'

const pageLinks = [
  { to: '/', label: 'Síbál 2026' },
  { to: '/#korabbi-sibalok', label: 'Korábbi Síbálok' },
]
const emptyNavItems = []

export default function SiteLayout({ title, year, navItems = emptyNavItems, theme, children }) {
  const [activeSection, setActiveSection] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const updateActiveSection = () => {
      frame = 0
      const offset = headerRef.current.getBoundingClientRect().height + 24
      const sections = navItems.map(({ id }) => document.getElementById(id))
      const visibleSections = sections.filter(Boolean)
      let active = visibleSections[0]?.id || ''

      visibleSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) active = section.id
      })

      if (window.scrollY > 0 &&
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        active = visibleSections[visibleSections.length - 1]?.id || ''
      }
      setActiveSection(active)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }
    const resizeObserver = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        '--header-height', `${headerRef.current.getBoundingClientRect().height}px`
      )
      scheduleUpdate()
    })
    resizeObserver.observe(headerRef.current)
    resizeObserver.observe(mainRef.current)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [navItems])

  useEffect(() => {
    if (!isMenuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  const sectionLinks = (mobile = false) => navItems.map(({ id, label }) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={activeSection === id ? 'location' : undefined}
      className={`${mobile ? 'block w-full text-left' : ''} px-3 py-2 rounded-md transition-colors ${
        activeSection === id ? 'bg-white text-[#327bab]' : 'text-white hover:bg-[#5091cb]'
      }`}
      onClick={() => {
        setIsMenuOpen(false)
        setActiveSection(id)
        document.getElementById(id).focus({ preventScroll: true })
      }}
    >
      {label}
    </a>
  ))

  const navigationLinks = (mobile = false) => pageLinks.map(({ to, label }) => (
    <Link
      key={to}
      to={to}
      className={`${mobile ? 'block' : ''} px-3 py-2 rounded-md text-white hover:bg-[#5091cb]`}
      activeClassName="underline"
      partiallyActive={to !== '/'}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  ))

  return (
    <div className={`min-h-screen bg-[#ebf2f9] ${theme === 'alpine' ? 'theme-alpine' : ''}`}>
      <a href="#main-content" className="skip-link">Ugrás a tartalomra</a>
      <nav aria-label="Fő navigáció" className="sticky top-0 bg-[#327bab] shadow-md z-10 w-full">
        <div ref={headerRef} className="container mx-auto px-4">
          <div className="flex justify-between items-center gap-4 py-4">
            <h1 className="text-white text-3xl font-bold whitespace-nowrap">{title}</h1>
            <div className="hidden xl:flex flex-wrap justify-end items-center gap-1">
              {sectionLinks()}
              {navigationLinks()}
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="xl:hidden text-white hover:text-[#b1cee8] p-2 rounded-md"
              aria-label={isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className="xl:hidden absolute top-full left-0 w-full bg-[#327bab] shadow-md max-h-[70vh] overflow-y-auto"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {sectionLinks(true)}
            {navigationLinks(true)}
          </div>
        </div>
      </nav>
      <div className="max-w-[1000px] mx-auto">
        <main id="main-content" tabIndex={-1} ref={mainRef} className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
      <footer className="bg-[#327bab] text-white py-16 text-center">
        <div className="max-w-[1000px] mx-auto px-4">
          <p className="text-2xl font-bold mb-4">Síbál {year}</p>
          <p className="text-lg mb-2">A szervezők a programváltozás jogát fenntartják.</p>
          <p className="text-sm">© {year} Lavina-Sport Kft. Minden jog fenntartva.</p>
        </div>
      </footer>
    </div>
  )
}
