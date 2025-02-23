import { Pathnames } from "next-intl/routing";

export const locales = ["en", "zh", "fr", "ja", "ko", "ar", "es", "hi"];

export const localeNames: any = {
  en: "English",
  zh: "中文",
  fr: "Français",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  es: "Español",
  hi: "हिन्दी"
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection =
  process.env.NEXT_PUBLIC_LOCALE_DETECTION === "true";

export const pathnames = {
  en: {
    "/": "/",
    "posts": "/posts",
    "privacy-policy": "/privacy-policy",
    "terms-of-service": "/terms-of-service"
  },
  zh: {
    "/": "/",
    "posts": "/posts",
    "privacy-policy": "/privacy-policy",
    "terms-of-service": "/terms-of-service"
  },
  fr: {
    "privacy-policy": "/politique-de-confidentialite",
    "terms-of-service": "/conditions-dutilisation",
    "/": "/",
    "posts": "/posts"
  },
  ja: {
    "privacy-policy": "/プライバシーポリシー",
    "terms-of-service": "/利用規約",
    "/": "/",
    "posts": "/posts"
  },
  ko: {
    "privacy-policy": "/개인정보처리방침",
    "terms-of-service": "/이용약관",
    "/": "/",
    "posts": "/posts"
  },
  ar: {
    "privacy-policy": "/سياسة-الخصوصية",
    "terms-of-service": "/شروط-الخدمة",
    "/": "/",
    "posts": "/posts"
  },
  es: {
    "privacy-policy": "/politica-de-privacidad",
    "terms-of-service": "/terminos-de-servicio",
    "/": "/",
    "posts": "/posts"
  },
} satisfies Pathnames<typeof locales>;
