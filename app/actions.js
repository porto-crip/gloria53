"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const submitApplication = async (formData) => {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const comment = String(formData.get("comment") || "").trim();
  const apartmentId = Number(formData.get("apartmentId"));

  if (!name || !phone || !apartmentId) {
    redirect(`/apartments/${apartmentId}?error=required`);
  }

  await prisma.application.create({
    data: {
      apartmentId,
      name,
      phone,
      comment: comment || null,
    },
  });

  revalidatePath("/g53-manager/applications");
  redirect(`/apartments/${apartmentId}?success=1`);
};
