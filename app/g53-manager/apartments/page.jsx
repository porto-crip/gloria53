import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";

export const metadata = {
  title: "Квартиры",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 8;

const formatPrice = (value) => {
  return new Intl.NumberFormat("ru-RU").format(value);
};

export default async function ManagerApartmentsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [totalCount, availableCount, soldCount, apartments] = await Promise.all([
    prisma.apartment.count(),
    prisma.apartment.count({ where: { status: "available" } }),
    prisma.apartment.count({ where: { status: "sold" } }),
    prisma.apartment.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        building: {
          include: {
            complex: true,
          },
        },
      },
      orderBy: [
        {
          id: "asc",
        },
      ],
    }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="apartments" title="Квартиры" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Всего", value: totalCount, caption: "в базе" },
              { label: "Доступны", value: availableCount, caption: "на сайте" },
              { label: "Проданы", value: soldCount, caption: "архив" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-dark50">
                Каталог
              </p>
              <h2 className="mt-2 text-2xl font-medium text-dark">
                Список квартир
              </h2>
            </div>

            <Link
              href="/g53-manager/apartments/new"
              className="h-11 w-max rounded-4xl bg-dark px-5 text-sm font-medium text-white transition hover:bg-accent"
            >
              Добавить квартиру
            </Link>
          </div>

          <div className="divide-y divide-dark15">
            {apartments.map((apartment) => (
              <div
                key={apartment.id}
                className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
              >
                <div>
                  <p className="text-lg font-medium text-dark">
                    №{apartment.number} · {apartment.rooms}-комн. ·{" "}
                    {apartment.areaTotal.toString()} м²
                  </p>
                  <p className="mt-2 text-sm text-dark50">
                    {apartment.building.complex.name} · позиция{" "}
                    {apartment.building.position || "—"} · этаж{" "}
                    {apartment.floor}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <span className="rounded-full bg-dark10 px-3 py-1 text-sm text-dark80">
                    {apartment.status}
                  </span>
                  <span className="text-sm font-medium text-dark">
                    {formatPrice(apartment.price)} ₽
                  </span>
                  <Link
                    href={`/apartments/${apartment.id}`}
                    className="text-sm font-medium text-accent transition hover:text-dark"
                  >
                    Открыть
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdminPagination
          basePath="/g53-manager/apartments"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
