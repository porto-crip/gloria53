import { BUILT_OBJECTS } from "@/data/builtObjects";
import Button from "@/components/UI/Button";
import AdminEyebrow from "../_components/AdminEyebrow";
import { requireAdmin } from "@/lib/adminAuth";
import AdminNav from "../_components/AdminNav";
import AdminPagination from "../_components/AdminPagination";
import SectionMeter from "../_components/SectionMeter";

export const metadata = {
  title: "Построенные объекты",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 8;

const getPlainText = (value) => {
  if (typeof value === "string") return value.replace(/<[^>]*>/g, "");
  return "";
};

export default async function ManagerBuiltObjectsPage({ searchParams }) {
  await requireAdmin();

  const { page: pageParam } = await searchParams;
  const page = Math.max(Number(pageParam) || 1, 1);
  const skip = (page - 1) * PAGE_SIZE;
  const items = BUILT_OBJECTS.slice(skip, skip + PAGE_SIZE);
  const totalPages = Math.ceil(BUILT_OBJECTS.length / PAGE_SIZE);
  const yearsCount = new Set(BUILT_OBJECTS.map((item) => item.year)).size;
  const complexCount = BUILT_OBJECTS.filter((item) => item.complex).length;

  return (
    <main className="container-padding">
      <section className="py-10 lg:py-16">
        <AdminNav active="built-objects" title="Построенные объекты" />

        <div className="mt-10">
          <SectionMeter
            items={[
              { label: "Объекты", value: BUILT_OBJECTS.length, caption: "в архиве" },
              { label: "Периоды", value: yearsCount, caption: "лет/этапов" },
              { label: "ЖК", value: complexCount, caption: "связаны" },
            ]}
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-4xl border border-dark15 bg-white">
          <div className="flex flex-col gap-4 border-b border-dark15 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <AdminEyebrow>Архив</AdminEyebrow>
              <h2 className="mt-2 text-2xl font-medium text-dark">
                Список объектов
              </h2>
            </div>

            <Button variant="dark" size="sm" linkToPage="/g53-manager/built-objects/new">
              Добавить объект
            </Button>
          </div>

          <div className="divide-y divide-dark15">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 p-5 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:p-6"
              >
                <div className="h-16 overflow-hidden rounded-2xl bg-dark10">
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <p className="text-lg font-medium text-dark">
                    {item.title}
                  </p>
                  <p className="mt-2 line-clamp-1 text-sm text-dark50">
                    {getPlainText(item.description)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <span className="rounded-full bg-dark10 px-3 py-1 text-sm text-dark80">
                    {item.year}
                  </span>
                  {item.complex ? (
                    <span className="text-sm font-medium text-accent">
                      {item.complex}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdminPagination
          basePath="/g53-manager/built-objects"
          page={page}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}
