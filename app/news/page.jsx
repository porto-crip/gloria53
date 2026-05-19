import NewsPromotionsPage from "@/components/NewsPromotions/NewsPromotionsPage";
import { categories, newsItems } from "@/data/news";

export default function NewsPage() {
  return <NewsPromotionsPage newsItems={newsItems} categories={categories} />;
}
