import FreemodeSlider from "@/components/Swiper/SwiperFreemode";

const NewsModule = () => {
  const newsData = [
    {
      title: "Оправдана ли нелюбовь к квартирам на последнем этаже?",
      excerpt:
        "Инженер развеял миф про последние этажи и рассказал, на что действительно стоит обратить внимание при выборе квартиры.",
      image: "/images/news/news1.jpg",
      imageAlt: "нелюбовь_к_первым_этажам",
      date: "20 марта 2026",
      label: "Акция",
      slug: "last-floor-apartments",
      type: "promotion",
    },
    {
      title: "Как выбрать идеальную квартиру в 2026 году?",
      excerpt:
        "Советы экспертов по выбору планировки, расположения квартиры и основных характеристик будущего жилья.",
      image: "/images/news/news2.jpg",
      imageAlt: "выбор_квартиры",
      date: "19 марта 2026",
      label: "Новости",
      slug: "how-to-choose-apartment-2026",
      type: "news",
    },
    {
      title: "Топ-5 ошибок при покупке. На что стоит обратить внимание",
      excerpt:
        "Разбираем частые ошибки покупателей и важные детали, которые стоит проверить перед подписанием договора.",
      image: "/images/news/news3.jpg",
      imageAlt: "ошибки_покупки",
      date: "18 марта 2026",
      label: "Полезное",
      slug: "top-5-buying-mistakes",
      type: "tips",
    },
    {
      title: "Как работает ипотека в 2026 году?",
      excerpt:
        "Краткий обзор ипотечных программ, условий покупки и важных параметров при выборе способа оплаты.",
      image: "/images/news/news2.jpg",
      imageAlt: "ипотека",
      date: "17 марта 2026",
      label: "Ипотека",
      slug: "mortgage-2026",
      type: "mortgage",
    },
    {
      title: "5 трендов в дизайне интерьера",
      excerpt:
        "Рассказываем, какие решения в оформлении квартиры будут актуальны в этом году.",
      image: "/images/news/news1.jpg",
      imageAlt: "тренды",
      date: "16 марта 2026",
      label: "Полезное",
      slug: "interior-design-trends",
      type: "tips",
    },
    {
      title: "Как не переплатить за квартиру?",
      excerpt:
        "Практические рекомендации, которые помогут внимательнее сравнивать предложения и условия покупки.",
      image: "/images/news/news3.jpg",
      imageAlt: "секреты",
      date: "15 марта 2026",
      label: "Новости",
      slug: "how-not-to-overpay",
      type: "news",
    },
  ];

  return (
    <div>
      <h2 className="mb-12 border-b border-dark40 pb-2 text-[28px] font-medium text-dark sm:text-[36px]">
        Новости и акции
      </h2>

      <div>
        <FreemodeSlider data={newsData} type="news" />
      </div>
    </div>
  );
};

export default NewsModule;