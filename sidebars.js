// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
skillSidebar: [
    {
      type: 'category',
      label: 'Adventure Skills',
      link: {
        type: 'doc',
        id: 'Categories/39', 
      },
      items: [], // Leave empty or omit if there are no sub-pages
    },
    {
      type: 'category',
      label: 'Trade Skills',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'Categories/40',
      },
      items: [], // Leave empty or omit if there are no sub-pages
    },
    {
      type: 'category',
      label: 'Battle Skills',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'Categories/41',
      },
      items: [], // Leave empty or omit if there are no sub-pages
    },
  ],
};

export default sidebars;