import Button from '@/components/UI/Button'

const COMPANY_STATS = [
  {
    value: '1999',
    label: 'работаем с этого года',
  },
  {
    value: '300',
    label: 'человек в команде',
  },
  {
    value: '215 тыс. м²',
    label: 'построенного жилья',
  },
  {
    value: '70 млн ₽',
    label: 'техника и оборудование',
  },
]

const EXPERIENCE_ITEMS = [
  'строим жилые дома',
  'ведём гражданское строительство',
  'реконструируем здания',
  'выполняем монтажные работы',
  'проектируем дома и объекты',
]

const COMPETENCE_ITEMS = [
  {
    title: 'Полный цикл строительства',
    text: 'Компания работает как инвестор, застройщик, генеральный подрядчик и субподрядчик. Это позволяет сопровождать объект на разных этапах.',
  },
  {
    title: 'Собственная проектная база',
    text: 'В структуру компании входит проектная организация, что помогает заранее продумывать будущие жилые и промышленные объекты.',
  },
  {
    title: 'Инженерные и специальные работы',
    text: 'Специалисты выполняют работы, связанные с сетями газопровода, теплоснабжения, водопровода, канализации и электроснабжения.',
  },
]

const AboutPage = () => {
  return (
    <main>
      <section className="container-padding pb-10 pt-14 sm:pt-18 lg:pb-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.95fr] lg:items-center">
          <div>
            {/* <span className="mb-4 inline-flex rounded-4xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              О компании
            </span> */}

            <h1 className="max-w-4xl text-3xl font-medium text-dark sm:text-5xl lg:text-5xl">
              ООО «Глория» — строительная компания из Великого Новгорода
            </h1>

            <div className="mt-8 grid max-w-3xl gap-4 text-base leading-relaxed text-dark60 sm:text-lg">
              <p>
                Общество с ограниченной ответственностью «Глория» основано
                в сентябре 1999 года. С апреля 2000 года основным направлением
                деятельности компании стало промышленно-гражданское строительство.
              </p>

              <p>
                Сегодня компания выполняет функции инвестора, застройщика,
                генерального подрядчика и субподрядчика. Проще говоря, «Глория»
                участвует не только в продаже квартир, но и в самом процессе
                создания объектов — от проектных решений до строительных работ.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button
                text="Выбрать квартиру"
                variant="accent"
                size="md"
                linkToPage="/apartments"
              />

              <Button
                text="Связаться с отделом продаж"
                variant="outlineAccent"
                size="md"
                linkToPage="/contacts"
              />
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-transparent sm:min-h-[520px]">
            <img
              src="/logo-active.jpg"
              alt="Строительная компания Глория"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="container-padding mt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-4xl bg-dark10 p-5 sm:p-6 text-center"
            >
              <p className="text-3xl font-medium text-accent sm:text-4xl">
                {item.value}
              </p>

              <p className="mt-3 text-base leading-relaxed text-dark60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-padding section py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <span className="mb-4 inline-flex rounded-4xl bg-dark10 px-4 py-2 text-sm font-medium text-dark60">
              Опыт компании
            </span>

            <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
              Более двадцати лет в строительстве
            </h2>

            <p className="mt-5 text-base leading-relaxed text-dark60">
              За время работы компания занималась не только жилыми домами.
              На официальном сайте также указаны проекты нежилого назначения:
              реконструкция Окуловского суда, реконструкция школы в городе Холм,
              строительно-монтажные работы на Новгородской ТЭЦ.
            </p>

            <p className="mt-4 text-base leading-relaxed text-dark60">
              Для страницы я не стал перегружать этот раздел длинной историей.
              Важно, чтобы пользователь быстро понял: у компании есть опыт,
              реальные объекты и строительная база.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {EXPERIENCE_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-4xl border border-dark10 bg-white p-5 shadow-sm"
              >
                <p className="text-base font-medium text-dark">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-padding py-10 lg:py-14">
        <div className="overflow-hidden rounded-4xl bg-header">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="grid content-center gap-6 p-6 sm:p-8 lg:p-12">
              <div>
                <span className="mb-4 inline-flex rounded-4xl bg-white/10 px-4 py-2 text-sm text-white/80">
                  Ресурсы и компетенции
                </span>

                <h2 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
                  У компании есть своя техника, специалисты и проектное направление
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                «Глория» имеет парк машин, механизмов и оборудования, а также
                земельные участки с инвестиционным потенциалом. Кроме того,
                у компании есть специалисты для проектирования зданий и выполнения
                инженерных работ.
              </p>

              <div className="grid gap-3">
                {COMPETENCE_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-white/10 p-5"
                  >
                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px]">
              <img
                src="/about/resources.jpg"
                alt="Строительная техника и ресурсы компании"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative min-h-[300px] overflow-hidden rounded-4xl bg-dark10 sm:min-h-[390px]">
            <img
              src="/about/brick-house.jpg"
              alt="Кирпичный дом"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/85 p-5 backdrop-blur">
              <p className="text-sm leading-relaxed text-dark60">
                Кирпич хорошо держит тепло, помогает с шумоизоляцией и создаёт
                более комфортную атмосферу внутри дома.
              </p>
            </div>
          </div>

          <div>
            <span className="mb-4 inline-flex rounded-4xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              Материалы
            </span>

            <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
              Экологически чистый и надёжный материал
            </h2>

            <div className="mt-5 grid gap-4 text-base leading-relaxed text-dark60">
              <p>
                На сайте компании отдельно подчёркивается, что дома строятся
                из натурального и надёжного материала — кирпича. Я вынес эту
                мысль в отдельный блок, потому что для покупателя материал дома
                действительно имеет значение.
              </p>

              <p>
                Кирпич ценят за сохранение тепла, хорошую шумоизоляцию и ощущение
                основательности. Для страницы «О компании» это не просто техническая
                характеристика, а аргумент доверия.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Тепло</p>
                <p className="mt-1 text-sm text-dark60">
                  комфорт в холодный сезон
                </p>
              </div>

              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Тише</p>
                <p className="mt-1 text-sm text-dark60">
                  хорошая шумоизоляция
                </p>
              </div>

              <div className="rounded-3xl bg-dark10 p-4">
                <p className="font-medium text-dark">Надёжно</p>
                <p className="mt-1 text-sm text-dark60">
                  проверенный материал
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-padding pb-16 pt-8">
        <div className="relative overflow-hidden rounded-4xl bg-accent">
          <img
            src="/about/family-home.jpg"
            alt="Семья в новой квартире"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/95 to-accent/75" />

          <div className="relative z-10 grid gap-8 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <span className="mb-4 inline-flex rounded-4xl bg-white/15 px-4 py-2 text-sm text-white/90">
                Заинтересованы в приобретении жилья?
              </span>

              <h2 className="max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">
                Подберите квартиру и оставьте заявку — менеджер поможет с деталями
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                В каталоге можно посмотреть доступные квартиры, отфильтровать
                варианты по параметрам и перейти к заявке. Если сложно выбрать,
                отдел продаж подскажет подходящий вариант.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                text="Смотреть квартиры"
                variant="white"
                size="md"
                linkToPage="/apartments"
              />

              <Button
                text="Связаться"
                variant="glass"
                size="md"
                linkToPage="/contacts"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage