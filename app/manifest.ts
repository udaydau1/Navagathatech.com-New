import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Navagatha Tech',
        short_name: 'Navagatha',
        description: 'Next-generation IT services and digital transformation partnership.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/brand-logo.png?v=10',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
