import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const residentialComplexesSeed = [
  {
    name: "ЖК Юннатов",
    slug: "zhk-yunnatov",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: "/complexes/yunnatov/hero.jpg",
  },
  {
    name: "ЖК Раздолье",
    slug: "zhk-razdolye",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: null,
  },
  {
    name: "ЖК Шелонская",
    slug: "zhk-shelonskaya",
    description: "Жилой комплекс строительной компании «Глория».",
    address: "Великий Новгород",
    status: "active",
    heroImage: null,
  },
];

const buildingsSeed = [
  {
    complexSlug: "zhk-yunnatov",
    name: "Позиция 1",
    position: "1",
    address: "Великий Новгород",
    floorsTotal: 8,
    entrancesTotal: 2,
    plannedSettlementDate: new Date("2026-12-01"),
    status: "active",
  },
];

const amenitiesSeed = [
  {
    oldId: 1,
    name: "Предчистовая отделка",
    slug: "rough-finish",
    icon: "roughFinish",
  },
  {
    oldId: 2,
    name: "Подогрев полов",
    slug: "floor-heating",
    icon: "floorHeating",
  },
  {
    oldId: 3,
    name: "Раздельный с/у",
    slug: "separate-bathroom",
    icon: "separateBathroom",
  },
  {
    oldId: 4,
    name: "Кондиционер",
    slug: "air-conditioner",
    icon: "airConditioner",
  },
  {
    oldId: 5,
    name: "Балкон",
    slug: "balcony",
    icon: "balcony",
  },
];

const purchaseOptionsSeed = [
  {
    name: "Ипотека",
    description: "Рассчитывается индивидуально",
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "Полная оплата",
    description: "Покупка одним платежом",
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "Рассрочка на 3 месяца",
    description: "Условия уточняются у менеджера",
    isActive: true,
    sortOrder: 3,
  },
];

