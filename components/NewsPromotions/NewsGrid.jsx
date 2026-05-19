import CardNews from "@/components/NewsPromotions/CardNews";

const NewsGrid = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="rounded-4xl bg-dark10 p-8 text-center">
        <h3 className="text-2xl font-medium text-dark">
          Материалы не найдены
        </h3>

        <p className="mt-3 text-dark60">
          В выбранной категории пока нет публикаций.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CardNews key={item.id} {...item} imageAlt={item.title} />
      ))}
    </div>
  );
};

export default NewsGrid;
