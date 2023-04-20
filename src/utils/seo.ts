export const titles = {
  home: 'Home',
  generic: 'Welcome',
} as const;

export const descriptions = {
  home: 'Brian Nunez\'s Portfolio Website! Come get to know me!',
  generic: 'Brian Nunez\'s Portfolio Website! Come get to know me!',
} as const;

export const defaultLinkTags = [
  {
    rel: 'icon',
    sizes: '192x192',
    href: '/favicon.svg',
  },
  {
    rel: 'shortcut icon',
    type: 'image/x-icon',
    href: '/favicon.svg', // add image
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/x-icon',
    href: '/favicon.svg', // add image
  },
] as const;

export const linkTags = {
  home: defaultLinkTags,
  generic: defaultLinkTags,
} as const;

export const defaultMetaTags = [
  {
    name: 'author',
    content: 'Brian Nunez',
  },
  {
    name: 'keywords',
    content: '',
  },
  {
    name: 'revisit-after',
    content: '3 days',
  },
  {
    name: 'language',
    content: 'English',
  },
  {
    name: 'robots',
    content: 'index, follow',
  },
] as const;

export const metaTags = {
  home: defaultMetaTags,
  generic: defaultMetaTags,
} as const;

const all = {
  titles,
  descriptions,
  defaultLinkTags,
  linkTags,
  defaultMetaTags,
  metaTags,
};

export default all;
