const NewsCard = ({ item }) => {
  return (
    <article className="group overflow-hidden rounded-4xl bg-dark10 transition hover:-translate-y-1 hover:shadow-xl">
      <a href={`/news/${item.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-white">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-white px-3 py-1 text-xs text-accent">
              {item.label}
            </span>

            <span className="text-xs text-dark40">
              {item.date}
            </span>
          </div>

          <h3 className="text-xl font-medium leading-tight text-dark">
            {item.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-dark60">
            {item.excerpt}
          </p>

          <div className="mt-5 text-sm font-medium text-accent">
            Читать подробнее →
          </div>
        </div>
      </a>
    </article>
  );
};

export default NewsCard;