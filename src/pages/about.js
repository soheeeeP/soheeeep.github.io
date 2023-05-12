import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import TimeStampSection from '../components/timestamp-section';
import ProjectSection from '../components/project-section';
import OpenSourceSection from '../components/open-source-section';
import EducationSection from '../components/education-section';
import AdditionalSection from '../components/additional-section';


function AboutPage({ data }) {
  const metaData = data.site.siteMetadata;
  const { author, about, language } = metaData;
  const { timestamps, opensources, projects, educations, items } = about;
  return (
    <Layout>
      <Seo title="About" />
      <Bio author={author} language={language} />
      <EducationSection educations={educations} />
      <TimeStampSection timestamps={timestamps} />
      <OpenSourceSection opensources={opensources} />
      <ProjectSection projects={projects} />
      <AdditionalSection items={items} />
    </Layout>
  );
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        language
        author {
          name
          bio {
            role
            description
            thumbnail
          }
          social {
            github
            linkedIn
            email
          }
        }

        about {
          timestamps {
            date
            activity
            links {
              post
              github
              demo
              code
            }
          }

          opensources {
            name
            number
            description
            links {
              github
            }
          }
          
          projects {
            title
            description
            techStack
            thumbnailUrl
            links {
              post
              github
              note
            }
          }

          educations {
            name
            date
            degree
            credit
          }

          items {
            title
            date
            agency
            description
          }

        }
      }
    }
  }
`;
