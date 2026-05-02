import { formatted } from "@/utils/formatPrice";
import AmenityItem from "@/components/Amenity/AmenityItem";
import FreemodeSliderChildren from "@/components/Swiper/FreemodeSliderChildren";
import Button from "@/components/UI/Button";

const formatArea = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(".", ",");
};

const ApartmentTitle = ({ rooms, area }) => {
  return (
    <h3 className="text-xl font-medium leading-tight text-dark sm:text-2xl">
      {rooms} комнаты, {formatArea(area)}&nbsp;м<sup>2</sup>
    </h3>
  );
};

const ApartmentPrice = ({ price, priceSqm }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-xl font-medium text-accent sm:text-2xl">
        {formatted(price)}
      </p>

      <span className="text-dark80">·</span>

      <p className="text-sm text-dark80">
        {formatted(priceSqm)} ₽ / м<sup>2</sup>
      </p>
    </div>
  );
};

const ApartmentMeta = ({ position, floor, floorTotal, className = "" }) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 text-sm text-dark ${className}`}
    >
      <span>Позиция {position}</span>
      <span className="text-dark80">·</span>
      <span>
        Этаж {floor} из {floorTotal}
      </span>
    </div>
  );
};

const ApartmentNumber = ({ id }) => {
  return (
    <span className="rounded-lg bg-dark15 px-2 py-1 text-sm text-dark">
      №{id}
    </span>
  );
};

const ApartmentImage = ({ imageUrl, imageAlt, className = "" }) => {
  return (
    <img
      className={`mix-blend-multiply object-contain ${className}`}
      src={imageUrl}
      alt={imageAlt}
    />
  );
};

const ApartmentAmenitiesSlider = ({ amenities }) => {
  if (!amenities) return null;

  return (
    <footer className="mt-4 overflow-y-auto flex md:block">
      <FreemodeSliderChildren className="rounded-xl">
        {amenities.map((amenityId) => (
          <AmenityItem
            key={amenityId}
            amenityId={amenityId}
            className="rounded-xl text-sm"
          />
        ))}
      </FreemodeSliderChildren>
    </footer>
  );
};

const ApartmentAmenitiesList = ({ amenities }) => {
  if (!amenities) return null;

  return (
    <div className="hidden gap-2 md:grid">
      {amenities.map((amenityId) => (
        <AmenityItem
          key={amenityId}
          amenityId={amenityId}
          className="max-w-max rounded-xl text-xs lg:text-sm"
        />
      ))}
    </div>
  );
};

const ApartmentMobileDetails = ({
  rooms,
  sqm,
  price,
  priceSqm,
  position,
  floor,
  floorTotal,
}) => {
  const rows = [
    ["Количество комнат", rooms],
    ["Площадь", `${formatArea(sqm)} м²`],
    ["Стоимость", formatted(price)],
    ["Стоимость за м²", `${formatted(priceSqm)} ₽`],
    ["Ипотека", "Рассчитывается индивидуально"],
    ["Позиция", position],
    [`Этаж из ${floorTotal}`, floor],
  ];

  return (
    <div className="grid gap-2 md:hidden">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[1fr_auto] gap-4">
          <p className="text-xs text-dark80 sm:text-sm">{label}:</p>

          <p className="text-right text-xs font-medium text-dark sm:text-sm">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

const ApartmentCardGrid = ({
  id,
  rooms,
  sqm,
  price,
  priceSqm,
  imageUrl,
  imageAlt,
  position,
  floor,
  floorTotal,
  amenities,
}) => {
  return (
    <article className="group flex flex-col rounded-3xl bg-dark10 p-5 sm:p-6">
      <header className="grid gap-1">
        <div className="flex items-start justify-between gap-4">
          <ApartmentTitle rooms={rooms} area={sqm} />
          <ApartmentNumber id={id} />
        </div>

        <ApartmentPrice price={price} priceSqm={priceSqm} />

        <p className="text-xs text-start text-dark80 bg-white/70 px-2 py-1 rounded-lg">
          *Ипотека рассчитывается индивидуально
        </p>
      </header>

      <div className="grid h-full content-between">
        <div className="my-8 flex place-self-center md:place-self-auto">
          <ApartmentImage
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            className="w-fit max-w-[280px] h-fit"
          />
        </div>

        <ApartmentMeta
          position={position}
          floor={floor}
          floorTotal={floorTotal}
          className="justify-center md:justify-start"
        />

        <ApartmentAmenitiesSlider amenities={amenities} className=""/>

        <div className="mt-5">
          <Button text="Подробнее" size="sm" variant="outline" fullWidth />
        </div>
      </div>
    </article>
  );
};

const ApartmentCardList = ({
  id,
  rooms,
  sqm,
  price,
  priceSqm,
  imageUrl,
  imageAlt,
  position,
  floor,
  floorTotal,
  amenities,
}) => {
  return (
    <article className="relative grid gap-6 rounded-3xl bg-dark10 p-5 sm:p-6 md:grid-cols-[160px_1.5fr_0.8fr_1fr_auto] md:items-center lg:p-8">
      <div className="flex justify-center md:justify-start">
        <ApartmentImage
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          className="h-[160px] w-full max-w-[220px] md:h-[130px] md:max-w-[160px]"
        />
      </div>

      <div className="hidden gap-2 md:grid">
        <ApartmentTitle rooms={rooms} area={sqm} />
        <ApartmentPrice price={price} priceSqm={priceSqm} />

        <p className="text-sm text-dark80">
          Ипотека рассчитывается индивидуально
        </p>
      </div>

      <ApartmentMeta
        position={position}
        floor={floor}
        floorTotal={floorTotal}
        className="hidden md:flex"
      />

      <ApartmentAmenitiesList amenities={amenities} />

      <div className="absolute right-5 top-5 md:static">
        <ApartmentNumber id={id} />
      </div>

      <ApartmentMobileDetails
        rooms={rooms}
        sqm={sqm}
        price={price}
        priceSqm={priceSqm}
        position={position}
        floor={floor}
        floorTotal={floorTotal}
      />
    </article>
  );
};

const ApartmentCard = (props) => {
  if (props.view === "grid") {
    return <ApartmentCardGrid {...props} />;
  }

  return <ApartmentCardList {...props} />;
};

export default ApartmentCard;
