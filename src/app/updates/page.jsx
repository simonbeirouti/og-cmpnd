import { allUpdates } from 'contentlayer/generated'
import Link from 'next/link'
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import './updates.css'

export const metadata = {
  title: 'Updates',
  description: 'Latest updates and news from Compound',
}

export default function UpdatesPage() {
  const sortedUpdates = allUpdates.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <section className="updates">
      <div className="container">
        <div className="updates-container">

          <section className="header-section">
            <ShuffleText as="h1" text="Updates" />
          </section>

          <div className="updates-list">
            {sortedUpdates.map((update) => (
              <article key={update._id} className="update-article">
                <Link href={update.url} className="update-link">
                  <div className="update-content">
                    {update.thumbnailImage && (
                      <img
                        src={update.thumbnailImage}
                        alt={update.title}
                        className="update-thumbnail"
                      />
                    )}
                    <div className="update-text">
                      <h2 className="updates-title">{update.title}</h2>
                      <p className="update-date">
                        {new Date(update.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="update-description">{update.description}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
