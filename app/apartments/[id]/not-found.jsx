import Button from "@/components/UI/Button";

const ApartmentNotFound = () => {
  return (
    <main className="container-padding">
      <section className="section grid min-h-[60vh] place-items-center">
        <div className="max-w-xl rounded-4xl bg-dark10 p-8 text-center">
          <span className="mb-4 inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            Квартира не найдена
          </span>

          <h1 className="text-3xl font-medium text-dark sm:text-4xl">
            Такой квартиры нет в каталоге
          </h1>

          <p className="mt-4 text-base leading-relaxed text-dark60">
            Возможно, квартира была удалена или ссылка указана неверно.
            Вернитесь в каталог и выберите другой вариант.
          </p>

          <div className="mt-7">
            <Button
              text="Вернуться к квартирам"
              variant="accent"
              size="md"
              linkToPage="/apartments"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ApartmentNotFound;