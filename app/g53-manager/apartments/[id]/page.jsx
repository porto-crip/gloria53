import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { updateApartment, deleteApartment } from "../../actions";
import AdminNav from "../../_components/AdminNav";
import AdminEyebrow from "../../_components/AdminEyebrow";
import Button from "@/components/UI/Button";

export const metadata = {
  title: "Редактировать квартиру",
  robots: { index: false, follow: false },
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

export default async function EditApartmentPage({ params }) {
  await requireAdmin();

  const { id } = await params;
  const apartment = await prisma.apartment.findUnique({
    where: { id: Number(id) },
    include: { building: { include: { complex: true } } },
  });

  if (!apartment) notFound();

  const buildings = await prisma.building.findMany({
    include: { complex: true },
    orderBy: { id: "asc" },
  });

  const areaTotal = apartment.areaTotal?.toString() ?? "";
  const ceilingHeight = apartment.ceilingHeight?.toString() ?? "";

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Квартиры" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <AdminEyebrow>Редактирование</AdminEyebrow>
            <h2 className="mt-2 text-2xl font-medium text-dark">
              Квартира №{apartment.number} · {apartment.rooms}-комн. · {areaTotal} м²
            </h2>
          </div>
          <Button variant="outline" size="sm" linkToPage="/g53-manager/apartments">
            Назад к списку
          </Button>
        </div>

        <form action={updateApartment} className="mt-8 grid gap-6">
          <input type="hidden" name="id" value={apartment.id} />

          <FormSection eyebrow="Привязка" title="Дом и номер">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className={labelCls}>
                Дом / позиция
                <select name="buildingId" className={selectCls} defaultValue={apartment.buildingId}>
                  {buildings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.complex.name} · позиция {b.position ?? b.name ?? b.id}
                    </option>
                  ))}
                </select>
              </label>

              <label className={labelCls}>
                Номер квартиры
                <input name="number" defaultValue={apartment.number} className={inputCls} required />
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Параметры" title="Площадь и расположение">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className={labelCls}>
                Комнат
                <input name="rooms" type="number" min="0" max="10" defaultValue={apartment.rooms} className={inputCls} required />
              </label>

              <label className={labelCls}>
                Этаж
                <input name="floor" type="number" min="1" defaultValue={apartment.floor} className={inputCls} required />
              </label>

              <label className={labelCls}>
                Подъезд
                <input name="entrance" type="number" min="1" defaultValue={apartment.entrance ?? ""} placeholder="—" className={inputCls} />
              </label>

              <label className={labelCls}>
                Площадь, м²
                <input name="areaTotal" type="number" step="0.01" min="0.01" defaultValue={areaTotal} className={inputCls} required />
              </label>

              <label className={`${labelCls} sm:col-span-2 lg:col-span-4 lg:max-w-xs`}>
                Высота потолков, м
                <input name="ceilingHeight" type="number" step="0.01" min="0" defaultValue={ceilingHeight} placeholder="2.70" className={inputCls} />
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Коммерция" title="Цена и статус">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className={labelCls}>
                Цена, ₽
                <input name="price" type="number" min="0" defaultValue={apartment.price} className={inputCls} required />
              </label>

              <label className={labelCls}>
                Цена за м², ₽
                <input name="pricePerSqm" type="number" min="0" defaultValue={apartment.pricePerSqm ?? ""} className={inputCls} />
              </label>

              <label className={labelCls}>
                Статус
                <select name="status" defaultValue={apartment.status} className={selectCls}>
                  <option value="available">Доступна</option>
                  <option value="reserved">Забронирована</option>
                  <option value="sold">Продана</option>
                </select>
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Дополнительно" title="Тип и артикул">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelCls}>
                Тип недвижимости
                <input name="layoutType" defaultValue={apartment.layoutType ?? "Квартира"} className={inputCls} />
              </label>

              <label className={labelCls}>
                Артикул
                <input name="article" defaultValue={apartment.article ?? ""} placeholder="—" className={inputCls} />
              </label>
            </div>
          </FormSection>

          <FormSection eyebrow="Медиа" title="Изображения">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className={labelCls}>
                Главное изображение
                <input name="mainImage" defaultValue={apartment.mainImage ?? ""} placeholder="/apartments/layout.jpg" className={inputCls} />
              </label>

              <label className={labelCls}>
                Изображение плана этажа
                <input name="planImage" defaultValue={apartment.planImage ?? ""} placeholder="/apartments/general-plan.jpg" className={inputCls} />
              </label>
            </div>
          </FormSection>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" variant="dark">Сохранить изменения</Button>
            <Button variant="outline" size="sm" linkToPage="/g53-manager/apartments">Отмена</Button>
          </div>
        </form>

        <div className="mt-10 border-t border-dark15 pt-8">
          <AdminEyebrow>Опасная зона</AdminEyebrow>
          <p className="mt-2 text-sm text-dark50">Удаление квартиры необратимо.</p>
          <form action={deleteApartment} className="mt-4">
            <input type="hidden" name="id" value={apartment.id} />
            <Button type="submit" variant="accentSoft" size="sm">Удалить квартиру</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
