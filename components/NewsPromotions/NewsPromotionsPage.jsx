"use client";

import { useMemo, useState } from "react";

import NewsSidebar from "./NewsSidebar";
import PromoSlider from "./PromoSlider";
import NewsGrid from "./NewsGrid";

const NewsPromotionsPage = ({ newsItems = [], categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const promoItems = useMemo(() => {
    return newsItems.filter((item) => item.type === "promotion");
  }, [newsItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return newsItems;
    }

    return newsItems.filter((item) => item.type === activeCategory);
  }, [newsItems, activeCategory]);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <div className="mb-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-medium text-dark md:text-5xl">
              Новости и акции
            </h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <NewsSidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="min-w-0">
            <PromoSlider items={promoItems} />

            <section className="mt-10">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="h-[0.25px] bg-dark/40 mb-5 w-full"></div>
              </div>

              <NewsGrid items={filteredItems} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPromotionsPage;
