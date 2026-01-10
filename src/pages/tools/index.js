import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ToolsIndex() {
  const tools = [
    {
      name: 'Melee Calculator',
      slug: 'melee-calculator',
      description: 'Calculate base and boosted melee stats for UWO combat.'
    },
    // Add more tool objects here as you build them
  ];

  return (
    <Layout title="Tools" description="UWO DB Community Tools">
      <main className="container margin-vert--lg">
        <h1>Community Tools</h1>
        <div className="row">
          {tools.map((tool) => (
            <div key={tool.slug} className="col col--4 margin-bottom--lg">
              <div className="card">
                <div className="card__header">
                  <h3>{tool.name}</h3>
                </div>
                <div className="card__body">
                  <p>{tool.description}</p>
                </div>
                <div className="card__footer">
                  <Link className="button button--primary button--block" to={`/tools/${tool.slug}`}>
                    Open Tool
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}