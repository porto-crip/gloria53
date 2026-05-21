import Link from "next/link";

import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../../_components/AdminNav";
import AdminEyebrow from "../../_components/AdminEyebrow";

export const metadata = {
  title: "Новый построенный объект",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function NewBuiltObjectPage() {
  await requireAdmin();

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="built-objects" title="Новый объект" />

        <div className="mt-10 overflow-hidden rounded-4xl border border-dark15">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-dark p-6 text-white sm:p-8">
              <AdminEyebrow variant="light">Следующий шаг</AdminEyebrow>
              <h2 className="mt-3 text-3xl font-medium leading-tight">
                Форма архивного объекта
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8">
              <p className="max-w-xl text-base leading-7 text-dark80">
                Сейчас построенные объекты берутся из локального файла. Для
                полноценного добавления нужно перенести этот раздел в Prisma,
                после чего форма сохранит объект прямо в БД.
              </p>

              <Link
                href="/g53-manager/built-objects"
                className="mt-6 inline-flex h-11 items-center rounded-4xl bg-dark px-5 text-sm font-medium text-white transition hover:bg-accent"
              >
                Вернуться к объектам
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
