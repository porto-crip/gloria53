import { prisma } from "@/lib/prisma";
import FreemodeSlider from "@/components/Swiper/SwiperFreemode";

const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getMainPageNews = async () => {
  const items = await prisma.newsItem.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { publishedAt: "desc" },
    ],
    take: 8,
  });

  return items.map((item) => ({
    title: item.title,
    excerpt: item.excerpt || "",
    image: item.image || "/images/news/news1.jpg",
    imageAlt: item.title,
    date: formatDate(item.publishedAt),
    label: item.label,
    slug: item.slug,
    type: item.type,
  }));
};

const NewsModule = async () => {
  const newsData = await getMainPageNews();

  if (!newsData.length) return null;

  return (
    <div>
      <h2 className="mb-12 border-b border-dark40 pb-2 text-[28px] font-medium text-dark sm:text-[36px]">
        Новости и акции
      </h2>

      <FreemodeSlider data={newsData} type="news" />
    </div>
  );
};

export default NewsModule;
