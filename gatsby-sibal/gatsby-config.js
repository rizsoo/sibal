/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Síbál 2026`,
    description: `Síbál 2026. november 28-án, 18:00–24:00 a mátraházai Lifestyle Hotel Mátrában. Belépő: 29.000 Ft/fő. Jelentkezés november 13-ig.`,
    siteUrl: `https://www.sibal.hu`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Síbál',
        short_name: 'Síbál',
        start_url: '/',
        display: 'standalone',
        background_color: '#ebf2f9',
        theme_color: '#327bab',
        icon: 'src/images/logo_sibal_2.png',
      }
    }
  ],
  trailingSlash: 'always',
}
