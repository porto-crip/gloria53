const tips = [
  "Как выбрать планировку?",
  "На что обратить внимание при выборе этажа?",
  "Какие условия покупки доступны?",
  "Что уточнить перед отправкой заявки?",
];

const BuyerTipsBlock = () => {
  return (
    <section className="mt-12 rounded-4xl bg-dark10 p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Полезно покупателю
          </p>

          <h2 className="mt-3 text-2xl font-medium text-dark">
            Материалы, которые помогают выбрать квартиру
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tips.map((tip) => (
            <a
              key={tip}
              href="/news"
              className="rounded-3xl bg-white p-5 text-sm font-medium text-dark transition hover:bg-dark hover:text-white"
            >
              {tip}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyerTipsBlock;