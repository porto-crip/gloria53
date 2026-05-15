import { iconsMap } from "@/data/amenities";

const AmenityItem = ({ amenity, className = "" }) => {
  if (!amenity) return null;

  const Icon = iconsMap[amenity.icon];

  return (
    <div
      className={`inline-flex w-max shrink-0 items-center gap-2 whitespace-nowrap text-dark ${className}`}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0 text-dark60" /> : null}

      <span>{amenity.name}</span>
    </div>
  );
};

export default AmenityItem;