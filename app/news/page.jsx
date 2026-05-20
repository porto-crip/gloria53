import { prisma } from "@/lib/prisma";
import NewsPromotionsPage from "@/components/NewsPromotions/NewsPromotionsPage";
import { categories } from "@/data/news";

export const dynamic = "force-dynamic";

const formatNewsDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const serializeNewsItem = (item) => ({
  id: item.id,
  type: item.type,
  label: item.label,
  title: item.title,
  excerpt: item.excerpt,
  date: formatNewsDate(item.publishedAt),
  image: item.image,
  slug: item.slug,
  featured: item.isFeatured,
});

const getNewsPageData = async () => {
  const newsItems = await prisma.newsItem.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        publishedAt: "desc",
      },
    ],
  });

  return newsItems.map(serializeNewsItem);
};

export default async function NewsPage() {
  const newsItems = await getNewsPageData();

  return <NewsPromotionsPage newsItems={newsItems} categories={categories} />;
}
