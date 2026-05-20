import crypto from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "g53_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

const getSessionSecret = () => {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "";
};

export const hasAdminSessionSecret = () => {
  return Boolean(getSessionSecret());
};

const signValue = (value) => {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("hex");
};

const timingSafeEqual = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const hashAdminPassword = (
  password,
  salt = crypto.randomBytes(16).toString("hex"),
) => {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `scrypt:${salt}:${hash}`;
};

export const verifyAdminPassword = (password, storedHash) => {
  const [method, salt, hash] = String(storedHash || "").split(":");

  if (method !== "scrypt" || !salt || !hash) return false;

  return timingSafeEqual(hashAdminPassword(password, salt), storedHash);
};

const parseSession = (session) => {
  if (!session) return null;

  const [adminId, issuedAt, signature] = session.split(".");
  const issuedTime = Number(issuedAt);

  if (!adminId || !issuedAt || !signature || Number.isNaN(issuedTime)) {
    return null;
  }

  if (Date.now() - issuedTime > SESSION_MAX_AGE * 1000) {
    return null;
  }

  const unsignedValue = `${adminId}.${issuedAt}`;

  if (!timingSafeEqual(signature, signValue(unsignedValue))) {
    return null;
  }

  return {
    adminId: Number(adminId),
  };
};

export const getAdminByCredentials = async (email, password) => {
  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!admin || !admin.isActive) return null;
  if (!verifyAdminPassword(password, admin.passwordHash)) return null;

  return admin;
};

export const createAdminSession = async (adminId) => {
  const issuedAt = Date.now().toString();
  const unsignedValue = `${adminId}.${issuedAt}`;
  const signature = signValue(unsignedValue);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${unsignedValue}.${signature}`, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const destroyAdminSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
};

export const getCurrentAdmin = async () => {
  const secret = getSessionSecret();

  if (!secret) return null;

  const cookieStore = await cookies();
  const parsedSession = parseSession(cookieStore.get(COOKIE_NAME)?.value);

  if (!parsedSession?.adminId) return null;

  return prisma.adminUser.findFirst({
    where: {
      id: parsedSession.adminId,
      isActive: true,
    },
  });
};

export const isAdminAuthenticated = async () => {
  return Boolean(await getCurrentAdmin());
};

export const requireAdmin = async () => {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/g53-manager");
  }

  return admin;
};
