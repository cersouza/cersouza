import { IconButton, Tooltip } from '@material-ui/core';
import { GitHub, LinkedIn, OpenInNew } from '@material-ui/icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Data from '../config/data/cersouza.json';
import styles from '../styles/index.module.css';

const data: any = Data;

const personAdjectives = [data.person.firstName, ...data.person.adjectives];

let currentAdjectiveIndex = 0;


const Home: NextPage = () => {
  const [personAdjective, setPersonAdjective] = useState(personAdjectives[0]);
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

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
        </header>
        <main>
          <p>
            {data.person.description}

            {
              data.person.details && (
                <details>
                  <summary onClick={() => setDetailsIsOpen(!detailsIsOpen)}>
                    {`${detailsIsOpen ? '🙊': '🙈'} See more about me`}
                  </summary>
                    <ul>
                      {
                        Object.keys(data.person.details).map((detailName: any, i) => (
                          <li key={detailName}>
                            <strong>{detailName}: </strong>
                            {data.person.details[detailName]}
                            { Object.keys(data.person.details).length > i + 1 ? ';' : '.' }
                          </li>
                        ))
                      }
                    </ul>
                </details>
              )
            }
          </p>

          <p>See my most recent projects:</p>
          <div>
            <ul className={styles.projectList}>
              {
                data.projects.map((project: any) => (
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
                        <p>
                          <ul className={styles.projectStackList}>
                            {
                              project.stack.map((stack: any, i: number) => (
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
                        </p>
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
              target="_blank"
              className={styles.logo}
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/cersouza/"
            >
              <LinkedIn fontSize="large"/>
            </IconButton>
          </Tooltip>
  
          <Tooltip title="Go to my GitHub page">
            <IconButton
              target="_blank"
              aria-label="Github"
              className={styles.logo}
              href="https://github.com/cersouza"
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
