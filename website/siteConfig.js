/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'Zethus',
  tagline: 'Documentation for Zethus, RViz for the web',
  url: 'https://zethus.rapyuta.io',
  baseUrl: '/',
  projectName: 'zethus',
  organizationName: 'rapyuta-robotics',
  headerLinks: [
    { href: '/demo/', label: 'Demo' },
    { doc: 'doc1', label: 'Docs' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',
  colors: {
    primaryColor: '#8f879c',
    secondaryColor: '#645e6d',
  },

  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */
  copyright: `Copyright © ${new Date().getFullYear()} Rapyuta Robotics Pvt. Ltd`,
  highlight: {
    theme: 'javascript',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  onPageNav: 'separate',
  cleanUrl: true,
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
  enableUpdateTime: true,
  repoUrl: 'https://github.com/rapyuta-robotics/zethus',
};

module.exports = siteConfig;
