import { allUpdates } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import UpdatePageClient from './client-page'

// Generate static params for all update pages at build time
export const generateStaticParams = async () => {
  return allUpdates.map((update) => ({
    slug: update._raw.flattenedPath,
  }))
}

// Generate metadata for SEO
export const generateMetadata = async ({ params }) => {
  const { slug } = await params
  const update = allUpdates.find((update) => update._raw.flattenedPath === slug)

  if (!update) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: `Compound | ${update.title}`,
    description: update.description,
    openGraph: {
      title: `Compound | ${update.title}`,
      description: update.description,
      images: [
        {
          url: update.thumbnailImage,
          alt: update.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Compound | ${update.title}`,
      description: update.description,
      images: [update.thumbnailImage],
    },
  }
}

// Server component that fetches data and passes to client component
export default async function UpdatePage({ params }) {
  const { slug } = await params
  const update = allUpdates.find((update) => update._raw.flattenedPath === slug)

  if (!update) {
    notFound()
  }

  return (
    <section>
      <UpdatePageClient update={update} />
    </section>
  )
}
