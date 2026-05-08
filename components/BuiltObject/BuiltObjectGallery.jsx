"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import Button from "@/components/UI/Button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BuiltObjectGallery = ({ object, size = "md", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const photos = object.images?.length ? object.images : [object.image];

  return (
    <>
      <Button
        text="Посмотреть"
        variant="white"
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      />

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[100]"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        <div className="fixed inset-0 grid place-items-center p-4">
          <DialogPanel className="relative w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-dark shadow-lg backdrop-blur-sm transition hover:bg-accent hover:text-white"
              aria-label="Закрыть галерею"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Keyboard]}
                  navigation
                  pagination={{ clickable: true }}
                  keyboard={{ enabled: true }}
                  className="h-full max-h-[98vh]"
                >
                  {photos.map((photo, index) => (
                    <SwiperSlide key={photo} className="h-[stretch]!">
                      <img
                        src={photo}
                        alt={`${object.title} — фото ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default BuiltObjectGallery;