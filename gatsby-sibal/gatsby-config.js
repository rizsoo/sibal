/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Síbál 2024`,
    description: `Örömmel tájékoztatjuk, hogy a Lavina-Sport Kft., amely immár 32 éve minden évben megszervezi az Országos Amatőr Gyermek Síbajnokságot, 2024. november 30-án, szombaton megrendezi az első, Hagyományteremtő Szezonnyitó Síbált.`,
    image: `./src/images/logo_sibal_3.png`,
    siteUrl: `https://www.sibal.hu`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/logo_sibal_2.png"
      }
    }
  ],
  
}
