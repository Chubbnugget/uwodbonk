import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'UWODBonk',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://uwo.bonk.town',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chubbnugget', // Usually your GitHub org/user name.
  projectName: 'uwodbonk', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  trailingSlash: true,

  //i18n: {
    //defaultLocale: 'en',
    //locales: ['en'],
  //},
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: true,
    },
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: false,
      rspackPersistentCache: false,
      ssgWorkerThreads: true,
      mdxCrossCompilerCache: true,
    },
    experimental_storage: {
      type: 'localStorage',
      namespace: true,
    },
    experimental_router: 'browser',
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Chubbnugget/uwodbonk',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
      algolia: {
        appId: 'BYEYO94311',
        apiKey: '00d9c74be1902e7bdda61dbd1e85f34b',
        indexName: 'uwodbonk',
        contextualSearch: true,
     },
      // Replace with your project's social card
      image: 'img/socialcard.jpg',
      navbar: {
        title: 'UWODBonk',
        logo: {
          alt: 'Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'QuestSidebar',
            position: 'left',
            label: 'Quests',
          },
                    {
            type: 'docSidebar',
            sidebarId: 'TradeGoodSidebar',
            position: 'left',
            label: 'Trade Goods',
          },
                    {
            type: 'docSidebar',
            sidebarId: 'SkillSidebar',
            position: 'left',
            label: 'Skills',
          },
          {
            type: 'docSidebar',
            sidebarId: 'PortSidebar',
            position: 'left',
            label: 'Ports',
          },
          {
            type: 'dropdown',
            label: 'Tools',
            position: 'left',
            items: [
              {
                label: 'Melee Calculator',
                to: '/tools/melee-calculator',
              },
              // Future tools go here:
              // {
              //   label: 'Ship Build Calc',
              //   to: '/tools/ship-calc',
              // },
            ],
          },
          {
            href: 'https://github.com/Chubbnugget/uwodbonk',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Official UWO Discord',
                href: 'https://discord.gg/uwo',
              },
            ],
          },
          {
            title: 'More',  
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Chubbnugget/uwodbonk',
              },
              
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Report a Bug',
                href: 'https://github.com/Chubbnugget/uwodbonk/issues/new',
              },
              {
                label: 'Contact (Email)',
                href: 'mailto:chubbnugget@bonk.town',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} UWODBonk.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
