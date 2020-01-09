import React from "react"
import styles from "../css/postTemplate.module.css"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
const postTemplate = ({ data }) => {
  const { body } = data.mdx
  const { title, date, author, image } = data.mdx.frontmatter
  const img = image.childImageSharp.fluid

  return (
  <layout>
    <section className={styles.template}>
      <Link to="/" className={styles.link}>
        back to all posts
      </Link>
      <div className={styles.info}>
        <h1>{title}</h1>
        <h4>
          <span>by {author}</span> / <span>{date}</span>
        </h4>
      </div>
      <Image fluid={img} />
      <div className={styles.content}>
          <MDXRenderer>{body}</MDXRenderer>
      </div>
    </section>
  </layout>
  )
}

export const query = graphql`
  query getPost($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        date(formatString: "MMMMM Do, YYYY")
        author
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`

export default postTemplate
