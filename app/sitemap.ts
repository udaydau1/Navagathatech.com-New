import { MetadataRoute } from 'next'
import { getCaseStudies } from '@/lib/case-studies'
import { getJobs } from '@/lib/jobs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.navagathatech.com'
    const currentDate = new Date()

    // Fetch dynamic data
    const caseStudies = await getCaseStudies()
    const jobs = await getJobs()

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/careers/apply`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/expertise`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Anchor sections for crawl depth
        {
            url: `${baseUrl}/#about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/#capabilities`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        }
    ]

    const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(study => ({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    const careerRoutes: MetadataRoute.Sitemap = jobs.map(job => ({
        url: `${baseUrl}/careers/${job.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...caseStudyRoutes, ...careerRoutes]
}
