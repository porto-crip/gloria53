import Link from "next/link";

import { ArrowRight } from "@/icons/ArrowRight";

const NewsSidebar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <aside className="h-max lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-[32px] border border-dark10 bg-white shadow-sm">
        <div className="border-b border-dark10 p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">
            Навигация
          </p>

          <h2 className="mt-2 text-2xl font-medium text-dark">
            Новости и акции
          </h2>
        </div>

        <nav className="p-3">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`group flex min-w-max items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left transition lg:w-full lg:min-w-0 ${
                    isActive
                      ? "bg-dark text-white"
                      : "bg-transparent text-dark hover:bg-dark10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="mt-5 overflow-hidden rounded-[32px] border border-dark15 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-dark50">
              Подбор квартиры
            </p>

            <h3 className="mt-2 text-xl font-medium leading-tight text-dark">
              Поможем сузить выбор
            </h3>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </span>
        </div>

        <p className="text-sm leading-6 text-dark80">
          Подскажем по планировкам, этажам и актуальным условиям покупки без
          лишних звонков.
        </p>

        <div className="mt-5 grid gap-2">
          <div className="flex items-center gap-2 rounded-2xl bg-dark10 px-3 py-2 text-sm text-dark80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Подберём варианты под бюджет
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-dark10 px-3 py-2 text-sm text-dark80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Расскажем про акции и сроки
          </div>
        </div>

        <Link
          href="/apartments"
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-4xl bg-dark px-5 text-sm font-medium text-white transition hover:bg-accent active:scale-[0.98]"
        >
          Смотреть квартиры
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
};

export default NewsSidebar;