const apartmentsSeed = [
  {
    buildingPosition: "1",

    number: "0",
    rooms: 2,
    areaTotal: "70.90",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: 2,
    ceilingHeight: "2.70",

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-70.9-0",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/2-45-medium.png",
        title: "Планировка квартиры, улучшенное качество",
        type: "layout_medium",
        sortOrder: 2,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [
      { name: "Кухня", area: "14.60", sortOrder: 1 },
      { name: "Комната", area: "17.20", sortOrder: 2 },
      { name: "Комната", area: "20.20", sortOrder: 3 },
      { name: "Прихожая", area: "10.10", sortOrder: 4 },
      { name: "Ванная", area: "4.80", sortOrder: 5 },
      { name: "С/у", area: "1.70", sortOrder: 6 },
      { name: "Лоджия", area: "4.50", sortOrder: 7 },
    ],

    amenityOldIds: [1, 3, 2],
  },
  {
    buildingPosition: "1",

    number: "1",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-1",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/2-45-medium.png",
        title: "Планировка квартиры, улучшенное качество",
        type: "layout_medium",
        sortOrder: 2,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [],
    amenityOldIds: [3, 2, 1],
  },
  {
    buildingPosition: "1",

    number: "2",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-2",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/2-45-medium.png",
        title: "Планировка квартиры, улучшенное качество",
        type: "layout_medium",
        sortOrder: 2,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 3,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "3",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-3",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "4",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-4",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "5",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-5",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
  {
    buildingPosition: "1",

    number: "6",
    rooms: 2,
    areaTotal: "45.70",
    price: 7780000,
    pricePerSqm: 171240,

    floor: 4,
    entrance: null,
    ceilingHeight: null,

    status: "available",
    layoutType: "Квартира",
    article: "ГЛ-1-2-45.7-6",

    mainImage: "/apartments/2-45.7.jpg",
    planImage: "/apartments/general-plan.jpg",

    images: [
      {
        url: "/apartments/2-45.7.jpg",
        title: "Планировка квартиры",
        type: "layout",
        sortOrder: 1,
      },
      {
        url: "/apartments/general-plan.jpg",
        title: "Планировка дома, позиция 1",
        type: "building_plan",
        sortOrder: 2,
      },
    ],

    roomAreas: [],
    amenityOldIds: [],
  },
];

async function main() {
  console.log("Очистка старых данных...");

  await prisma.application.deleteMany();
  await prisma.apartmentAmenity.deleteMany();
  await prisma.apartmentImage.deleteMany();
  await prisma.apartmentRoomArea.deleteMany();
  await prisma.apartment.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.purchaseOption.deleteMany();
  await prisma.building.deleteMany();
  await prisma.residentialComplex.deleteMany();

  console.log("Создание жилых комплексов...");

  const complexBySlug = new Map<string, number>();

  for (const residentialComplex of residentialComplexesSeed) {
    const createdComplex = await prisma.residentialComplex.create({
      data: residentialComplex,
    });

    complexBySlug.set(createdComplex.slug, createdComplex.id);
  }

  console.log("Создание домов / позиций...");

  const buildingByPosition = new Map<string, number>();

  for (const building of buildingsSeed) {
    const complexId = complexBySlug.get(building.complexSlug);

    if (!complexId) {
      throw new Error(`Не найден ЖК для slug: ${building.complexSlug}`);
    }

    const createdBuilding = await prisma.building.create({
      data: {
        complexId,
        name: building.name,
        position: building.position,
        address: building.address,
        floorsTotal: building.floorsTotal,
        entrancesTotal: building.entrancesTotal,
        plannedSettlementDate: building.plannedSettlementDate,
        status: building.status,
      },
    });

    if (createdBuilding.position) {
      buildingByPosition.set(createdBuilding.position, createdBuilding.id);
    }
  }

  console.log("Создание удобств...");

  const amenityByOldId = new Map<number, number>();

  for (const amenity of amenitiesSeed) {
    const createdAmenity = await prisma.amenity.create({
      data: {
        name: amenity.name,
        slug: amenity.slug,
        icon: amenity.icon,
      },
    });

    amenityByOldId.set(amenity.oldId, createdAmenity.id);
  }

  console.log("Создание условий покупки...");

  await prisma.purchaseOption.createMany({
    data: purchaseOptionsSeed,
  });

  console.log("Создание квартир...");

  for (const apartment of apartmentsSeed) {
    const buildingId = buildingByPosition.get(apartment.buildingPosition);

    if (!buildingId) {
      throw new Error(
        `Не найден дом / позиция для квартиры №${apartment.number}`,
      );
    }

    await prisma.apartment.create({
      data: {
        buildingId,

        number: apartment.number,
        rooms: apartment.rooms,
        areaTotal: new Prisma.Decimal(apartment.areaTotal),
        price: apartment.price,
        pricePerSqm: apartment.pricePerSqm,

        floor: apartment.floor,
        entrance: apartment.entrance,
        ceilingHeight: apartment.ceilingHeight
          ? new Prisma.Decimal(apartment.ceilingHeight)
          : null,

        status: apartment.status,
        layoutType: apartment.layoutType,
        article: apartment.article,

        mainImage: apartment.mainImage,
        planImage: apartment.planImage,

        images: {
          create: apartment.images,
        },

        roomAreas: {
          create: apartment.roomAreas.map((roomArea) => ({
            name: roomArea.name,
            area: new Prisma.Decimal(roomArea.area),
            sortOrder: roomArea.sortOrder,
          })),
        },

        amenities: {
          create: apartment.amenityOldIds
            .map((oldAmenityId) => {
              const amenityId = amenityByOldId.get(oldAmenityId);

              if (!amenityId) return null;

              return {
                amenityId,
              };
            })
            .filter((item): item is { amenityId: number } => Boolean(item)),
        },
      },
    });
  }

  console.log("Seed завершён успешно!");
}

main()
  .catch((error) => {
    console.error("Ошибка seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });