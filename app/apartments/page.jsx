import { prisma } from "@/lib/prisma";
import ApartmentsCatalog from "@/components/Apartments/ApartmentsCatalog";

const formatSettlementDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month >= 1 && month <= 3) return `1 квартал ${year}`;
  if (month >= 4 && month <= 6) return `2 квартал ${year}`;
  if (month >= 7 && month <= 9) return `3 квартал ${year}`;
  if (month >= 10 && month <= 12) return `4 квартал ${year}`;

  return "";
};

const serializeApartment = (apartment) => {
  const sortedImages = [...apartment.images].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  const mainImageMedium = sortedImages.find(
    (image) => image.type === "layout_medium",
  );

  return {
    id: apartment.id,
    number: apartment.number,

    rooms: apartment.rooms,
    areaTotal: apartment.areaTotal.toString(),
    price: apartment.price,
    pricePerSqm: apartment.pricePerSqm,

    mainImage: apartment.mainImage || sortedImages[0]?.url || "",
    mainImageMedium: mainImageMedium?.url || "",
    planImage: apartment.planImage || "",
    imageAlt: `Планировка квартиры №${apartment.number}`,

    buildingPosition: apartment.building.position || "",
    floor: apartment.floor,
    floorsTotal: apartment.building.floorsTotal,

    entrance: apartment.entrance,
    ceilingHeight: apartment.ceilingHeight
      ? apartment.ceilingHeight.toString()
      : "",

    settlementDate: formatSettlementDate(
      apartment.building.plannedSettlementDate,
    ),

    complexName: apartment.building.complex.name,
    complexAddress: apartment.building.complex.address,
    buildingAddress: apartment.building.address,

    apartmentType: "Квартира",
    article: apartment.article,

    amenityItems: apartment.amenities.map((item) => ({
      id: item.amenity.id,
      name: item.amenity.name,
      slug: item.amenity.slug,
      icon: item.amenity.icon,
    })),

    roomAreas: apartment.roomAreas.map((room) => ({
      id: room.id,
      name: room.name,
      area: room.area.toString(),
      sortOrder: room.sortOrder,
    })),
  };
};

const getApartmentsPageData = async () => {
  const [apartments, complexes] = await Promise.all([
    prisma.apartment.findMany({
      where: {
        status: "available",
      },
      include: {
        building: {
          include: {
            complex: true,
          },
        },
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        roomAreas: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    }),

    prisma.residentialComplex.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  return {
    apartments: apartments.map(serializeApartment),
    complexes: complexes.map((complex) => ({
      id: complex.id,
      name: complex.name,
      slug: complex.slug,
    })),
  };
};

export default async function ApartmentsPage() {
  const { apartments, complexes } = await getApartmentsPageData();

  return <ApartmentsCatalog apartments={apartments} complexes={complexes} />;
}