import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--clean', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">{siteConfig.title}</Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

// This component only runs in the browser
function HomeContent() {
  const [stats, setStats] = useState({ files: '...', lastUpdate: '...', contributors: [] });

  useEffect(() => {
    const owner = 'Chubbnugget';
    const repo = 'uwodbonk';

    // 1. Fetch Repository Info
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.pushed_at) {
          const date = new Date(data.pushed_at).toLocaleDateString();
          setStats(prev => ({ ...prev, lastUpdate: date }));
        }
      })
      .catch(() => console.warn("GitHub Repo info fetch failed."));

    // 2. Fetch Contributors
    fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setStats(prev => ({ ...prev, contributors: data.slice(0, 5) }));
        }
      })
      .catch(() => console.warn("GitHub Contributors fetch failed."));

    // 3. Fetch File Count (Recursive Tree)
    fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.tree)) {
          const docFiles = data.tree.filter(file => file.path && file.path.endsWith('.md')).length;
          setStats(prev => ({ ...prev, files: docFiles }));
        }
      })
      .catch(() => setStats(prev => ({ ...prev, files: 'N/A' })));
  }, []);

  return (
    <div className="row">
      {/* Box 1: Dynamic Database Stats */}
      <div className="col col--4">
        <div className="card shadow--md" style={{ height: '100%' }}>
          <div className="card__header"><h3>📊 Database Stats</h3></div>
          <div className="card__body">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>📄 <strong>Total Pages:</strong> {stats.files}</li>
              <li>🔄 <strong>Last Push:</strong> {stats.lastUpdate}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Box 2: Quick Tools */}
      <div className="col col--4">
        <div className="card shadow--md" style={{ height: '100%' }}>
          <div className="card__header"><h3>🛠️ Community Tools</h3></div>
          <div className="card__body">
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <Link className="button button--secondary" to="/tools/melee-calculator">
                ⚔️ Melee Calculator
              </Link>
              <Link className="button button--primary" to="#">
                ⚓ Shipbuilding Calculator (Coming Soon...)
              </Link>
              <Link className="button button--primary" to="#">
                🧭 Discovery Calculator (Coming Soon...)
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Box 3: Top Contributors */}
      <div className="col col--4">
        <div className="card shadow--md" style={{ height: '100%' }}>
          <div className="card__header"><h3>🏆 Contributors</h3></div>
          <div className="card__body">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {stats.contributors?.map(user => (
                <a key={user.id} href={user.html_url} target="_blank" rel="noreferrer">
                  <img src={user.avatar_url} style={{ width: '40px', borderRadius: '50%' }} alt={user.login} title={user.login} />
                </a>
              ))}
            </div>
            <p style={{marginTop: '15px'}}><small>Want to help? Submit a PR on GitHub!</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="UWO Database">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
          <BrowserOnly fallback={<div>Loading database stats...</div>}>
            {() => <HomeContent />}
          </BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}