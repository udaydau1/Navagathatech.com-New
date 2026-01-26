import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',      // Don't crawl API routes
                    '/admin/',    // Don't index admin pages
                    '/login',     // Don't index login page
                ],
            },
        ],
        sitemap: 'https://www.navagathatech.com/sitemap.xml',
    }
}
