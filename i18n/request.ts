import { getRequestConfig } from "next-intl/server";
import { locales } from "./locale";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as any)) {
    locale = "en";
  }

  if (["zh-CN"].includes(locale)) {
    locale = "zh";
  }

  // 添加语言映射
  const languageMapping: { [key: string]: string } = {
    "zh-CN": "zh",
    "fr-FR": "fr",
    "ja-JP": "ja",
    "ko-KR": "ko",
    "ar-SA": "ar",
    "es-ES": "es",
  };

  if (locale in languageMapping) {
    locale = languageMapping[locale];
  }

  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  try {
    const messages = (await import(`./messages/${locale.toLowerCase()}.json`))
      .default;
    return {
      locale: locale,
      messages: messages,
    };
  } catch (e) {
    return {
      locale: "en",
      messages: (await import(`./messages/en.json`)).default,
    };
  }
});
