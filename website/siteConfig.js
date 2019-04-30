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
  tagline: 'RViz for the web',
  url: 'https://zethus.rapyuta.io',
  baseUrl: '/',
  projectName: 'zethus',
  organizationName: 'rapyuta-robotics',
  headerLinks: [
    { href: '/demo/', label: 'Demo' },
    { doc: 'about-what-is-zethus', label: 'Docs' },
    { page: 'help', label: 'Help' },
    { blog: true, label: 'Blog' },
  ],
  headerIcon: 'img/zethus_logo.svg',
  footerIcon: 'img/zethus_mark_white.png',
  favicon: 'img/zethus_mark.ico',
  colors: {
    primaryColor: '#222222',
    secondaryColor: '#444444',
  },
  disableHeaderTitle: true,
  copyright: `Copyright © ${new Date().getFullYear()} Rapyuta Robotics Pvt. Ltd`,
  highlight: {
    theme: 'javascript',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    '/script/particles.min.js',
  ],
  onPageNav: 'separate',
  cleanUrl: true,
  // ogImage: 'img/undraw_online.svg',
  // twitterImage: 'img/undraw_tweetstorm.svg',
  enableUpdateTime: true,
  repoUrl: 'https://github.com/rapyuta-robotics/zethus',
};

module.exports = siteConfig;
