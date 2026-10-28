import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function OptimizedImage({ name, alt, ...props }) {
  const data = useStaticQuery(graphql`
    query OptimizedSiteImages {
      photos: allFile(filter: {
        sourceInstanceName: { eq: "images" }
        name: { in: ["sibal_5", "sibal_6", "terem"] }
      }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 960
              layout: CONSTRAINED
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
              quality: 80
            )
          }
        }
      }
      logos: allFile(filter: {
        sourceInstanceName: { eq: "images" }
        extension: { in: ["jpg", "png"] }
        name: { nin: ["sibal_5", "sibal_6", "terem"] }
      }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 320
              layout: CONSTRAINED
              formats: [AUTO, WEBP, AVIF]
              placeholder: NONE
              quality: 85
            )
          }
        }
      }
    }
  `)
  const file = [...data.photos.nodes, ...data.logos.nodes].find((node) => node.name === name)
  const image = file && getImage(file.childImageSharp)
  if (!image) throw new Error(`Missing optimized image: ${name}`)

  return <GatsbyImage image={image} alt={alt} {...props} />
}
