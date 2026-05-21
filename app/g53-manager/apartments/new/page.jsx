import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { createApartment } from "../../actions";
import AdminNav from "../../_components/AdminNav";
import AdminEyebrow from "../../_components/AdminEyebrow";

export const metadata = {
  title: "Новая квартира",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const inputCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";

const selectCls =
  "h-12 rounded-4xl border border-dark15 bg-white px-5 text-base outline-none transition focus:border-accent";

const labelCls = "grid gap-2 text-sm font-medium text-dark";

const FormSection = ({ eyebrow, title, children }) => (
  <section className="rounded-4xl bg-dark10 p-5 sm:p-6 lg:p-8">
    <AdminEyebrow>{eyebrow}</AdminEyebrow>
    <h2 className="mt-2 text-2xl font-medium text-dark">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

export default async function NewApartmentPage({ searchParams }) {
  await requireAdmin();

  const { error } = await searchParams;

  const buildings = await prisma.building.findMany({
    include: { complex: true },
    orderBy: { id: "asc" },
  });

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Новая квартира" />

        {error === "required" ? (
          <p className="mt-6 rounded-3xl bg-accent/10 px-5 py-3 text-sm text-accent">
            Заполните все обязательные поля, отмеченные звёздочкой.
          </p>
        ) : null}

        <form action={createApartment} className="mt-8 grid gap-6">
          <FormSection eyebrow="Привязка" title="Дом и номер">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className={labelCls}>
                Дом / позиция *
                <select name="buildingId" required className={selectCls}>
                  <option value="">— выберите —</option>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.complex.name} · позиция {b.position ?? b.name ?? b.id}
                    </option>
                  ))}
                </select>
              </label>

              <label className={labelCls}>
                Номер квартиры *
                <input
                  name="number"
                  required
                  placeholder="42"
                  className={inputCls}
                />
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Параметры" title="Площадь и расположение">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className={labelCls}>
                Комнат *
                <input
                  name="rooms"
                  type="number"
                  min="0"
                  max="10"
                  required
                  defaultValue="2"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Этаж *
                <input
                  name="floor"
                  type="number"
                  min="1"
                  required
                  defaultValue="1"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Подъезд
                <input
                  name="entrance"
                  type="number"
                  min="1"
                  placeholder="—"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Площадь, м² *
                <input
                  name="areaTotal"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="45.70"
                  className={inputCls}
                />
              </label>

              <label className={`${labelCls} sm:col-span-2 lg:col-span-4 lg:max-w-xs`}>
                Высота потолков, м
                <input
                  name="ceilingHeight"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="2.70 (по умолчанию)"
                  className={inputCls}
                />
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Коммерция" title="Цена и статус">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className={labelCls}>
                Цена, ₽ *
                <input
                  name="price"
                  type="number"
                  min="0"
                  required
                  placeholder="7780000"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Цена за м², ₽ *
                <input
                  name="pricePerSqm"
                  type="number"
                  min="0"
                  required
                  placeholder="171240"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Статус
                <select name="status" className={selectCls}>
                  <option value="available">Доступна</option>
                  <option value="reserved">Забронирована</option>
                  <option value="sold">Продана</option>
                </select>
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Медиа" title="Изображения">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className={labelCls}>
                Главное изображение *
                <input
                  name="mainImage"
                  required
                  placeholder="/apartments/layout.jpg"
                  className={inputCls}
                />
              </label>

              <label className={labelCls}>
                Изображение плана этажа *
                <input
                  name="planImage"
                  required
                  placeholder="/apartments/general-plan.jpg"
                  className={inputCls}
                />
              </label>
            </div>
          </FormSection>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="h-12 rounded-4xl bg-dark px-6 text-sm font-medium text-white transition hover:bg-accent active:scale-[0.98]"
            >
              Добавить квартиру
            </button>

            <Link
              href="/g53-manager/apartments"
              className="inline-flex h-12 items-center rounded-4xl border border-dark15 px-6 text-sm font-medium text-dark transition hover:border-dark hover:bg-dark hover:text-white"
            >
              Отмена
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
