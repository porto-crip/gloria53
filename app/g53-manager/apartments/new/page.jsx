import Link from "next/link";

import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";

export const metadata = {
  title: "Новая квартира",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function NewApartmentPage() {
  await requireAdmin();

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Новая квартира" />

        <div className="mt-10 overflow-hidden rounded-4xl border border-dark15">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-dark p-6 text-white sm:p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                Следующий шаг
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-tight">
                Форма добавления квартиры
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <p className="max-w-xl text-base leading-7 text-dark80">
                Здесь будет большая форма квартиры: параметры, цена, изображения,
                помещения, удобства и связь с домом. Раздел уже подготовлен в
                навигации, чтобы не оставлять кнопку без реакции.
              </p>

              <Link
                href="/g53-manager/apartments"
                className="mt-6 inline-flex h-11 items-center rounded-4xl bg-dark px-5 text-sm font-medium text-white transition hover:bg-accent"
              >
                Вернуться к квартирам
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
