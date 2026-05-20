"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createAdminSession,
  destroyAdminSession,
  getAdminByCredentials,
  requireAdmin,
} from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const parseBoolean = (value) => value === "on" || value === "true";

const parseDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const parseContent = (value) => {
  return String(value || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const getNewsDataFromForm = (formData) => ({
  title: String(formData.get("title") || "").trim(),
  slug: String(formData.get("slug") || "").trim(),
  excerpt: String(formData.get("excerpt") || "").trim() || null,
  content: parseContent(formData.get("content")),
  image: String(formData.get("image") || "").trim() || null,
  label: String(formData.get("label") || "Новости").trim(),
  type: String(formData.get("type") || "news").trim(),
  isFeatured: parseBoolean(formData.get("isFeatured")),
  isPublished: parseBoolean(formData.get("isPublished")),
  sortOrder: Number(formData.get("sortOrder") || 0),
  publishedAt: parseDate(formData.get("publishedAt")),
});

export const loginAdmin = async (formData) => {
  const login = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_SESSION_SECRET && !process.env.NEXTAUTH_SECRET) {
    redirect("/g53-manager?error=config");
  }

  const admin = await getAdminByCredentials(login, password);

  if (!admin) {
    redirect("/g53-manager?error=1");
  }

  await prisma.adminUser.update({
    where: {
      id: admin.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  await createAdminSession(admin.id);
  redirect("/g53-manager");
};

export const logoutAdmin = async () => {
  await destroyAdminSession();
  redirect("/g53-manager");
};

export const createNewsItem = async (formData) => {
  await requireAdmin();

  const data = getNewsDataFromForm(formData);

  if (!data.title || !data.slug) {
    redirect("/g53-manager/news?error=required");
  }

  await prisma.newsItem.create({
    data,
  });

  revalidatePath("/news");
  revalidatePath("/g53-manager/news");
  redirect("/g53-manager/news");
};

export const updateNewsItem = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));
  const data = getNewsDataFromForm(formData);

  if (!id || !data.title || !data.slug) {
    redirect("/g53-manager/news?error=required");
  }

  await prisma.newsItem.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/news");
  revalidatePath(`/news/${data.slug}`);
  revalidatePath("/g53-manager/news");
};

export const deleteNewsItem = async (formData) => {
  await requireAdmin();

  const id = Number(formData.get("id"));

  if (!id) return;

  await prisma.newsItem.delete({
    where: {
      id,
    },
  });

  revalidatePath("/news");
  revalidatePath("/g53-manager/news");
};
