import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Navagatha Tech Pvt. Ltd.',
        short_name: 'Navagatha Tech',
        description: 'Next-generation IT services and digital transformation partnership.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/images/logo_navagatha.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
