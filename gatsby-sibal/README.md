# Síbál

Gatsby-alapú rendezvényoldal, React 18-cal és Tailwind CSS 3-mal.

## Fejlesztés

Node.js 24 LTS és npm 11 szükséges. A Node-verziót a [.nvmrc](.nvmrc),
a telepíthető csomagverziókat a [package-lock.json](package-lock.json) rögzíti.
Az egységes csomagkezelő npm; Yarn-lockfájlt ne generáljunk vagy használjunk.

```powershell
Set-Location .\gatsby-sibal
npm ci
npm run develop
```

A fejlesztői oldal: http://localhost:8000.
Függőség- vagy Gatsby-konfigurációváltozás után indítsuk újra a fejlesztői szervert.

A telepített függőségekkel a fejlesztői szerver `yarn develop` paranccsal is
indítható. A `packageManager` mezőt szándékosan nem rögzítjük npm-re, mert
a Yarn Classic ilyenkor a script futtatását is elutasítja. A függőségek
telepítéséhez és frissítéséhez továbbra is npm-et használjunk.

## Oldalak

- `/`: a közelgő esemény 2026. november 28-án, 18:00–24:00, a mátraházai Lifestyle Hotel Mátra
  szervezésében, a Sí Klaszter szakmai támogatásával. A meghívó alapján
  vacsora, élőzene, DJ, táncos műsor és tombola várható.
  Belépő: 29.000 Ft/fő, svédasztalos vacsorával és 6 órás korlátlan
  alkoholmentes italcsomaggal; alkoholos italok külön fizetendők.
  Szállás: 65.000 Ft/2 fő/1 éj, reggelivel, késői kijelentkezéssel 12:00-ig,
  wellnesshasználattal 16:00-ig.
- `/archivum/`: korábbi rendezvények listája.
- `/archivum/2024/`: a 2024-es esemény eredeti adatai, lezárt regisztrációval.
- `/404.html`: saját hibaoldal.

A főoldal „Korábbi Síbálok” része közvetlenül listázza az eseményeket,
és azok részletes oldalára vezet; a menü is ehhez a főoldali listához görget.
A korábbi `/archivum/` cím továbbra is elérhető a meglévő hivatkozásokhoz.

A 2026-os részleteket a [főoldalon](src/pages/index.js), a korábbi eseményt
az [archív oldalon](src/pages/archivum/2024.js) lehet szerkeszteni.
A 2026-os jelentkezés e-mailben történik november 13-ig:
sales@lifestylehotelmatra.hu. Nincs űrlap vagy Formspree-integráció.
A böngésző az alapértelmezett levelezőt nyitja meg; a honlap nem küld és nem tárol
jelentkezési adatokat.

## Navigáció és akadálymentesség

A 2026-os oldal meghívóhoz illeszkedő fenyőzöld–arany–krém arculatot használ,
helyi rendszerbetűkkel és Georgia címsorokkal. A `SiteLayout` `theme="alpine"`
beállítása kapcsolja be a [globális CSS-ben](src/styles/global.css) elkülönített
stílusokat; az archívum korábbi arculata változatlan. A meghívó asztali nézetben
a jobb oldali 40%-os oszlopban, mobilon a szöveg alatt jelenik meg.

A [közös elrendezés](src/components/site-layout.js) valódi hash-hivatkozásokat
használ. A fejléc mért magassága adja a görgetési eltolást. A menüpontokat a
szekciók felső pozíciója alapján jelöli aktívnak, így a hosszú, kinyitott program
esetén is működnek. Új szekció esetén adjunk hozzá egyedi `id`-t, `tabIndex={-1}`-et
és megfelelő bejegyzést az oldal `navItems` listájához.

A mobilmenü Escape-pel zárható, visszaadja a fókuszt a menügombnak, és szekcióra
navigáláskor a célszekció kap fókuszt. A navigáció a hosszú archív menü miatt
1280 px alatt összecsukható. A csökkentett mozgást kérő beállítás kikapcsolja
a sima görgetést.

## Képek és metaadatok

Az eredeti képek a [src/images](src/images) könyvtárban maradnak.
A Gatsby Image és Sharp build közben készít reszponzív, WebP/AVIF és kompatibilis
tartalék változatokat. A [képi komponens](src/components/optimized-image.js)
a logókat legfeljebb 320 px, a fotókat legfeljebb 960 px szélességgel dolgozza fel.
A képek méretaránya fenntartott, alapértelmezetten késleltetetten töltődnek;
az első logó kivétel. Az SVG-logó megmarad vektorosnak.

Az oldalankénti Gatsby `Head` exportok a [SEO-komponensen](src/components/seo.js)
keresztül állítják a magyar nyelvet, címet, leírást, canonical URL-t és megosztási
metaadatokat. A megosztási kép a [sibal_header.jpg](src/images/sibal_header.jpg),
amelyet az Open Graph és Twitter image metaadatok is használnak.
Az éles domain a [Gatsby-konfigurációban](gatsby-config.js) található;
domainváltáskor a [robots.txt](static/robots.txt) és a 2024-es strukturált eseményadat
URL-jét is frissíteni kell. A sitemap automatikusan készül. A 2026-os eseményhez
csak a tényleges adatok megadása után adjunk strukturált Event-adatot.

## Production build és tesztek

```powershell
npm run build
npx playwright install chromium
npm test
```

A tesztek a production buildet ellenőrzik. A Playwright automatikusan indít és
leállít egy helyi szervert a http://127.0.0.1:9000 címen; tesztelés előtt újra kell
buildelni a módosított forrást. Az ellenőrzések kiterjednek a lapokra, a
jelentkezési linkre, a hash-navigációra, a böngészőelőzményekre, a hosszú program
aktív menüpontjára, a mobilmenüre, a metaadatokra és a képek méretére/formátumára.

Kézi production-előnézet:

```powershell
npm run serve
```

Kisebb memóriájú környezetben a build előtt beállítható:

```powershell
$env:GATSBY_CPU_COUNT = "2"
```

A [GitHub Actions workflow](../.github/workflows/validate.yml) tiszta npm-telepítést,
production buildet és Chromium-teszteket futtat.

A lockfájlban a `msgpackr` kompatibilis 1.12-es változata szerepel: a régi
1.7-es változat Node 24 alatt bufferhibával állította le a Gatsby buildjét.
Az npm a Gatsby belső, kísérleti `react-server-dom-webpack` csomagjához peer
dependency figyelmeztetést adhat; emiatt ne váltsunk kísérleti React-verzióra.
