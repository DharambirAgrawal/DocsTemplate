import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Main search engines
        userAgent: '*',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/category/*',
          '/sitemap.xml',
          '/favicon.ico',
          '/robots.txt',
          '/manifest.json',
          '/about/*',
        ],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/auth/*',
          '/api/*',
          '/*?*', // Prevent crawling of search queries and filtered results
          '/*/preview', // Prevent crawling of preview pages
          '/*.json', // Prevent crawling of JSON data files
          '/private/*',
          '/admin/*',
          '/draft/*',
          '/temp/*',
          '/*.php$', // Block non-existent PHP files
          '/*.sql$', // Block any exposed database files
          '/*.md$', // Block markdown files
          '/wp-*', // Block WordPress-related scans
          '/feed', // Block feed URLs unless you use them
          '/cgi-bin/',
          '/bin/',
          '/log/*',
          '/tmp/*',
          '/cache/*',
        ],
      },
      {
        // Googlebot specific rules
        userAgent: 'Googlebot',
        allow: ['/', '/blog', '/blog/*', '/category/*'],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/auth/*',
          '/api/*',
          '/private/*',
        ],
        crawlDelay: 1,
      },
      {
        // Bingbot specific rules
        userAgent: 'Bingbot',
        allow: ['/', '/blog', '/blog/*', '/category/*'],
        disallow: [
          '/dashboard',
          '/dashboard/*',
          '/auth/*',
          '/api/*',
          '/private/*',
        ],
        crawlDelay: 2,
      },
      {
        // Rules for archive bots
        userAgent: 'Archive.org_bot',
        allow: ['/', '/blog', '/category'],
        disallow: ['/dashboard', '/auth', '/api'],
        crawlDelay: 3,
      },
      {
        // Block known malicious bots
        userAgent: [
          'PetalBot',
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'HTTrack',
          'WinHTTrack',
          'WebCopier',
          'Wget',
          'Offline Explorer',
          'Website Extractor',
          'WebZIP',
          'WebCopy',
          'WebStripper',
          'WebReaper',
          'Teleport Pro',
          'Xaldon WebSpider',
          'Zao',
          'Zeus',
          'ZyBorg',
        ],
        disallow: ['/'],
      },
    ],
    // Update with your actual domain
    sitemap: `${process.env.APP_URL}/sitemap.xml`,
    host: process.env.APP_URL + '',
  };
}
