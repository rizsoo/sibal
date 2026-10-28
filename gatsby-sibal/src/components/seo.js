import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import socialImage from '../images/logo_sibal_2.png'

export default function Seo({ title, description, pathname, noIndex = false, schema }) {
  const { site } = useStaticQuery(graphql`
    query SiteSeoMetadata {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)
  const url = new URL(pathname, site.siteMetadata.siteUrl).href
  const image = new URL(socialImage, site.siteMetadata.siteUrl).href

  return (
    <>
      <html lang="hu" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="hu_HU" />
      <meta property="og:site_name" content="Síbál" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Síbál logó" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      {schema && <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>}
    </>
  )
}
