import Link from "next/link";

import { logoutAdmin } from "../actions";

const tabs = [
  { href: "/g53-manager", label: "Обзор", id: "overview" },
  { href: "/g53-manager/apartments", label: "Квартиры", id: "apartments" },
  { href: "/g53-manager/news", label: "Новости", id: "news" },
  {
    href: "/g53-manager/built-objects",
    label: "Построенные объекты",
    id: "built-objects",
  },
];

const AdminNav = ({ active = "overview", eyebrow = "Панель управления", title }) => {
  return (
    <header className="border-b border-dark15 pb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-dark md:text-5xl">
            {title}
          </h1>
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="h-11 rounded-4xl border border-dark15 px-5 text-sm font-medium text-dark transition hover:border-dark hover:bg-dark hover:text-white"
          >
            Выйти
          </button>
        </form>
      </div>

      <nav className="mt-8 overflow-x-auto">
        <div className="flex min-w-max gap-2 border-b border-dark15">
          {tabs.map((tab) => {
            const isActive = active === tab.id;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`relative px-1 pb-4 pr-8 text-sm font-medium transition ${
                  isActive ? "text-dark" : "text-dark50 hover:text-dark"
                }`}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default AdminNav;
