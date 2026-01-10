import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import Heading from '@theme/Heading';
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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [stats, setStats] = useState({ files: '...', lastUpdate: '...', contributors: [] });

  useEffect(() => {
    const owner = 'Chubbnugget';
    const repo = 'uwodbonk';

    // 1. Fetch Repository General Info (for Last Updated)
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(res => res.json())
      .then(data => {
        const date = new Date(data.pushed_at).toLocaleDateString();
        setStats(prev => ({ ...prev, lastUpdate: date }));
      });

    // 2. Fetch Contributors
    fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStats(prev => ({ ...prev, contributors: data.slice(0, 5) }));
      });

    // 3. Fetch File Count (Recursive Tree)
    // We use 'main' or 'master' depending on your default branch name
    fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`)
      .then(res => res.json())
      .then(data => {
        if (data.tree) {
          const docFiles = data.tree.filter(file => file.path.endsWith('.md')).length;
          setStats(prev => ({ ...prev, files: docFiles }));
        }
      })
      .catch(() => setStats(prev => ({ ...prev, files: 'Error' })));
  }, []);

  return (
    <Layout title={`${siteConfig.title}`} description="UWO Database">
      <HomepageHeader />
      <main>
        <div className="container margin-vert--xl">
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
                    <Link className="button button--primary" to="/tools/SB-calculator">
                      ⚓ Shipbuilding Calculator (Coming Soon...)
                    </Link>
                    <Link className="button button--primary" to="/tools/SB-calculator">
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
                    {stats.contributors.map(user => (
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
        </div>
      </main>
    </Layout>
  );
}