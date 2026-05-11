import Button from "@/components/UI/Button";
import AmenityItem from "@/components/Amenity/AmenityItem";
import ApartmentHeroGallery from "@/components/Apartments/ApartmentHeroGallery";
import ApartmentInfoPanel from "@/components/Apartments/ApartmentInfoPanel";
import { allApartments } from "@/data/apartments";
import { formatted } from "@/utils/formatPrice";
import { notFound } from "next/navigation";

const formatArea = (value) => {
    if (value === null || value === undefined) return "";
    return String(value).replace(".", ",");
};

const DetailCard = ({ label, value, accent = false }) => {
    return (
        <div className="rounded-3xl bg-white p-5">
            <p className="text-sm text-dark50">{label}</p>

            <p
                className={`
          mt-2 text-xl font-medium
          ${accent ? "text-accent" : "text-dark"}
        `}
            >
                {value}
            </p>
        </div>
    );
};

const ApartmentFeatureList = ({ amenities }) => {
    if (!amenities?.length) return null;

    return (
        <div className="mt-5 flex flex-wrap gap-2">
            {amenities.map((amenityId) => (
                <AmenityItem
                    key={amenityId}
                    amenityId={amenityId}
                    className="rounded-full bg-white px-3 py-2 text-xs sm:text-sm"
                />
            ))}
        </div>
    );
};

const InfoRow = ({ label, value }) => {
    if (!value) return null;

    return (
        <div className="flex items-start justify-between gap-5 border-b border-dark/10 py-4 last:border-b-0">
            <p className="text-sm leading-relaxed text-dark50">{label}</p>

            <p className="text-right text-sm font-medium leading-relaxed text-dark sm:text-base">
                {value}
            </p>
        </div>
    );
};

const RoomAreaRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
            <p className="text-sm text-dark60">{label}</p>

            <p className="text-sm font-medium text-dark">
                {formatArea(value)} м²
            </p>
        </div>
    );
};

const ApartmentPage = async ({ params }) => {
    const { id } = await params;

    const apartment = allApartments.find((item) => String(item.id) === String(id));

    if (!apartment) {
        notFound();
    }

    const {
        rooms,
        sqm,
        price,
        priceSqm,
        imageUrl,
        planImage,
        imageAlt,
        position,
        floor,
        floorTotal,
        entrance,
        ceilingHeight,
        imageUrlMedium,
        settlementDate,
        building,
        apartmentType,
        finishing,
        amenities,
        roomAreas,
    } = apartment;

    const galleryImages = [
        {
            src: imageUrlMedium,
            caption: "Планировка квартиры",
            alt: imageAlt || `Планировка квартиры №${id}`,
        },
        {
            src: planImage,
            caption: `Планировка дома, позиция ${position}`,
            alt: `Планировка дома, позиция ${position}`,
        },
    ].filter((image) => image.src);

    return (
        <main className="container-padding">
            <section className="section pt-10 lg:pt-16">
                <div className="grid min-w-0 gap-6 rounded-4xl bg-dark10 p-3 sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
                    <ApartmentHeroGallery
                        images={galleryImages}
                        apartmentTitle={`${rooms}-комнатная квартира, ${formatArea(sqm)} м²`}
                    />

                    <ApartmentInfoPanel apartment={apartment} />
                </div>
            </section>

            {/* <section className="section">
                <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="rounded-4xl bg-header p-6 text-white sm:p-8 lg:p-10">
                        <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm text-white/90">
                            Основные параметры
                        </span>

                        <h2 className="text-3xl font-medium leading-tight sm:text-4xl">
                            Всё важное о квартире в одном месте
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                            Эти характеристики помогают быстро оценить квартиру и понять,
                            подходит ли она под ваши задачи.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        <DetailCard label="Комнат" value={rooms} />
                        <DetailCard label="Площадь" value={`${formatArea(sqm)} м²`} />
                        <DetailCard label="Этаж" value={`${floor} из ${floorTotal}`} />
                        <DetailCard label="Позиция" value={position} />
                        <DetailCard label="Номер квартиры" value={`№${id}`} />
                        <DetailCard label="Ипотека" value="Индивидуально" accent />
                    </div>
                </div>
            </section>

            {amenities?.length ? (
                <section className="section">
                    <div className="rounded-4xl bg-dark10 p-6 sm:p-8 lg:p-10">
                        <div className="mb-7 max-w-3xl">
                            <span className="mb-4 inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                                Особенности квартиры
                            </span>

                            <h2 className="text-3xl font-medium leading-tight text-dark sm:text-4xl">
                                Что есть в этой планировке
                            </h2>

                            <p className="mt-4 text-base leading-relaxed text-dark60">
                                Здесь собраны преимущества и особенности, которые помогут
                                сравнить эту квартиру с другими вариантами.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {amenities.map((amenityId) => (
                                <AmenityItem
                                    key={amenityId}
                                    amenityId={amenityId}
                                    className="rounded-2xl bg-white px-4 py-3 text-sm"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            <section className="section mb-24">
                <div className="relative overflow-hidden rounded-4xl bg-accent">
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

                    <div className="relative z-10 grid gap-8 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
                        <div>
                            <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm text-white/90">
                                Нужна консультация?
                            </span>

                            <h2 className="max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">
                                Поможем уточнить детали и условия покупки
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                                Оставьте заявку, и менеджер расскажет о квартире, вариантах
                                оплаты и возможных условиях ипотеки.
                            </p>
                        </div>

                        <Button
                            text="Оставить заявку"
                            variant="white"
                            size="md"
                        />
                    </div>
                </div>
            </section> */}
        </main>
    );
};

export default ApartmentPage;