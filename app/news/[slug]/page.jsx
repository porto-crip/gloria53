import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight } from "@/icons/ArrowRight";
import { getNewsItemBySlug, newsItems } from "@/data/news";

export const generateStaticParams = () => {
  const slugs = [...new Set(newsItems.map((item) => item.slug))];

  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const item = getNewsItemBySlug(slug);

  if (!item) {
    return {
      title: "Материал не найден",
    };
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
};

const getLatestNews = (currentSlug) => {
  const uniqueItems = [];
  const usedSlugs = new Set();

  newsItems.forEach((newsItem) => {
    if (newsItem.slug === currentSlug || usedSlugs.has(newsItem.slug)) {
      return;
    }

    usedSlugs.add(newsItem.slug);
    uniqueItems.push(newsItem);
  });

  return uniqueItems.slice(0, 3);
};

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = getNewsItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const latestNews = getLatestNews(slug);
  const paragraphs = item.content || [item.excerpt].filter(Boolean);

  return (
    <main className="container-padding">
      <article className="py-10 lg:py-16">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-dark50 transition hover:text-accent"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Назад к новостям
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,820px)_360px] lg:items-start xl:grid-cols-[minmax(0,880px)_400px]">
          <div>
            <header>
              <h1 className="max-w-4xl text-4xl font-medium leading-tight text-dark md:text-5xl">
                {item.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-dark50">
                <time>
                  {item.date}
                </time>

                <span className="h-1 w-1 rounded-full bg-dark25" />

                <span className="text-accent">
                  {item.label}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-dark10 text-accent">
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
              </div>
            </header>

            <div className="mt-10 max-w-3xl space-y-5 text-base leading-8 text-dark80 sm:text-lg">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="mt-20 rounded-4xl bg-dark10 p-6 sm:p-8 lg:mt-40">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-dark50">
                    Коротко о материале
                  </p>

                  <h2 className="mt-3 text-2xl font-medium leading-tight text-dark">
                    {item.excerpt || item.title}
                  </h2>
                </div>

                <Link
                  href="/news"
                  className="inline-flex h-11 w-max items-center justify-center gap-2 rounded-4xl bg-white px-5 text-sm font-medium text-dark transition hover:bg-accent hover:text-white active:scale-[0.98]"
                >
                  Все новости
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-24">
            <section className="rounded-4xl bg-[#F4F5F8] p-6 sm:p-8">
              <h2 className="text-xl font-medium text-dark">
                Последние новости
              </h2>

              <div className="mt-6 grid gap-5">
                {latestNews.map((newsItem) => (
                  <Link
                    key={newsItem.slug}
                    href={`/news/${newsItem.slug}`}
                    className="group block"
                  >
                    <h3 className="text-base font-medium leading-6 text-dark transition group-hover:text-accent">
                      {newsItem.title}
                    </h3>

                    <time className="mt-2 block text-sm text-dark50">
                      {newsItem.date}
                    </time>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
