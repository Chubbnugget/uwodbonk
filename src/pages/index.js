import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--clean', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        
        {/* CHANGED THIS LINE TO USE searchWrapper */}
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="UWODBonk Quest and Item Database">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            
            {/* Box 1: Newest Quests */}
            <div className="col col--4">
              <div className="card shadow--md" style={{height: '100%'}}>
                <div className="card__header">
                  <h3>📜 Newest Quests</h3>
                </div>
                <div className="card__body">
                  <ul style={{listStyle: 'none', padding: 0}}>
                    <li><Link to="/docs/quests/new-quest-1">• Mystery of the High Seas</Link></li>
                    <li><Link to="/docs/quests/new-quest-2">• Merchant's Dilemma</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Box 2: Last Updated */}
            <div className="col col--4">
              <div className="card shadow--md" style={{height: '100%'}}>
                <div className="card__header">
                  <h3>🔄 Last Updated</h3>
                </div>
                <div className="card__body">
                   <ul style={{listStyle: 'none', padding: 0}}>
                    <li>• Item: Spicy Curry (2 mins ago)</li>
                    <li>• Quest: Baltic Trade (10 mins ago)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Box 3: Featured Items */}
            <div className="col col--4">
              <div className="card shadow--md" style={{height: '100%'}}>
                <div className="card__header">
                  <h3>⭐ Featured Items</h3>
                </div>
                <div className="card__body">
                  <p>Hand-picked community favorites for this week's events.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}