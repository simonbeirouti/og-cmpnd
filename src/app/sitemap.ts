import type { MetadataRoute } from 'next'
import { allUpdates } from 'contentlayer/generated'

const sitemapURLs = allUpdates.map((update) => ({
  url: update._raw.flattenedPath,
}))

const siteURL = process.env.SITE_URL || 'https://cmpnd.cc'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteURL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sitemapURLs.map((page: { url: string }) => ({
      url: `${siteURL}/${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    }))
  ]
}