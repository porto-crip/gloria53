"use client";

import { useMemo, useState } from "react";

import Filter from "@/components/Filter/page";
import SortDropdown from "@/components/UI/SortDropdown";
import ComplexSelector from "@/components/ComplexSelector";
import MortgageInfoBlock from "@/components/MortgageInfoBlock";
import SliderSwitch from "@/components/UI/SliderSwitch";
import AppartmentCard from "@/components/UI/AppartmentCard";

const ApartmentsCatalog = ({ apartments = [], complexes = [] }) => {
  const [selectedComplex, setSelectedComplex] = useState(
    complexes[0]?.name || "ЖК Юннатов",
  );

  const [view, setView] = useState("grid");

  const filteredApartments = useMemo(() => {
    return apartments.filter((apartment) => {
      if (!selectedComplex) return true;

      return apartment.complexName === selectedComplex;
    });
  }, [apartments, selectedComplex]);

  return (
    <div className="container-padding mx-auto">
      <div className="my-20 text-center lg:my-30">
        <h1 className="px-4 text-4xl text-dark md:text-5xl">
          Квартиры в{" "}
          <ComplexSelector
            selectedComplex={selectedComplex}
            onSelect={setSelectedComplex}
            options={complexes}
          />
        </h1>
      </div>

      <article>
        <Filter />

        <div className="mt-6 flex items-center justify-between gap-4">
          <SortDropdown
            text="Сортировать"
            iconLink="/chevron-arrow.svg"
            iconAlt="next-to-page"
          />

          <SliderSwitch view={view} setView={setView} />
        </div>
      </article>

      <MortgageInfoBlock />

      {filteredApartments.length > 0 ? (
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              : "grid gap-6"
          } mt-12`}
        >
          {filteredApartments.map((apartment) => (
            <AppartmentCard
              key={apartment.id}
              view={view}
              apartment={apartment}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-4xl bg-dark10 p-8 text-center">
          <h2 className="text-2xl font-medium text-dark">
            Квартиры не найдены
          </h2>

          <p className="mt-3 text-dark60">
            Сейчас для выбранного жилого комплекса нет доступных квартир.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApartmentsCatalog;