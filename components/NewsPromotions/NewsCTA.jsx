const NewsCTA = () => {
  return (
    <section className="mt-12 overflow-hidden rounded-4xl bg-dark p-8 text-white">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">
          Консультация
        </p>

        <h2 className="mt-3 text-3xl font-medium">
          Хотите узнать об актуальных предложениях?
        </h2>

        <p className="mt-4 text-white/70">
          Оставьте заявку, и менеджер подберёт квартиры, акции и условия
          покупки под ваши параметры.
        </p>

        <button
          type="button"
          className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Получить консультацию
        </button>
      </div>
    </section>
  );
};

export default NewsCTA;