import { IconButton, Tooltip } from '@material-ui/core';
import { GitHub, LinkedIn, OpenInNew } from '@material-ui/icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/index.module.css';
import data from '../config/data/cersouza.json';
import { useState } from 'react';

const personAdjectives = [data.person.firstName, ...data.person.adjectives];

let currentAdjectiveIndex = 0;

const Home: NextPage = () => {
  const [personAdjective, setPersonAdjective] = useState(personAdjectives[0]);

  const changeCurrentAdjectiveIndex = () => {
    currentAdjectiveIndex =  personAdjectives.length > currentAdjectiveIndex + 1 ? currentAdjectiveIndex + 1 : 0;
    setPersonAdjective(personAdjectives[currentAdjectiveIndex]);
  };

  return (
    <>
      <Head>
        <title>{ data.person.firstName } | Page</title>
      </Head>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>
            Hello, <br/>
            {`I'm `}
          <Tooltip title={currentAdjectiveIndex <= 1 ? `Wow, how about click here ${ currentAdjectiveIndex ? 'again' : '' } ?` : 'And again ?'}>
              <a onClick={changeCurrentAdjectiveIndex}><u>{personAdjective}</u>.</a>
            </Tooltip>
          </h1>
          <p>{data.person.description}</p>
        </header>
        <main>
          <p>See my most recent projects:</p>
          <div>
            <ul className={styles.projectList}>
              {
                data.projects.map((project) => (
                  <li key={project.name} className={styles.project}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={project.link}
                      className={styles.projectTitle}
                    >
                      <span>{project.name}</span>
                      <OpenInNew />
                    </a>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    {
                      project.stack.length && (
                        <ul className={styles.projectStackLogosList}>
                          {
                            project.stack.map((stack, i) => (
                              <li key={`${project.name}-${stack.name}`}>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={stack.link}
                                >
                                  {stack.name}
                                  { project.stack.length > i + 1 ? ',' : '.' }
                                </a>
                              </li>
                            ))
                          }
                        </ul>
                      )
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        </main>
        <footer>
          <Tooltip title="Go to my LinkedIn page">
            <IconButton
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/cersouza/"
              target="_blank"
            >
              <LinkedIn fontSize="large"/>
            </IconButton>
          </Tooltip>
  
          <Tooltip title="Go to my GitHub page">
            <IconButton
              aria-label="Github"
              href="https://github.com/cersouza"
              target="_blank"
            >
              <GitHub fontSize="large"/>
            </IconButton>
          </Tooltip>
        </footer>
      </div>
    </>
  )
}

export default Home
